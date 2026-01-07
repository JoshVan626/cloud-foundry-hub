// Auto-generated file - DO NOT EDIT MANUALLY
// This file is generated from markdown files in docs/ by scripts/build-docs.ts
// Run "npm run build:docs" to regenerate

export interface Product {
  id: string;
  name: string;
  shortName: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "nginx-proxy-manager",
    name: "Nginx Proxy Manager – Hardened Edition",
    shortName: "Nginx Proxy Manager (Hardened Edition)",
    description: "Enterprise-ready reverse proxy with automated SSL and security hardening",
  },
];

export interface DocSection {
  id: string;
  title: string;
  icon: string;
  productId: string;
  items: {
    id: string;
    label: string;
  }[];
}

export interface DocContent {
  id: string;
  title: string;
  description: string;
  productId: string;
  content: DocBlock[];
}

export interface DocBlock {
  type: "paragraph" | "heading" | "subheading" | "code" | "list" | "note" | "prereq" | "table";
  content?: string;
  items?: string[];
  language?: string;
  variant?: "info" | "warning" | "success";
  rows?: { label: string; value: string }[];
}

export const docSections: DocSection[] = [
  {
    "id": "getting-started",
    "title": "Getting Started",
    "icon": "Rocket",
    "productId": "nginx-proxy-manager",
    "items": [
      {
        "id": "quickstart",
        "label": "Quickstart"
      },
      {
        "id": "multi-app",
        "label": "Multi-App Setup"
      }
    ]
  },
  {
    "id": "security",
    "title": "Security & Hardening",
    "icon": "Shield",
    "productId": "nginx-proxy-manager",
    "items": [
      {
        "id": "security-hardening",
        "label": "Security & Hardening"
      }
    ]
  },
  {
    "id": "operations",
    "title": "Operations",
    "icon": "Terminal",
    "productId": "nginx-proxy-manager",
    "items": [
      {
        "id": "operations",
        "label": "Operations"
      },
      {
        "id": "troubleshooting",
        "label": "Troubleshooting"
      }
    ]
  },
  {
    "id": "backup",
    "title": "Backup & Restore",
    "icon": "Database",
    "productId": "nginx-proxy-manager",
    "items": [
      {
        "id": "backup-restore",
        "label": "Backup & Restore"
      }
    ]
  },
  {
    "id": "monitoring",
    "title": "Monitoring",
    "icon": "Activity",
    "productId": "nginx-proxy-manager",
    "items": [
      {
        "id": "monitoring",
        "label": "Monitoring & Metrics"
      }
    ]
  },
  {
    "id": "upgrades",
    "title": "Upgrades",
    "icon": "RefreshCw",
    "productId": "nginx-proxy-manager",
    "items": [
      {
        "id": "upgrades",
        "label": "Upgrades"
      }
    ]
  }
];

