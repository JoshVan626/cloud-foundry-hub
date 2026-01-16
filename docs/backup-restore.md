---
id: backup-restore
title: Backup & Restore
description: Protecting your Nginx Proxy Manager (NPM) for AWS data and TLS certificates with built-in backup and restore tooling.
product: nginx-proxy-manager
section: backup
order: 1
---

# Backup & Restore

Protecting your Nginx Proxy Manager data and TLS certificates is critical.
This AMI includes built-in backup and restore tooling.

---

## What gets backed up

The `npm-backup` script creates **timestamped archives** containing:

- `/opt/npm/data`
- `/opt/npm/letsencrypt`

Backups are:

- Stored locally under a configurable directory (default: `/var/backups`)
- Named like: `npm-YYYYMMDDHHMMSS.tar.gz`
- Optionally uploaded to S3

---

## Configuration: /etc/npm-backup.conf

Backup behavior is controlled by:

```bash
/etc/npm-backup.conf
```

The file is INI-style:

```ini
[backup]
local_backup_dir = /var/backups
s3_bucket =
s3_prefix = npm
local_retention = 7
```

Fields:

- `local_backup_dir`  
  Directory where backup archives are stored.

- `s3_bucket`  
  If set to a bucket name (e.g. `my-npm-backups`), backups are **also** uploaded
  to S3 via `aws s3 cp`. If empty, S3 upload is disabled.

- `s3_prefix`  
  Optional key prefix. Example: `npm` → backups stored under `npm/...` in S3.

- `local_retention`  
  Number of most recent local backup files to keep. **Must be 1 or greater.**
  If set to `7`, the script retains the 7 newest backups and deletes older ones.
  Setting this to `0` will cause `npm-backup` to fail with an error (to prevent
  unbounded disk growth). Recommended: `7` or higher.

---

## How backups are created

You can run a backup manually:

```bash
sudo npm-backup
```

This will:

1. Read `/etc/npm-backup.conf`
2. Create a `npm-*.tar.gz` archive under `local_backup_dir`
3. If `s3_bucket` is set:
   - Try to upload the archive to `s3://<bucket>/<prefix>/<file>`
   - Log a warning if S3 upload fails, but keep the local backup
4. Apply the retention policy to local backups

A systemd timer runs this **once per day at 02:00** by default:

- Service: `npm-backup.service`
- Timer: `npm-backup.timer`

Check timer status:

```bash
sudo systemctl status npm-backup.timer
sudo systemctl status npm-backup.service
```

---

## Checking backup status

The backup script writes status to sentinel files and can be checked via `npm-helper`:

```bash
sudo npm-helper status
```

This displays:

- **Last backup file**: Most recent archive in the backup directory
- **Last run**: Timestamp of the last backup attempt
- **Last success**: Timestamp and filename of the last successful backup
- **Last failure**: If present, timestamp and reason for the last failure

### Sentinel files

Backup status is stored in `/var/lib/northstar/npm/`:

| File | Description |
|------|-------------|
| `backup-last-run` | Timestamp of last backup start |
| `backup-last-success` | Timestamp + filename on success |
| `backup-last-failure` | Timestamp + reason on failure (cleared on success) |

You can also inspect these files directly:

```bash
cat /var/lib/northstar/npm/backup-last-success
cat /var/lib/northstar/npm/backup-last-failure
```

### Structured log output

Each backup run emits a single structured log line to stdout/journald:

- Success: `NORTHSTAR_BACKUP status=success path=/var/backups/npm-*.tar.gz duration_s=N`
- Failure: `NORTHSTAR_BACKUP status=failure reason=<short_reason> duration_s=N`

If CloudWatch Agent is configured, these lines flow to CloudWatch Logs via syslog.

---

## Verify backups

You can run a quick integrity check against the most recent backup archive:

```bash
sudo npm-helper backup verify
```

This checks that a recent backup exists, validates archive readability, and
confirms expected components (`/opt/npm/data`, `/opt/npm/letsencrypt`) are present.

---

## Restore dry-run (validation only)

To validate a backup archive without modifying the instance:

```bash
sudo npm-helper restore --dry-run /var/backups/npm-YYYYMMDDHHMMSS.tar.gz
```

This prints what would be restored and fails safely if the archive does not
contain expected NPM paths.

---

## Optional S3 Backups (IAM Required)

S3 uploads are **optional**. Local backups work without IAM permissions. If S3 permissions are missing (or no instance role is attached), the backup will still complete locally and the S3 upload step may log a warning.

We recommend using a **least-privilege instance role** scoped to a dedicated bucket and prefix (example prefix: `npm-backups/`).

### IAM policy template (least privilege)

Replace:

- `YOUR_BUCKET_NAME`
- `YOUR_PREFIX` (example: `npm-backups`)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListBucketForPrefix",
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetBucketLocation"
      ],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME",
      "Condition": {
        "StringLike": {
          "s3:prefix": [
            "YOUR_PREFIX/*"
          ]
        }
      }
    },
    {
      "Sid": "PutObjectsInPrefix",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:AbortMultipartUpload"
      ],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/YOUR_PREFIX/*"
    }
  ]
}
```

### Optional SSE-KMS policy snippet

If your bucket requires SSE-KMS, add a KMS statement (replace `YOUR_KMS_KEY_ARN`):

```json
{
  "Sid": "KmsEncryptForS3Backups",
  "Effect": "Allow",
  "Action": [
    "kms:Encrypt",
    "kms:GenerateDataKey"
  ],
  "Resource": "YOUR_KMS_KEY_ARN"
}
```

### Configure `/etc/npm-backup.conf`

To enable S3 uploads:

1. Ensure the instance has IAM permissions to write to your bucket, e.g. attach a
   role with `s3:PutObject` and `s3:ListBucket` on the target bucket.
2. Edit `/etc/npm-backup.conf`:

   ```ini
   [backup]
   local_backup_dir = /var/backups
   s3_bucket = my-npm-backup-bucket
   s3_prefix = npm
   local_retention = 7
   ```

3. Run a manual backup to test:

   ```bash
   sudo npm-backup
   ```

4. Verify the object appears in S3 under the configured bucket and prefix.

If S3 upload fails, the script will:

- Print a warning
- Still keep the local backup file

### Troubleshooting S3 permissions

Backup output goes to journald:

```bash
sudo journalctl -u npm-backup.service -n 200 --no-pager
```

---