export const docContents: Record<string, DocContent> = {
  "backup-restore": {
    "id": "backup-restore",
    "title": "Backup & Restore",
    "description": "Protecting your Nginx Proxy Manager – Hardened Edition data and TLS certificates with built-in backup and restore tooling.",
    "productId": "nginx-proxy-manager",
    "content": [
      {
        "type": "paragraph",
        "content": "Protecting your Nginx Proxy Manager (Hardened Edition) data and TLS certificates is critical.\nThis AMI includes built-in backup and restore tooling."
      },
      {
        "type": "heading",
        "content": "What gets backed up"
      },
      {
        "type": "paragraph",
        "content": "The `npm-backup` script creates **timestamped archives** containing:"
      },
      {
        "type": "list",
        "items": [
          "`/opt/npm/data`",
          "`/opt/npm/letsencrypt`"
        ]
      },
      {
        "type": "paragraph",
        "content": "Backups are:"
      },
      {
        "type": "list",
        "items": [
          "Stored locally under a configurable directory (default: `/var/backups`)",
          "Named like: `npm-YYYYMMDDHHMMSS.tar.gz`",
          "Optionally uploaded to S3"
        ]
      },
      {
        "type": "heading",
        "content": "Configuration: /etc/npm-backup.conf"
      },
      {
        "type": "paragraph",
        "content": "Backup behavior is controlled by:"
      },
      {
        "type": "code",
        "content": "/etc/npm-backup.conf",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "The file is INI-style:"
      },
      {
        "type": "code",
        "content": "[backup]\nlocal_backup_dir = /var/backups\ns3_bucket =\ns3_prefix = npm\nlocal_retention = 7",
        "language": "ini"
      },
      {
        "type": "paragraph",
        "content": "Fields:"
      },
      {
        "type": "list",
        "items": [
          "`local_backup_dir`Directory where backup archives are stored.",
          "`s3_bucket`If set to a bucket name (e.g. `my-npm-backups`), backups are **also** uploaded\nto S3 via `aws s3 cp`. If empty, S3 upload is disabled.",
          "`s3_prefix`Optional key prefix. Example: `npm` → backups stored under `npm/...` in S3.",
          "`local_retention`Number of most recent local backup files to keep. **Must be 1 or greater.**\nIf set to `7`, the script retains the 7 newest backups and deletes older ones.\nSetting this to `0` will cause `npm-backup` to fail with an error (to prevent\nunbounded disk growth). Recommended: `7` or higher."
        ]
      },
      {
        "type": "heading",
        "content": "How backups are created"
      },
      {
        "type": "paragraph",
        "content": "You can run a backup manually:"
      },
      {
        "type": "code",
        "content": "sudo npm-backup",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "This will:"
      },
      {
        "type": "list",
        "items": [
          "Read `/etc/npm-backup.conf`",
          "Create a `npm-*.tar.gz` archive under `local_backup_dir`",
          "If `s3_bucket` is set:\n  - Try to upload the archive to `s3://<bucket>/<prefix>/<file>`\n  - Log a warning if S3 upload fails, but keep the local backup",
          "Apply the retention policy to local backups"
        ]
      },
      {
        "type": "paragraph",
        "content": "A systemd timer runs this **once per day at 02:00** by default:"
      },
      {
        "type": "list",
        "items": [
          "Service: `npm-backup.service`",
          "Timer: `npm-backup.timer`"
        ]
      },
      {
        "type": "paragraph",
        "content": "Check timer status:"
      },
      {
        "type": "code",
        "content": "sudo systemctl status npm-backup.timer\nsudo systemctl status npm-backup.service",
        "language": "bash"
      },
      {
        "type": "heading",
        "content": "Checking backup status"
      },
      {
        "type": "paragraph",
        "content": "The backup script writes status to sentinel files and can be checked via `npm-helper`:"
      },
      {
        "type": "code",
        "content": "sudo npm-helper status",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "This displays:"
      },
      {
        "type": "list",
        "items": [
          "**Last backup file**: Most recent archive in the backup directory",
          "**Last run**: Timestamp of the last backup attempt",
          "**Last success**: Timestamp and filename of the last successful backup",
          "**Last failure**: If present, timestamp and reason for the last failure"
        ]
      },
      {
        "type": "subheading",
        "content": "Sentinel files"
      },
      {
        "type": "paragraph",
        "content": "Backup status is stored in `/var/lib/northstar/npm/`:"
      },
      {
        "type": "paragraph",
        "content": "| File | Description |\n|------|-------------|\n| `backup-last-run` | Timestamp of last backup start |\n| `backup-last-success` | Timestamp + filename on success |\n| `backup-last-failure` | Timestamp + reason on failure (cleared on success) |"
      },
      {
        "type": "paragraph",
        "content": "You can also inspect these files directly:"
      },
      {
        "type": "code",
        "content": "cat /var/lib/northstar/npm/backup-last-success\ncat /var/lib/northstar/npm/backup-last-failure",
        "language": "bash"
      },
      {
        "type": "subheading",
        "content": "Structured log output"
      },
      {
        "type": "paragraph",
        "content": "Each backup run emits a single structured log line to stdout/journald:"
      },
      {
        "type": "list",
        "items": [
          "Success: `NORTHSTAR_BACKUP status=success path=/var/backups/npm-*.tar.gz duration_s=N`",
          "Failure: `NORTHSTAR_BACKUP status=failure reason=<short_reason> duration_s=N`"
        ]
      },
      {
        "type": "paragraph",
        "content": "If CloudWatch Agent is configured, these lines flow to CloudWatch Logs via syslog."
      },
      {
        "type": "heading",
        "content": "Optional S3 Backups (IAM Required)"
      },
      {
        "type": "paragraph",
        "content": "S3 uploads are **optional**. Local backups work without IAM permissions. If S3 permissions are missing (or no instance role is attached), the backup will still complete locally and the S3 upload step may log a warning."
      },
      {
        "type": "paragraph",
        "content": "We recommend using a **least-privilege instance role** scoped to a dedicated bucket and prefix (example prefix: `npm-backups/`)."
      },
      {
        "type": "subheading",
        "content": "IAM policy template (least privilege)"
      },
      {
        "type": "paragraph",
        "content": "Replace:"
      },
      {
        "type": "list",
        "items": [
          "`YOUR_BUCKET_NAME`",
          "`YOUR_PREFIX` (example: `npm-backups`)"
        ]
      },
      {
        "type": "code",
        "content": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Sid\": \"ListBucketForPrefix\",\n      \"Effect\": \"Allow\",\n      \"Action\": [\n        \"s3:ListBucket\",\n        \"s3:GetBucketLocation\"\n      ],\n      \"Resource\": \"arn:aws:s3:::YOUR_BUCKET_NAME\",\n      \"Condition\": {\n        \"StringLike\": {\n          \"s3:prefix\": [\n            \"YOUR_PREFIX/*\"\n          ]\n        }\n      }\n    },\n    {\n      \"Sid\": \"PutObjectsInPrefix\",\n      \"Effect\": \"Allow\",\n      \"Action\": [\n        \"s3:PutObject\",\n        \"s3:AbortMultipartUpload\"\n      ],\n      \"Resource\": \"arn:aws:s3:::YOUR_BUCKET_NAME/YOUR_PREFIX/*\"\n    }\n  ]\n}",
        "language": "json"
      },
      {
        "type": "subheading",
        "content": "Optional SSE-KMS policy snippet"
      },
      {
        "type": "paragraph",
        "content": "If your bucket requires SSE-KMS, add a KMS statement (replace `YOUR_KMS_KEY_ARN`):"
      },
      {
        "type": "code",
        "content": "{\n  \"Sid\": \"KmsEncryptForS3Backups\",\n  \"Effect\": \"Allow\",\n  \"Action\": [\n    \"kms:Encrypt\",\n    \"kms:GenerateDataKey\"\n  ],\n  \"Resource\": \"YOUR_KMS_KEY_ARN\"\n}",
        "language": "json"
      },
      {
        "type": "subheading",
        "content": "Configure `/etc/npm-backup.conf`"
      },
      {
        "type": "paragraph",
        "content": "To enable S3 uploads:"
      },
      {
        "type": "list",
        "items": [
          "Ensure the instance has IAM permissions to write to your bucket, e.g. attach a\nrole with `s3:PutObject` and `s3:ListBucket` on the target bucket.",
          "Edit `/etc/npm-backup.conf`:",
          "Run a manual backup to test:",
          "Verify the object appears in S3 under the configured bucket and prefix."
        ]
      },
      {
        "type": "code",
        "content": "[backup]\nlocal_backup_dir = /var/backups\ns3_bucket = my-npm-backup-bucket\ns3_prefix = npm\nlocal_retention = 7",
        "language": "ini"
      },
      {
        "type": "code",
        "content": "sudo npm-backup",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "If S3 upload fails, the script will:"
      },
      {
        "type": "list",
        "items": [
          "Print a warning",
          "Still keep the local backup file"
        ]
      },
      {
        "type": "subheading",
        "content": "Troubleshooting S3 permissions"
      },
      {
        "type": "paragraph",
        "content": "Backup output goes to journald:"
      },
      {
        "type": "code",
        "content": "sudo journalctl -u npm-backup.service -n 200 --no-pager",
        "language": "bash"
      },
      {
        "type": "heading",
        "content": "Restore from a backup archive"
      },
      {
        "type": "paragraph",
        "content": "Use `npm-restore` to restore from a backup archive."
      },
      {
        "type": "note",
        "content": "⚠ **Only run this when you are comfortable overwriting the current NPM data.**",
        "variant": "warning"
      },
      {
        "type": "subheading",
        "content": "Trust model"
      },
      {
        "type": "paragraph",
        "content": "**Only restore archives created by `npm-backup` on trusted instances.**"
      },
      {
        "type": "paragraph",
        "content": "The restore script validates archive contents before extraction and will refuse\nto extract archives containing paths outside the expected directories\n(`opt/npm/data`, `opt/npm/letsencrypt`). This security check prevents malicious\nor corrupted archives from overwriting system files like `/etc/passwd`."
      },
      {
        "type": "paragraph",
        "content": "If validation fails, you'll see:"
      },
      {
        "type": "code",
        "content": "✗ Error: Archive contains paths outside allowed directories!"
      },
      {
        "type": "paragraph",
        "content": "Do not attempt to bypass this check. The archive may be corrupted, tampered\nwith, or created by a different tool."
      },
      {
        "type": "list",
        "items": [
          "List available backups:",
          "Run restore:"
        ]
      },
      {
        "type": "code",
        "content": "ls -1 /var/backups/npm-*.tar.gz",
        "language": "bash"
      },
      {
        "type": "code",
        "content": "sudo npm-restore /var/backups/npm-YYYYMMDDHHMMSS.tar.gz",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "What `npm-restore` does:"
      },
      {
        "type": "list",
        "items": [
          "Stop the `npm` systemd service.",
          "Move existing `/opt/npm/data` and `/opt/npm/letsencrypt` to `.bak-<timestamp>`\nsafety backups (if they exist and are non-empty).",
          "Extract the archive from `/` so the original paths are restored.",
          "Fix ownership on the restored directories.",
          "Start the `npm` service.",
          "Perform a health check against the local NPM API endpoint (port 81)."
        ]
      },
      {
        "type": "paragraph",
        "content": "If the health check fails:"
      },
      {
        "type": "list",
        "items": [
          "The script **does not** automatically roll back.",
          "It prints clear instructions and tells you where the `.bak-` safety directories are, so you can manually restore them."
        ]
      },
      {
        "type": "heading",
        "content": "Best practices"
      },
      {
        "type": "list",
        "items": [
          "Keep `local_retention` at least `5–7` for a buffer of good backups.",
          "Use S3 uploads in combination with IAM roles for off-instance copies.",
          "After any major configuration change, you can force a backup:",
          "Test `npm-restore` in a non-production environment, so you're familiar with the flow before you need it in an emergency."
        ]
      },
      {
        "type": "code",
        "content": "sudo npm-backup",
        "language": "bash"
      },
      {
        "type": "heading",
        "content": "Troubleshooting backup failures"
      },
      {
        "type": "paragraph",
        "content": "If backups are failing, check the last failure reason:"
      },
      {
        "type": "code",
        "content": "cat /var/lib/northstar/npm/backup-last-failure",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Or use `npm-helper status` to see the full backup status."
      },
      {
        "type": "subheading",
        "content": "Common failure reasons"
      },
      {
        "type": "paragraph",
        "content": "| Reason | Cause | Fix |\n|--------|-------|-----|\n| `concurrent_run_in_progress` | Another backup is still running | Wait for it to finish, or check for stuck processes |\n| `invalid_retention_value` | `local_retention` in config is less than 1 | Set `local_retention = 7` (or higher) in `/etc/npm-backup.conf` |\n| `cannot_create_backup_dir` | Backup directory path is invalid or permissions issue | Verify `local_backup_dir` path exists and is writable |\n| `backup_dir_not_writable` | No write permission to backup directory | Check permissions: `ls -la /var/backups` |\n| `tar_archive_failed` | Failed to create the tar archive | Check disk space: `df -h /var/backups` |\n| `backup_file_not_created` | Archive creation succeeded but file not found | Check disk space and filesystem errors |"
      },
      {
        "type": "subheading",
        "content": "S3 upload failures"
      },
      {
        "type": "paragraph",
        "content": "S3 upload failures do **not** fail the backup—the local backup is still created. Common S3 issues:"
      },
      {
        "type": "list",
        "items": [
          "**No IAM role attached**: The instance needs an IAM role with `s3:PutObject` permission",
          "**Bucket doesn't exist**: Verify the bucket name in `/etc/npm-backup.conf`",
          "**Wrong region**: The bucket must be accessible from the instance's region",
          "**AWS CLI not installed**: Check with `which aws`"
        ]
      },
      {
        "type": "paragraph",
        "content": "To test S3 permissions manually:"
      },
      {
        "type": "code",
        "content": "# Create a test file\necho \"test\" > /tmp/s3-test.txt\n\n# Try to upload (replace with your bucket)\naws s3 cp /tmp/s3-test.txt s3://YOUR-BUCKET/test.txt\n\n# Clean up\nrm /tmp/s3-test.txt\naws s3 rm s3://YOUR-BUCKET/test.txt",
        "language": "bash"
      },
      {
        "type": "subheading",
        "content": "Viewing backup logs"
      },
      {
        "type": "paragraph",
        "content": "Backup output goes to journald:"
      },
      {
        "type": "code",
        "content": "# Last backup run\nsudo journalctl -u npm-backup.service -n 50\n\n# Search for structured log lines\nsudo journalctl -u npm-backup.service | grep NORTHSTAR_BACKUP",
        "language": "bash"
      }
    ]
  },
  "multi-app": {
    "id": "multi-app",
    "title": "Multi-App Setup",
    "description": "A common use case: run multiple applications behind a single Nginx Proxy Manager – Hardened Edition instance on EC2.",
    "productId": "nginx-proxy-manager",
    "content": [
      {
        "type": "paragraph",
        "content": "A common use case is to run multiple applications behind a single NPM instance\non EC2."
      },
      {
        "type": "heading",
        "content": "Scenario"
      },
      {
        "type": "paragraph",
        "content": "You have:"
      },
      {
        "type": "list",
        "items": [
          "One NPM Premium AMI instance",
          "Two backend apps:\n  - `app1` on another EC2 instance at `10.0.1.10:3000`\n  - `app2` on another EC2 instance at `10.0.1.11:4000`"
        ]
      },
      {
        "type": "paragraph",
        "content": "You want:"
      },
      {
        "type": "list",
        "items": [
          "`https://app1.example.com` → `10.0.1.10:3000`",
          "`https://app2.example.com` → `10.0.1.11:4000`"
        ]
      },
      {
        "type": "heading",
        "content": "Steps"
      },
      {
        "type": "list",
        "items": [
          "Point DNS (`A` records) for:\n  - `app1.example.com` → NPM instance public IP or load balancer\n  - `app2.example.com` → NPM instance public IP or load balancer",
          "In NPM admin UI:\n  - **Add Proxy Host** for `app1.example.com`:Domain Names: `app1.example.com`Scheme: `http`Forward Hostname / IP: `10.0.1.10`Forward Port: `3000`Enable SSL (Let’s Encrypt) once DNS is working.\n  - **Add Proxy Host** for `app2.example.com`:Domain Names: `app2.example.com`Scheme: `http`Forward Hostname / IP: `10.0.1.11`Forward Port: `4000`Enable SSL (Let’s Encrypt) once DNS is working.",
          "(Optional) Put the NPM instance behind an Application Load Balancer (ALB)\nthat terminates TLS and forwards to the NPM instance. In that case, you can\nrun NPM in HTTP-only mode internally and let ALB handle TLS."
        ]
      },
      {
        "type": "heading",
        "content": "Tips"
      },
      {
        "type": "list",
        "items": [
          "Consider using private subnets and security groups so only the NPM instance\ncan reach your backend apps.",
          "Use separate NPM access lists if some apps should be restricted.",
          "Use backups to protect NPM configuration and TLS certificates."
        ]
      }
    ]
  },
  "monitoring": {
    "id": "monitoring",
    "title": "Monitoring & Metrics",
    "description": "CloudWatch integration for comprehensive observability of your Nginx Proxy Manager – Hardened Edition – optional but pre-configured.",
    "productId": "nginx-proxy-manager",
    "content": [
      {
        "type": "paragraph",
        "content": "This AMI includes a preconfigured Amazon CloudWatch Agent so basic logs and\nsystem-level metrics are available out of the box once the instance is running\nwith the right permissions."
      },
      {
        "type": "paragraph",
        "content": "Product:"
      },
      {
        "type": "paragraph",
        "content": "**Nginx Proxy Manager – Hardened Edition (Ubuntu 22.04) by Northstar Cloud Solutions**"
      },
      {
        "type": "heading",
        "content": "IAM Permissions (Optional)"
      },
      {
        "type": "paragraph",
        "content": "CloudWatch integration is **optional**. This AMI functions normally without any AWS IAM permissions. If no instance role is attached (or permissions are missing), the CloudWatch Agent may log permission errors and will not be able to publish logs/metrics."
      },
      {
        "type": "subheading",
        "content": "What is shipped to CloudWatch by default"
      },
      {
        "type": "paragraph",
        "content": "**Logs** (CloudWatch Logs group: `/northstar-cloud-solutions/npm`):"
      },
      {
        "type": "list",
        "items": [
          "`/var/log/syslog`",
          "`/var/log/auth.log`",
          "`/var/lib/docker/containers/*/*-json.log`"
        ]
      },
      {
        "type": "paragraph",
        "content": "**Metrics** (CloudWatch namespace: `NorthstarCloudSolutions/System`):"
      },
      {
        "type": "list",
        "items": [
          "Disk: used percent on `/`",
          "Memory: used percent",
          "CPU: idle and iowait",
          "Network: bytes in/out on the primary interface (typically `eth0`)"
        ]
      },
      {
        "type": "paragraph",
        "content": "Note: this AMI does **not** create alarms, dashboards, or notifications by default.\nCloudWatch retention is controlled by your account settings for the log group and metrics.\nCloudWatch costs vary by log volume and retention settings; you control retention in CloudWatch."
      },
      {
        "type": "subheading",
        "content": "Minimal IAM policy (logs + metrics)"
      },
      {
        "type": "paragraph",
        "content": "Attach an **instance role** with a policy similar to the following. This uses `Resource: \"*\"` for simplicity; organizations can tighten this further to match their standards."
      },
      {
        "type": "code",
        "content": "{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    {\n      \"Sid\": \"CloudWatchLogsWrite\",\n      \"Effect\": \"Allow\",\n      \"Action\": [\n        \"logs:CreateLogGroup\",\n        \"logs:CreateLogStream\",\n        \"logs:DescribeLogGroups\",\n        \"logs:DescribeLogStreams\",\n        \"logs:PutLogEvents\"\n      ],\n      \"Resource\": \"*\"\n    },\n    {\n      \"Sid\": \"CloudWatchMetricsWrite\",\n      \"Effect\": \"Allow\",\n      \"Action\": [\n        \"cloudwatch:PutMetricData\"\n      ],\n      \"Resource\": \"*\"\n    }\n  ]\n}",
        "language": "json"
      },
      {
        "type": "subheading",
        "content": "Troubleshooting permissions"
      },
      {
        "type": "list",
        "items": [
          "**Agent logs**: `sudo journalctl -u amazon-cloudwatch-agent.service -n 200 --no-pager`",
          "If you see `AccessDenied` or `UnauthorizedOperation`, attach an instance role with the permissions above and restart the agent: `sudo systemctl restart amazon-cloudwatch-agent.service`"
        ]
      },
      {
        "type": "heading",
        "content": "What the AMI is configured to send"
      },
      {
        "type": "paragraph",
        "content": "The CloudWatch Agent is installed and configured via:"
      },
      {
        "type": "list",
        "items": [
          "Config file: `/opt/aws/amazon-cloudwatch-agent/amazon-cloudwatch-agent.json`",
          "Service: `amazon-cloudwatch-agent.service`"
        ]
      },
      {
        "type": "paragraph",
        "content": "When the instance is running with permissions to talk to CloudWatch, it will:"
      },
      {
        "type": "subheading",
        "content": "Logs"
      },
      {
        "type": "paragraph",
        "content": "Send these log files:"
      },
      {
        "type": "list",
        "items": [
          "`/var/log/syslog`",
          "`/var/log/auth.log`"
        ]
      },
      {
        "type": "paragraph",
        "content": "to the CloudWatch Logs **log group**:"
      },
      {
        "type": "code",
        "content": "/northstar-cloud-solutions/npm",
        "language": "text"
      },
      {
        "type": "paragraph",
        "content": "Each instance uses separate log streams, for example:"
      },
      {
        "type": "list",
        "items": [
          "`{instance_id}-syslog`",
          "`{instance_id}-auth`"
        ]
      },
      {
        "type": "subheading",
        "content": "Metrics"
      },
      {
        "type": "paragraph",
        "content": "Publish basic system metrics under the CloudWatch namespace:"
      },
      {
        "type": "paragraph",
        "content": "**NorthstarCloudSolutions/System**"
      },
      {
        "type": "paragraph",
        "content": "The AMI's default config collects:"
      },
      {
        "type": "list",
        "items": [
          "**mem_used_percent** – overall memory usage percentage",
          "**used_percent (for /)** – disk space used on the root filesystem"
        ]
      }
    ]
  },
  "operations": {
    "id": "operations",
    "title": "Operations",
    "description": "Understanding the first-boot lifecycle, CLI tools, and day-to-day operations for the Nginx Proxy Manager – Hardened Edition.",
    "productId": "nginx-proxy-manager",
    "content": [
      {
        "type": "paragraph",
        "content": "This AMI includes a few opinionated tools and services to make NPM easier to\nrun in production."
      },
      {
        "type": "heading",
        "content": "NPM Initialization (First Boot)"
      },
      {
        "type": "paragraph",
        "content": "On first boot, the boot flow is:"
      },
      {
        "type": "list",
        "items": [
          "`npm-preflight.service` → fast checks and clear failure reasons",
          "`npm-init.service` → one-time credential initialization",
          "`npm-postinit.service` → post-init health summary"
        ]
      },
      {
        "type": "paragraph",
        "content": "You can see the current state in:"
      },
      {
        "type": "list",
        "items": [
          "The SSH login banner (MOTD) under **Initialization Status**",
          "`sudo npm-helper status`"
        ]
      },
      {
        "type": "paragraph",
        "content": "On first boot, `npm-init.service` runs once to:"
      },
      {
        "type": "list",
        "items": [
          "Wait for the NPM SQLite database to become ready (up to ~300 seconds)",
          "Generate a secure random admin password",
          "Update the database with the new credentials",
          "Write credentials to a root-only file",
          "Update the SSH login banner (MOTD)"
        ]
      },
      {
        "type": "paragraph",
        "content": "The wait time accounts for slow instance types or cold container pulls."
      },
      {
        "type": "subheading",
        "content": "Admin email"
      },
      {
        "type": "paragraph",
        "content": "The default admin email is `admin@example.com` (NPM's default)."
      },
      {
        "type": "paragraph",
        "content": "To use a different email, set the `NPM_ADMIN_EMAIL` environment variable before\nfirst boot. For example, add to `/etc/environment`:"
      },
      {
        "type": "code",
        "content": "NPM_ADMIN_EMAIL=admin@yourdomain.com",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Or create a systemd override for `npm-init.service`:"
      },
      {
        "type": "code",
        "content": "sudo systemctl edit npm-init",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Add:"
      },
      {
        "type": "code",
        "content": "[Service]\nEnvironment=\"NPM_ADMIN_EMAIL=admin@yourdomain.com\"",
        "language": "ini"
      },
      {
        "type": "paragraph",
        "content": "This must be set **before the first boot initialization runs**. If you need to\nchange the email after initialization, update the NPM database directly via the\nweb UI."
      },
      {
        "type": "subheading",
        "content": "Troubleshooting init failures"
      },
      {
        "type": "paragraph",
        "content": "If NPM doesn't come up after first boot:"
      },
      {
        "type": "code",
        "content": "# Preflight status + logs (runs before init)\nsudo systemctl status npm-preflight.service\nsudo journalctl -u npm-preflight.service -n 200 --no-pager\n\n# Check init service status\nsudo systemctl status npm-init\n\n# View detailed init logs\nsudo journalctl -u npm-init -xe\n\n# Post-init status + logs (runs after init)\nsudo systemctl status npm-postinit.service\nsudo journalctl -u npm-postinit.service -n 200 --no-pager\n\n# If post-init failed and you want to re-run it after fixing the issue:\nsudo rm -f /var/lib/northstar/npm/postinit-ok /var/lib/northstar/npm/postinit-status\nsudo systemctl start npm-postinit.service\n\n# Restart the NPM stack\nsudo systemctl restart npm\n\n# Re-run initialization (safe to run multiple times)\nsudo systemctl restart npm-init",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Common causes:"
      },
      {
        "type": "list",
        "items": [
          "Container image pull timeout (retry usually fixes it)",
          "Insufficient instance resources (use t3.small or larger)",
          "Docker service not ready (check `systemctl status docker`)"
        ]
      },
      {
        "type": "heading",
        "content": "First Boot Recovery (Preflight / Init / Post-Init)"
      },
      {
        "type": "paragraph",
        "content": "Quick status:"
      },
      {
        "type": "list",
        "items": [
          "Run: `sudo npm-helper status`",
          "The SSH login banner (MOTD) also shows **Initialization Status** at login."
        ]
      },
      {
        "type": "paragraph",
        "content": "View logs (most recent 200 lines):"
      },
      {
        "type": "code",
        "content": "sudo journalctl -u npm-preflight.service -n 200 --no-pager\nsudo journalctl -u npm-init.service -n 200 --no-pager\nsudo journalctl -u npm-postinit.service -n 200 --no-pager\nsudo journalctl -u npm.service -n 200 --no-pager",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Safe re-run commands (after fixing the underlying issue):"
      },
      {
        "type": "code",
        "content": "sudo systemctl start npm-preflight.service\nsudo systemctl start npm-init.service\nsudo systemctl start npm-postinit.service",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Common blockers:"
      },
      {
        "type": "list",
        "items": [
          "No outbound internet access (image pull fails)",
          "Insufficient disk space on `/`",
          "Docker daemon not running",
          "Security Group or routing prevents reaching port `81/tcp` from your network"
        ]
      },
      {
        "type": "heading",
        "content": "Systemd services"
      },
      {
        "type": "paragraph",
        "content": "Key services:"
      },
      {
        "type": "list",
        "items": [
          "`docker.service` – Docker engine",
          "`npm.service` – NPM Docker stack",
          "`npm-preflight.service` – first-boot preflight checks",
          "`npm-init.service` – one-time first-boot initialization",
          "`npm-postinit.service` – first-boot post-init health summary",
          "`npm-backup.timer` – daily backup timer",
          "`amazon-cloudwatch-agent.service` – CloudWatch log shipping"
        ]
      },
      {
        "type": "paragraph",
        "content": "Basic commands:"
      },
      {
        "type": "code",
        "content": "# Check status\nsudo systemctl status npm\nsudo systemctl status docker\nsudo systemctl status amazon-cloudwatch-agent\n\n# View logs\nsudo journalctl -u npm\nsudo journalctl -u amazon-cloudwatch-agent\n\n# Restart NPM stack\nsudo systemctl restart npm",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "`npm.service` will retry automatically if `docker compose up -d` or the follow-up\ncontainer health check fails (e.g., transient network/pull issues). If the stack\nis not coming up, check:"
      },
      {
        "type": "list",
        "items": [
          "`sudo systemctl status npm` for recent restart attempts",
          "`sudo journalctl -u npm` for compose output and container state summaries",
          "`docker compose ps` in `/opt/npm` to see per-container status"
        ]
      },
      {
        "type": "heading",
        "content": "CLI: npm-helper"
      },
      {
        "type": "paragraph",
        "content": "`npm-helper` is installed under `/usr/local/bin`. It provides three main\nsubcommands:"
      },
      {
        "type": "subheading",
        "content": "Show current admin credentials"
      },
      {
        "type": "code",
        "content": "sudo npm-helper show-admin",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Outputs the current admin username stored in:"
      },
      {
        "type": "list",
        "items": [
          "the admin username (password is not displayed again after first login; see `docs/security.md`)"
        ]
      },
      {
        "type": "subheading",
        "content": "Rotate admin password"
      },
      {
        "type": "code",
        "content": "sudo npm-helper rotate-admin",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "What it does:"
      },
      {
        "type": "list",
        "items": [
          "Waits for the NPM SQLite database to be ready.",
          "Generates a new strong random password.",
          "Updates the NPM `auth` table with the new bcrypt hash.",
          "Writes the new credentials to a root-only credentials file.",
          "Updates the MOTD banner (password is not re-printed after first login)."
        ]
      },
      {
        "type": "paragraph",
        "content": "Use this whenever you want to rotate the admin password without touching the\nweb UI."
      },
      {
        "type": "subheading",
        "content": "Status overview"
      },
      {
        "type": "code",
        "content": "sudo npm-helper status",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Shows:"
      },
      {
        "type": "list",
        "items": [
          "Docker service status",
          "`npm` service status",
          "Container status from `docker compose ps`",
          "Last backup timestamp found under `/var/backups`"
        ]
      },
      {
        "type": "paragraph",
        "content": "This is a quick way to check if the system is healthy."
      },
      {
        "type": "paragraph",
        "content": "Additional opt-in commands:"
      },
      {
        "type": "list",
        "items": [
          "`sudo npm-helper update-os` – run a one-click `apt-get update` + `apt-get upgrade` (may require reboot)",
          "`sudo npm-helper diagnostics --json` – emit non-sensitive diagnostic JSON for support/troubleshooting"
        ]
      },
      {
        "type": "heading",
        "content": "Logs & CloudWatch"
      },
      {
        "type": "paragraph",
        "content": "The CloudWatch Agent is configured to ship:"
      },
      {
        "type": "list",
        "items": [
          "`/var/log/syslog`",
          "`/var/log/auth.log`"
        ]
      },
      {
        "type": "paragraph",
        "content": "into a log group named:"
      },
      {
        "type": "code",
        "content": "/northstar-cloud-solutions/npm",
        "language": "text"
      },
      {
        "type": "paragraph",
        "content": "with per-instance log streams (e.g. `{instance_id}-syslog`, `{instance_id}-auth`)."
      },
      {
        "type": "paragraph",
        "content": "You can view these in:"
      },
      {
        "type": "list",
        "items": [
          "AWS Console → CloudWatch → Logs → Log groups → `/northstar-cloud-solutions/npm`"
        ]
      },
      {
        "type": "paragraph",
        "content": "This is useful for:"
      },
      {
        "type": "list",
        "items": [
          "SSH login attempts",
          "System service failures",
          "General OS-level troubleshooting"
        ]
      },
      {
        "type": "heading",
        "content": "Where NPM keeps its data"
      },
      {
        "type": "paragraph",
        "content": "NPM runs in Docker and stores its state in:"
      },
      {
        "type": "list",
        "items": [
          "`/opt/npm/data` – configuration, SQLite DB",
          "`/opt/npm/letsencrypt` – TLS certificates"
        ]
      },
      {
        "type": "paragraph",
        "content": "These paths are:"
      },
      {
        "type": "list",
        "items": [
          "Mounted into the NPM container",
          "Included in backup archives (`npm-backup` / `npm-restore`)",
          "Preserved across instance reboots"
        ]
      },
      {
        "type": "heading",
        "content": "Backups"
      },
      {
        "type": "paragraph",
        "content": "Backups are managed by `npm-backup` and configured in `/etc/npm-backup.conf`."
      },
      {
        "type": "subheading",
        "content": "Retention requirements"
      },
      {
        "type": "paragraph",
        "content": "The `[backup] local_retention` setting **must be 1 or greater**. Setting it to 0\nwill cause `npm-backup` to exit with an error. This prevents unbounded disk\ngrowth from accumulating backup files."
      },
      {
        "type": "paragraph",
        "content": "Recommended: `local_retention = 7` (or higher for critical environments)."
      },
      {
        "type": "subheading",
        "content": "Disk usage"
      },
      {
        "type": "paragraph",
        "content": "Each backup archive is typically 1–10 MB depending on your NPM configuration\nand certificate count. Monitor `/var/backups` disk usage, especially on\nsmaller EBS volumes."
      },
      {
        "type": "subheading",
        "content": "S3 uploads"
      },
      {
        "type": "paragraph",
        "content": "To enable S3 uploads:"
      },
      {
        "type": "list",
        "items": [
          "Attach an IAM role with `s3:PutObject` permission to the instance",
          "Set `s3_bucket` in `/etc/npm-backup.conf`",
          "Ensure the AWS CLI is installed (pre-installed on this AMI)"
        ]
      },
      {
        "type": "paragraph",
        "content": "If the instance lacks proper IAM permissions or the AWS CLI, S3 upload will\nfail with a warning but local backup will still succeed."
      },
      {
        "type": "paragraph",
        "content": "See Backup & Restore for full configuration details."
      },
      {
        "type": "heading",
        "content": "Restore"
      },
      {
        "type": "paragraph",
        "content": "Use `npm-restore` to restore from a backup archive."
      },
      {
        "type": "subheading",
        "content": "Trust model"
      },
      {
        "type": "paragraph",
        "content": "**Only restore archives created by `npm-backup` on trusted instances.**"
      },
      {
        "type": "paragraph",
        "content": "The restore script validates archive contents before extraction and will\n**refuse to extract** archives containing paths outside the expected\ndirectories (`opt/npm/data`, `opt/npm/letsencrypt`). This prevents malicious\nor corrupted archives from overwriting system files."
      },
      {
        "type": "paragraph",
        "content": "If you see an error like:"
      },
      {
        "type": "code",
        "content": "✗ Error: Archive contains paths outside allowed directories!"
      },
      {
        "type": "paragraph",
        "content": "The archive may be corrupted, tampered with, or created by a different tool.\nDo not attempt to bypass this check."
      },
      {
        "type": "paragraph",
        "content": "See Backup & Restore for restore procedures."
      },
      {
        "type": "heading",
        "content": "Support Bundles"
      },
      {
        "type": "paragraph",
        "content": "The `npm-support-bundle` command collects diagnostic information for\ntroubleshooting:"
      },
      {
        "type": "code",
        "content": "sudo npm-support-bundle",
        "language": "bash"
      },
      {
        "type": "subheading",
        "content": "Storage location"
      },
      {
        "type": "paragraph",
        "content": "Bundles are stored under `/var/backups` with names like:"
      },
      {
        "type": "code",
        "content": "npm-support-YYYYMMDDHHMMSS.tar.gz"
      },
      {
        "type": "subheading",
        "content": "Cleanup"
      },
      {
        "type": "paragraph",
        "content": "Support bundles are **not automatically pruned**. To remove bundles older than\n14 days:"
      },
      {
        "type": "code",
        "content": "sudo find /var/backups -maxdepth 1 -name 'npm-support-*.tar.gz' -mtime +14 -delete",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Consider adding this to a cron job if you generate bundles frequently."
      }
    ]
  },
  "quickstart": {
    "id": "quickstart",
    "title": "Quickstart",
    "description": "Go from AMI to a running Nginx Proxy Manager – Hardened Edition admin panel in minutes.",
    "productId": "nginx-proxy-manager",
    "content": [
      {
        "type": "paragraph",
        "content": "This guide walks you from **nothing** to a working Nginx Proxy Manager (Hardened Edition) admin\npanel on AWS using the Nginx Proxy Manager – Hardened Edition (Ubuntu 22.04) by Northstar Cloud Solutions."
      },
      {
        "type": "note",
        "content": "Assumes: you’re familiar with launching EC2 instances and security groups.",
        "variant": "info"
      },
      {
        "type": "heading",
        "content": "1. Launch the EC2 instance"
      },
      {
        "type": "list",
        "items": [
          "In the AWS Console, go to **EC2 → AMIs**.",
          "Select the **Nginx Proxy Manager – Hardened Edition (Ubuntu 22.04) by Northstar Cloud Solutions**.",
          "Click **Launch instance**.",
          "Choose an instance type:\n  - For testing: `t3.micro` / `t3.small`\n  - For light production: `t3.medium` or higher (depending on traffic)",
          "Select / create a key pair.",
          "Configure **network and security group** to allow:\n  - `22/tcp` – SSH\n  - `80/tcp` – HTTP\n  - `81/tcp` – NPM admin UI\n  - `443/tcp` – HTTPS",
          "Launch the instance."
        ]
      },
      {
        "type": "heading",
        "content": "2. First SSH login & credentials"
      },
      {
        "type": "paragraph",
        "content": "Once the instance is running:"
      },
      {
        "type": "list",
        "items": [
          "SSH in as `ubuntu`:",
          "On login, you will see a **MOTD banner** that looks like:",
          "Credentials are shown on the **first SSH login** via the MOTD banner. For security, they are not re-printed on future logins.\nIf you need to retrieve or rotate credentials later, see **Security** (`docs/security.md`) and use `sudo npm-helper rotate-admin`."
        ]
      },
      {
        "type": "code",
        "content": "ssh -i /path/to/key.pem ubuntu@<instance-public-ip>",
        "language": "bash"
      },
      {
        "type": "code",
        "content": "Nginx Proxy Manager – Hardened Edition (Ubuntu 22.04) by Northstar Cloud Solutions\n\nAdmin URL: http://<instance-ip>:81\nUsername: admin@example.com\nPassword: <generated-strong-password> (shown on first login only)",
        "language": "text"
      },
      {
        "type": "heading",
        "content": "3. Log into Nginx Proxy Manager (Hardened Edition)"
      },
      {
        "type": "list",
        "items": [
          "Open your browser to:",
          "Log in with the **username and password** from the MOTD or credentials file.",
          "You’re now in the NPM admin interface."
        ]
      },
      {
        "type": "code",
        "content": "http://<instance-public-ip>:81",
        "language": "text"
      },
      {
        "type": "heading",
        "content": "CloudWatch (Optional)"
      },
      {
        "type": "paragraph",
        "content": "CloudWatch logs and metrics are optional and only ship if you attach an instance role/policy. Lack of IAM permissions should not break the application."
      },
      {
        "type": "paragraph",
        "content": "Check agent status:"
      },
      {
        "type": "code",
        "content": "sudo systemctl status amazon-cloudwatch-agent --no-pager\nsudo journalctl -u amazon-cloudwatch-agent -n 200 --no-pager",
        "language": "bash"
      },
      {
        "type": "heading",
        "content": "4. Create your first proxy host"
      },
      {
        "type": "paragraph",
        "content": "Inside NPM:"
      },
      {
        "type": "list",
        "items": [
          "Go to **Hosts → Proxy Hosts → Add Proxy Host**.",
          "Set:\n  - **Domain Names**: `app.example.com`\n  - **Scheme**: `http`\n  - **Forward Hostname / IP**: internal app address (e.g., `10.0.1.23` or another EC2 instance)\n  - **Forward Port**: `3000` (for example)",
          "(Optional) Enable **SSL** and use Let’s Encrypt once DNS is pointing at the instance.",
          "Save."
        ]
      },
      {
        "type": "paragraph",
        "content": "Once DNS is configured and propagated, `https://app.example.com` will route through this NPM instance."
      },
      {
        "type": "heading",
        "content": "5. Basic health checks"
      },
      {
        "type": "paragraph",
        "content": "On the instance, you can sanity-check everything:"
      },
      {
        "type": "code",
        "content": "# Check systemd services\nsudo systemctl status docker\nsudo systemctl status npm\nsudo systemctl status npm-init\n\n# Check Docker containers\ncd /opt/npm\nsudo docker compose ps\n\n# Check helper status\nsudo npm-helper status",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "If those look good, you’re up and running."
      },
      {
        "type": "heading",
        "content": "Next steps"
      },
      {
        "type": "list",
        "items": [
          "See **Operations** for CLI usage and logs.",
          "See **Backup & Restore** to set up backups (local + S3).",
          "See **Examples: Multi-App Setup** to host multiple apps behind NPM."
        ]
      }
    ]
  },
  "security-hardening": {
    "id": "security-hardening",
    "title": "Security & Hardening",
    "description": "The Nginx Proxy Manager – Hardened Edition AMI ships with a conservative security baseline applied out of the box.",
    "productId": "nginx-proxy-manager",
    "content": [
      {
        "type": "paragraph",
        "content": "This AMI ships with a conservative security baseline applied out of the box."
      },
      {
        "type": "heading",
        "content": "SSH configuration"
      },
      {
        "type": "list",
        "items": [
          "`PasswordAuthentication no`",
          "`PermitRootLogin no`",
          "`PubkeyAuthentication yes`",
          "`UsePAM yes`",
          "`Banner /etc/issue.net` – displays a legal/security notice"
        ]
      },
      {
        "type": "paragraph",
        "content": "**Implications:**"
      },
      {
        "type": "list",
        "items": [
          "You **must** use SSH keys to access the instance.",
          "Logging in directly as `root` via SSH is disabled.",
          "You should SSH as `ubuntu` (or another user you configure) and use `sudo`.",
          "Initial admin credentials are stored in `/root/npm-admin-credentials.txt` (root-only, `0600`). Rotate the password after first login and delete the file if your policy requires it."
        ]
      },
      {
        "type": "heading",
        "content": "Firewall (UFW)"
      },
      {
        "type": "paragraph",
        "content": "UFW is installed and configured to:"
      },
      {
        "type": "list",
        "items": [
          "Deny all incoming connections by default",
          "Allow all outgoing connections by default",
          "Allow only:\n  - `22/tcp` – SSH\n  - `80/tcp` – HTTP\n  - `81/tcp` – NPM admin UI\n  - `443/tcp` – HTTPS"
        ]
      },
      {
        "type": "paragraph",
        "content": "Check rules:"
      },
      {
        "type": "code",
        "content": "sudo ufw status numbered",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "If you need to allow additional ports, use:"
      },
      {
        "type": "code",
        "content": "sudo ufw allow <port>/tcp comment 'your-service-name'",
        "language": "bash"
      },
      {
        "type": "heading",
        "content": "Fail2ban"
      },
      {
        "type": "paragraph",
        "content": "Fail2ban is configured with an `sshd` jail:"
      },
      {
        "type": "list",
        "items": [
          "Monitors `/var/log/auth.log`",
          "Bans IPs after repeated failed SSH logins",
          "Uses the `systemd` backend for better integration with Ubuntu 22.04"
        ]
      },
      {
        "type": "paragraph",
        "content": "Check status:"
      },
      {
        "type": "code",
        "content": "sudo systemctl status fail2ban\nsudo fail2ban-client status sshd",
        "language": "bash"
      },
      {
        "type": "subheading",
        "content": "Fail2ban: Check Status and Unban an IP"
      },
      {
        "type": "paragraph",
        "content": "Check fail2ban status:"
      },
      {
        "type": "code",
        "content": "sudo systemctl status fail2ban --no-pager\nsudo fail2ban-client status",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Check the SSH jail (commonly named `sshd`):"
      },
      {
        "type": "code",
        "content": "sudo fail2ban-client status sshd",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "If the jail name differs in your environment, list jails using `sudo fail2ban-client status`."
      },
      {
        "type": "paragraph",
        "content": "Unban a specific IP address:"
      },
      {
        "type": "code",
        "content": "sudo fail2ban-client set sshd unbanip <IP_ADDRESS>",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Warning: ensure you still have valid SSH key access before changing bans. Prefer allowing only trusted IPs in your EC2 Security Group for port `22/tcp`."
      },
      {
        "type": "heading",
        "content": "Sysctl hardening"
      },
      {
        "type": "paragraph",
        "content": "A small set of IPv4 hardening options is applied via:"
      },
      {
        "type": "code",
        "content": "/etc/sysctl.d/99-brand-hardened.conf",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "These settings:"
      },
      {
        "type": "list",
        "items": [
          "Disable accepting/sending ICMP redirects",
          "Disable accepting source-routed packets",
          "Ignore ICMP echo broadcasts",
          "Enable reverse path filtering"
        ]
      },
      {
        "type": "paragraph",
        "content": "They are chosen to be **conservative** and not break normal traffic."
      },
      {
        "type": "heading",
        "content": "SSH host keys & machine identity"
      },
      {
        "type": "paragraph",
        "content": "For AMI integrity:"
      },
      {
        "type": "list",
        "items": [
          "SSH host keys are removed during AMI creation",
          "Machine ID is reset"
        ]
      },
      {
        "type": "subheading",
        "content": "SSH Host Key Regeneration"
      },
      {
        "type": "paragraph",
        "content": "SSH host keys are regenerated on first boot via `cloud-init` so each instance launched from the AMI has unique host keys. If you reuse an Elastic IP address or DNS name, your SSH client may show a one-time “host key changed” warning on the first connection to the new instance. This is expected behavior and does not indicate compromise. Update your local `known_hosts` entry for the hostname/IP and reconnect."
      },
      {
        "type": "paragraph",
        "content": "On first boot of an instance:"
      },
      {
        "type": "list",
        "items": [
          "New SSH host keys are generated",
          "A new machine ID is created"
        ]
      },
      {
        "type": "paragraph",
        "content": "This ensures that **each** EC2 instance launched from the AMI has unique cryptographic material and identity."
      }
    ]
  },
  "troubleshooting": {
    "id": "troubleshooting",
    "title": "Troubleshooting",
    "description": "Common issues and how to debug them for the Nginx Proxy Manager – Hardened Edition.",
    "productId": "nginx-proxy-manager",
    "content": [
      {
        "type": "paragraph",
        "content": "Common issues and how to debug them."
      },
      {
        "type": "heading",
        "content": "First boot FAQ (Preflight / Init / Post-init)"
      },
      {
        "type": "paragraph",
        "content": "The first boot flow is:"
      },
      {
        "type": "list",
        "items": [
          "`npm-preflight.service` (preflight checks)",
          "`npm-init.service` (one-time initialization)",
          "`npm-postinit.service` (post-init health summary)"
        ]
      },
      {
        "type": "paragraph",
        "content": "Status is visible in:"
      },
      {
        "type": "list",
        "items": [
          "The SSH login banner (MOTD) under **Initialization Status**",
          "`sudo npm-helper status`",
          "Status files:\n  - `/var/lib/northstar/npm/preflight-status`\n  - `/var/lib/npm-init-complete` (marker file)\n  - `/var/lib/northstar/npm/postinit-status`"
        ]
      },
      {
        "type": "subheading",
        "content": "Preflight failures"
      },
      {
        "type": "paragraph",
        "content": "Preflight checks for common blockers (disk space, Docker active, docker compose available, image pullability, directory permissions, required tools)."
      },
      {
        "type": "paragraph",
        "content": "Commands:"
      },
      {
        "type": "code",
        "content": "sudo systemctl status npm-preflight --no-pager\nsudo journalctl -u npm-preflight --no-pager -n 200\nsudo npm-helper status",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Most common causes:"
      },
      {
        "type": "list",
        "items": [
          "Insufficient disk space",
          "Docker inactive",
          "docker compose missing",
          "No outbound internet access (image pull fails)",
          "Permissions/ownership issues on `/opt/npm` or its subdirectories",
          "Missing `curl` on the host"
        ]
      },
      {
        "type": "subheading",
        "content": "Init / post-init failures"
      },
      {
        "type": "paragraph",
        "content": "`npm-init.service` generates the initial admin credentials once and writes a marker file. `npm-postinit.service` checks that the stack is running and the UI responds locally."
      },
      {
        "type": "paragraph",
        "content": "Commands:"
      },
      {
        "type": "code",
        "content": "sudo systemctl status npm-init npm-postinit npm --no-pager\nsudo journalctl -u npm-init -n 200 --no-pager\nsudo journalctl -u npm-postinit -n 200 --no-pager\nsudo npm-helper diagnostics --json",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Safe rerun guidance:"
      },
      {
        "type": "list",
        "items": [
          "`sudo systemctl start npm-preflight.service`",
          "`sudo systemctl start npm-init.service`",
          "`sudo systemctl start npm-postinit.service`"
        ]
      },
      {
        "type": "subheading",
        "content": "Admin credential visibility and recovery"
      },
      {
        "type": "list",
        "items": [
          "The admin password is shown **only once** on the first SSH login (MOTD).",
          "Credentials are stored in a root-only file (see `docs/security.md`).",
          "`npm-helper show-admin` does **not** print the password.",
          "If you missed the initial password, rotate credentials:\n  - `sudo npm-helper rotate-admin`"
        ]
      },
      {
        "type": "subheading",
        "content": "CloudWatch (IAM optional)"
      },
      {
        "type": "paragraph",
        "content": "CloudWatch logs/metrics ship only when you attach an instance role/policy. Lack of IAM must not break the application."
      },
      {
        "type": "paragraph",
        "content": "Commands:"
      },
      {
        "type": "code",
        "content": "sudo systemctl status amazon-cloudwatch-agent --no-pager\nsudo journalctl -u amazon-cloudwatch-agent -n 200 --no-pager",
        "language": "bash"
      },
      {
        "type": "heading",
        "content": "NPM admin UI is not reachable on port 81"
      },
      {
        "type": "list",
        "items": [
          "Check security group:\n  - Ensure `81/tcp` is allowed from your IP or CIDR.",
          "Check UFW on the instance:\nMake sure port 81 appears as allowed.",
          "Check services:",
          "Check Docker containers:"
        ]
      },
      {
        "type": "code",
        "content": "sudo ufw status numbered",
        "language": "bash"
      },
      {
        "type": "code",
        "content": "sudo systemctl status docker\nsudo systemctl status npm",
        "language": "bash"
      },
      {
        "type": "code",
        "content": "cd /opt/npm\nsudo docker compose ps",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "If the NPM container is not running, check logs:"
      },
      {
        "type": "code",
        "content": "cd /opt/npm\nsudo docker compose logs",
        "language": "bash"
      },
      {
        "type": "heading",
        "content": "I lost the admin password"
      },
      {
        "type": "paragraph",
        "content": "You can always recover or reset it from the instance:"
      },
      {
        "type": "list",
        "items": [
          "Show current username:",
          "Force a rotation (generates a new password):"
        ]
      },
      {
        "type": "code",
        "content": "sudo npm-helper show-admin",
        "language": "bash"
      },
      {
        "type": "code",
        "content": "sudo npm-helper rotate-admin",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "For security, passwords are not re-printed on login. See `docs/security.md` for where the credentials are stored and how to handle them safely."
      },
      {
        "type": "heading",
        "content": "Backups do not appear in S3"
      },
      {
        "type": "list",
        "items": [
          "Check `/etc/npm-backup.conf`:\n  - `s3_bucket` is set\n  - `s3_prefix` is what you expect",
          "Ensure the instance has an IAM role with permissions to write to the bucket.",
          "Run:",
          "Check the output for warnings.",
          "Verify the S3 bucket in the AWS Console."
        ]
      },
      {
        "type": "code",
        "content": "sudo npm-backup",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "Remember: even if S3 upload fails, local backups are still created in\n`local_backup_dir`."
      },
      {
        "type": "heading",
        "content": "CloudWatch logs are missing"
      },
      {
        "type": "list",
        "items": [
          "Check the agent service:",
          "Check journal:",
          "Ensure the instance IAM role has permissions to write CloudWatch Logs.",
          "In the AWS Console, navigate to:\n  - CloudWatch → Logs → Log groups → `/northstar-cloud-solutions/npm`"
        ]
      },
      {
        "type": "code",
        "content": "sudo systemctl status amazon-cloudwatch-agent",
        "language": "bash"
      },
      {
        "type": "code",
        "content": "sudo journalctl -u amazon-cloudwatch-agent",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "If the agent is running but logs are missing, IAM permissions are the most common cause."
      },
      {
        "type": "heading",
        "content": "Getting more help"
      },
      {
        "type": "paragraph",
        "content": "Before opening a support request, run:"
      },
      {
        "type": "code",
        "content": "sudo npm-diagnostics",
        "language": "bash"
      },
      {
        "type": "paragraph",
        "content": "and include the output (or relevant parts) so we can help you more quickly."
      }
    ]
  },
  "upgrades": {
    "id": "upgrades",
    "title": "Upgrades",
    "description": "How to think about upgrades for the Nginx Proxy Manager – Hardened Edition. The design philosophy is stability first.",
    "productId": "nginx-proxy-manager",
    "content": [
      {
        "type": "paragraph",
        "content": "This document explains how to think about upgrades for the AMI:"
      },
      {
        "type": "paragraph",
        "content": "**Nginx Proxy Manager – Hardened Edition (Ubuntu 22.04) by Northstar Cloud Solutions**"
      },
      {
        "type": "paragraph",
        "content": "The design philosophy is **stability first**:"
      },
      {
        "type": "list",
        "items": [
          "The base OS is a hardened Ubuntu 22.04 image.",
          "Nginx Proxy Manager (Hardened Edition) is pinned to a specific, tested Docker image tag.",
          "You choose when to upgrade instead of things changing underneath you."
        ]
      },
      {
        "type": "heading",
        "content": "1. OS & package updates"
      },
      {
        "type": "paragraph",
        "content": "The underlying OS is **Ubuntu 22.04**."
      },
      {
        "type": "paragraph",
        "content": "Security updates are handled by `unattended-upgrades`, but you can still run\nmanual updates when needed:"
      },
      {
        "type": "code",
        "content": "sudo apt-get update\nsudo apt-get upgrade",
        "language": "bash"
      },
      {
        "type": "heading",
        "content": "2. Upgrading to a newer AMI version"
      },
      {
        "type": "paragraph",
        "content": "When Northstar Cloud Solutions releases a new version of the AMI (e.g., with updated NPM Docker image, security patches, or new features), you can upgrade by launching a new instance from the newer AMI and migrating your data."
      },
      {
        "type": "subheading",
        "content": "Recommended upgrade workflow"
      },
      {
        "type": "list",
        "items": [
          "**Backup your current instance:**\nIf you have S3 configured, the backup will be uploaded automatically. Otherwise, copy the backup file from `/var/backups/` to a safe location.",
          "**Launch a new instance from the newer AMI:**\n  - In AWS Console, select the latest AMI version\n  - Use the same instance type (or upgrade if needed)\n  - Configure security groups and networking as before",
          "**Test the new instance:**\n  - Verify the new instance boots correctly\n  - Check that NPM admin UI is accessible\n  - Confirm CloudWatch logs and metrics are working\n  - Test basic functionality before migrating data",
          "**Restore your data to the new instance:**",
          "**Verify everything works:**\n  - Log into NPM admin UI\n  - Check that all proxy hosts are present\n  - Verify SSL certificates are intact\n  - Test a few proxy hosts to ensure routing works",
          "**Switch traffic (if applicable):**\n  - Update DNS records to point to the new instance\n  - Update load balancer targets\n  - Monitor for any issues",
          "**Keep old instance running temporarily:**\n  - Don't terminate the old instance immediately\n  - Keep it running for a few days as a rollback option\n  - Once confident, terminate the old instance"
        ]
      },
      {
        "type": "code",
        "content": "sudo npm-backup",
        "language": "bash"
      },
      {
        "type": "code",
        "content": "# Copy backup file to new instance (via S3, scp, or other method)\nsudo npm-restore /path/to/npm-YYYYMMDDHHMMSS.tar.gz",
        "language": "bash"
      },
      {
        "type": "subheading",
        "content": "Rollback considerations"
      },
      {
        "type": "paragraph",
        "content": "If something goes wrong with the new instance:"
      },
      {
        "type": "list",
        "items": [
          "The old instance is still running with your original data",
          "Simply point DNS/load balancer back to the old instance",
          "Investigate issues on the new instance without pressure",
          "Fix issues and try the upgrade again when ready"
        ]
      },
      {
        "type": "heading",
        "content": "3. Updating NPM Docker image (optional in-place patch upgrade)"
      },
      {
        "type": "paragraph",
        "content": "The AMI pins NPM to a specific, tested Docker image tag for stability. The recommended approach is to upgrade by launching a newer AMI version and restoring from backup. If you choose to update NPM in-place, you are choosing to deviate from the pinned version promise and assume the operational risk."
      },
      {
        "type": "note",
        "content": "**Warning:** In-place NPM image updates are optional and not automatic. Test in a non-production environment first.",
        "variant": "warning"
      },
      {
        "type": "subheading",
        "content": "When to consider manual updates"
      },
      {
        "type": "list",
        "items": [
          "You need a feature available in a newer NPM version",
          "A security vulnerability is patched in a newer version",
          "You're comfortable troubleshooting Docker and NPM issues"
        ]
      },
      {
        "type": "subheading",
        "content": "Conservative in-place steps (patch updates)"
      },
      {
        "type": "list",
        "items": [
          "**Backup first:**",
          "**Edit the Docker Compose file to a newer patch tag:**\nChange the image tag, for example:",
          "**Pull the new image:**",
          "**Restart the stack:**",
          "**Verify everything works:**\n  - Check NPM admin UI is accessible\n  - Verify all proxy hosts are still configured\n  - Test a few proxy hosts\n  - Monitor for a few hours"
        ]
      },
      {
        "type": "code",
        "content": "sudo npm-backup",
        "language": "bash"
      },
      {
        "type": "code",
        "content": "sudo nano /opt/npm/docker-compose.yml",
        "language": "bash"
      },
      {
        "type": "code",
        "content": "# From:\nimage: \"jc21/nginx-proxy-manager:2.13.5\"\n\n# To:\nimage: \"jc21/nginx-proxy-manager:2.13.6\"",
        "language": "yaml"
      },
      {
        "type": "code",
        "content": "cd /opt/npm\nsudo docker compose pull",
        "language": "bash"
      },
      {
        "type": "code",
        "content": "sudo systemctl restart npm",
        "language": "bash"
      },
      {
        "type": "subheading",
        "content": "Rollback (revert the pinned tag)"
      },
      {
        "type": "paragraph",
        "content": "If something breaks after an in-place update:"
      },
      {
        "type": "list",
        "items": [
          "Revert the `image:` tag in `/opt/npm/docker-compose.yml` back to the previously pinned value.",
          "Restart the stack:",
          "If needed, restore from a known-good backup using `npm-restore`."
        ]
      },
      {
        "type": "code",
        "content": "sudo systemctl restart npm",
        "language": "bash"
      },
      {
        "type": "subheading",
        "content": "Staying on the pinned version"
      },
      {
        "type": "paragraph",
        "content": "The AMI's pinned version is tested and known to work. For production stability, consider:"
      },
      {
        "type": "list",
        "items": [
          "Waiting for the next AMI release that includes the newer NPM version",
          "Testing newer versions in a separate test instance first",
          "Contacting support if you need a specific NPM version"
        ]
      },
      {
        "type": "heading",
        "content": "4. Best practices"
      },
      {
        "type": "subheading",
        "content": "Always backup before upgrades"
      },
      {
        "type": "paragraph",
        "content": "Whether upgrading the AMI or manually updating NPM:"
      },
      {
        "type": "list",
        "items": [
          "Create a backup using `npm-backup`",
          "Verify the backup file exists and is not corrupted",
          "Store backups in S3 or another safe location",
          "Keep multiple backup generations"
        ]
      },
      {
        "type": "subheading",
        "content": "Test in non-production first"
      },
      {
        "type": "list",
        "items": [
          "Launch a test instance from the new AMI",
          "Restore a copy of your production backup to the test instance",
          "Verify all functionality works",
          "Only upgrade production after successful testing"
        ]
      },
      {
        "type": "subheading",
        "content": "Monitor after upgrades"
      },
      {
        "type": "list",
        "items": [
          "Check CloudWatch logs for errors",
          "Monitor CloudWatch metrics for unusual patterns",
          "Test all critical proxy hosts",
          "Verify SSL certificates are still valid",
          "Check that backups continue to work"
        ]
      },
      {
        "type": "subheading",
        "content": "When to contact support"
      },
      {
        "type": "paragraph",
        "content": "Contact Northstar Cloud Solutions support if:"
      },
      {
        "type": "list",
        "items": [
          "The upgrade process fails unexpectedly",
          "Data is lost during migration",
          "NPM becomes inaccessible after upgrade",
          "You encounter errors not covered in this documentation",
          "You need guidance on a specific upgrade scenario"
        ]
      },
      {
        "type": "subheading",
        "content": "Upgrade timing"
      },
      {
        "type": "list",
        "items": [
          "Plan upgrades during maintenance windows",
          "Avoid upgrading during peak traffic periods",
          "Have a rollback plan ready",
          "Communicate with your team about the upgrade schedule"
        ]
      }
    ]
  }
};

export const getDocContent = (id: string): DocContent | undefined => {
  return docContents[id];
};
