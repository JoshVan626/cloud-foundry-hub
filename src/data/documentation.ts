export interface DocSection {
  id: string;
  title: string;
  icon: string;
  items: {
    id: string;
    label: string;
  }[];
}

export interface DocContent {
  id: string;
  title: string;
  description: string;
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
    id: "getting-started",
    title: "Getting Started",
    icon: "Rocket",
    items: [
      { id: "quickstart", label: "Quickstart" },
      { id: "multi-app", label: "Multi-App Setup" },
    ],
  },
  {
    id: "security",
    title: "Security & Hardening",
    icon: "Shield",
    items: [
      { id: "security-hardening", label: "Security Overview" },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    icon: "Terminal",
    items: [
      { id: "operations", label: "Lifecycle & CLI" },
      { id: "troubleshooting", label: "Troubleshooting" },
    ],
  },
  {
    id: "backup",
    title: "Backup & Restore",
    icon: "Database",
    items: [
      { id: "backup-restore", label: "Backup & Restore" },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring",
    icon: "Activity",
    items: [
      { id: "monitoring", label: "CloudWatch Integration" },
    ],
  },
  {
    id: "upgrades",
    title: "Upgrades",
    icon: "RefreshCw",
    items: [
      { id: "upgrades", label: "AMI Upgrades" },
      { id: "roadmap", label: "Roadmap" },
    ],
  },
];

export const docContents: Record<string, DocContent> = {
  quickstart: {
    id: "quickstart",
    title: "Quickstart",
    description: "Go from AMI to a running Nginx Proxy Manager admin panel in minutes.",
    content: [
      {
        type: "prereq",
        items: [
          "AWS Account with EC2 launch permissions",
          "Familiarity with launching EC2 instances and security groups",
          "SSH key pair configured in your target region",
          "VPC with public subnet (for proxy use cases)",
        ],
      },
      {
        type: "heading",
        content: "1. Launch the EC2 Instance",
      },
      {
        type: "paragraph",
        content: "In the AWS Console, go to EC2 → AMIs and select the Nginx Proxy Manager – Hardened Edition (Ubuntu 22.04) by Northstar Cloud Solutions. Click Launch instance.",
      },
      {
        type: "paragraph",
        content: "Choose an instance type:",
      },
      {
        type: "list",
        items: [
          "For testing: t3.micro / t3.small",
          "For light production: t3.small is the recommended baseline",
          "For higher traffic: t3.medium or larger depending on load",
        ],
      },
      {
        type: "paragraph",
        content: "Configure network and security group to allow the following ports:",
      },
      {
        type: "code",
        language: "text",
        content: `22/tcp   - SSH
80/tcp   - HTTP
81/tcp   - NPM Admin UI
443/tcp  - HTTPS`,
      },
      {
        type: "heading",
        content: "2. First SSH Login & Credentials",
      },
      {
        type: "paragraph",
        content: "Once the instance is running, SSH in as user ubuntu:",
      },
      {
        type: "code",
        language: "bash",
        content: `ssh -i /path/to/key.pem ubuntu@<instance-public-ip>`,
      },
      {
        type: "paragraph",
        content: "On login, you will see a MOTD banner displaying your admin URL and credentials:",
      },
      {
        type: "code",
        language: "text",
        content: `Nginx Proxy Manager – Hardened Edition (Ubuntu 22.04) by Northstar Cloud Solutions

Admin URL: http://<instance-ip>:81
Username: admin@example.com
Password: <generated-strong-password> (shown on first login only)`,
      },
      {
        type: "note",
        variant: "info",
        content: "Credentials are uniquely generated on first boot and displayed in the MOTD banner. For security, they are not re-printed on future logins.",
      },
      {
        type: "subheading",
        content: "Credential Recovery",
      },
      {
        type: "paragraph",
        content: "If you missed the credentials at login, they are saved in a root-only file:",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo cat /root/npm-admin-credentials.txt`,
      },
      {
        type: "heading",
        content: "3. Log into Nginx Proxy Manager",
      },
      {
        type: "paragraph",
        content: "Open your browser to the admin panel:",
      },
      {
        type: "code",
        language: "text",
        content: `http://<instance-public-ip>:81`,
      },
      {
        type: "paragraph",
        content: "Log in with the username and password from the MOTD or credentials file. You're now in the NPM admin interface.",
      },
      {
        type: "heading",
        content: "4. Create Your First Proxy Host",
      },
      {
        type: "paragraph",
        content: "Inside NPM, go to Hosts → Proxy Hosts → Add Proxy Host and configure:",
      },
      {
        type: "list",
        items: [
          "Domain Names: app.example.com",
          "Scheme: http",
          "Forward Hostname / IP: internal app address (e.g., 10.0.1.23)",
          "Forward Port: 3000 (for example)",
        ],
      },
      {
        type: "paragraph",
        content: "Optionally enable SSL and use Let's Encrypt once DNS is pointing at the instance. Save, and once DNS is configured and propagated, https://app.example.com will route through this NPM instance.",
      },
      {
        type: "heading",
        content: "5. Basic Health Checks",
      },
      {
        type: "paragraph",
        content: "On the instance, you can sanity-check everything:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Check systemd services
sudo systemctl status docker
sudo systemctl status npm
sudo systemctl status npm-init

# Check Docker containers
cd /opt/npm
sudo docker compose ps

# Check helper status
sudo npm-helper status`,
      },
      {
        type: "note",
        variant: "success",
        content: "If those look good, you're up and running! CloudWatch logs and metrics are optional and only ship if you attach an instance role/policy.",
      },
    ],
  },
  "multi-app": {
    id: "multi-app",
    title: "Hosting Multiple Apps Behind NPM",
    description: "A common use case: run multiple applications behind a single NPM instance on EC2.",
    content: [
      {
        type: "heading",
        content: "Scenario",
      },
      {
        type: "paragraph",
        content: "You have one NPM Hardened Edition instance and two backend apps:",
      },
      {
        type: "list",
        items: [
          "app1 on another EC2 instance at 10.0.1.10:3000",
          "app2 on another EC2 instance at 10.0.1.11:4000",
        ],
      },
      {
        type: "paragraph",
        content: "You want:",
      },
      {
        type: "list",
        items: [
          "https://app1.example.com → 10.0.1.10:3000",
          "https://app2.example.com → 10.0.1.11:4000",
        ],
      },
      {
        type: "heading",
        content: "Steps",
      },
      {
        type: "subheading",
        content: "1. Configure DNS",
      },
      {
        type: "paragraph",
        content: "Point DNS (A records) for both domains to the NPM instance public IP or load balancer:",
      },
      {
        type: "list",
        items: [
          "app1.example.com → NPM instance public IP",
          "app2.example.com → NPM instance public IP",
        ],
      },
      {
        type: "subheading",
        content: "2. Configure Proxy Hosts in NPM",
      },
      {
        type: "paragraph",
        content: "Add Proxy Host for app1.example.com:",
      },
      {
        type: "list",
        items: [
          "Domain Names: app1.example.com",
          "Scheme: http",
          "Forward Hostname / IP: 10.0.1.10",
          "Forward Port: 3000",
          "Enable SSL (Let's Encrypt) once DNS is working",
        ],
      },
      {
        type: "paragraph",
        content: "Add Proxy Host for app2.example.com:",
      },
      {
        type: "list",
        items: [
          "Domain Names: app2.example.com",
          "Scheme: http",
          "Forward Hostname / IP: 10.0.1.11",
          "Forward Port: 4000",
          "Enable SSL (Let's Encrypt) once DNS is working",
        ],
      },
      {
        type: "subheading",
        content: "3. Optional: Use an Application Load Balancer",
      },
      {
        type: "paragraph",
        content: "Put the NPM instance behind an Application Load Balancer (ALB) that terminates TLS and forwards to the NPM instance. In that case, you can run NPM in HTTP-only mode internally and let ALB handle TLS.",
      },
      {
        type: "heading",
        content: "Tips",
      },
      {
        type: "list",
        items: [
          "Consider using private subnets and security groups so only the NPM instance can reach your backend apps",
          "Use separate NPM access lists if some apps should be restricted",
          "Use backups to protect NPM configuration and TLS certificates",
        ],
      },
    ],
  },
  "security-hardening": {
    id: "security-hardening",
    title: "Security & Hardening",
    description: "This AMI ships with a conservative security baseline applied out of the box.",
    content: [
      {
        type: "heading",
        content: "SSH Configuration",
      },
      {
        type: "paragraph",
        content: "SSH access is locked down with industry best practices:",
      },
      {
        type: "code",
        language: "bash",
        content: `# /etc/ssh/sshd_config hardening
PasswordAuthentication no
PermitRootLogin no
PubkeyAuthentication yes
UsePAM yes
Banner /etc/issue.net`,
      },
      {
        type: "paragraph",
        content: "Implications:",
      },
      {
        type: "list",
        items: [
          "You must use SSH keys to access the instance",
          "Logging in directly as root via SSH is disabled",
          "SSH as ubuntu (or another user you configure) and use sudo",
          "Initial admin credentials are stored in /root/npm-admin-credentials.txt (root-only, 0600)",
        ],
      },
      {
        type: "note",
        variant: "warning",
        content: "Rotate the password after first login and delete the credentials file if your security policy requires it.",
      },
      {
        type: "heading",
        content: "Firewall (UFW)",
      },
      {
        type: "paragraph",
        content: "UFW is installed and configured to deny all incoming connections by default, allow all outgoing connections, and permit only essential ports:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Check current rules
sudo ufw status numbered

# Allowed ports:
# 22/tcp  - SSH
# 80/tcp  - HTTP
# 81/tcp  - NPM Admin UI
# 443/tcp - HTTPS`,
      },
      {
        type: "paragraph",
        content: "To allow additional ports:",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo ufw allow <port>/tcp comment 'your-service-name'`,
      },
      {
        type: "heading",
        content: "Fail2Ban Integration",
      },
      {
        type: "paragraph",
        content: "Fail2Ban is configured with an sshd jail that monitors /var/log/auth.log and automatically bans IP addresses after repeated failed SSH login attempts. It uses the systemd backend for better integration with Ubuntu 22.04.",
      },
      {
        type: "code",
        language: "bash",
        content: `# Check Fail2Ban status
sudo systemctl status fail2ban
sudo fail2ban-client status sshd

# Unban a specific IP address
sudo fail2ban-client set sshd unbanip <IP_ADDRESS>`,
      },
      {
        type: "note",
        variant: "warning",
        content: "Ensure you still have valid SSH key access before changing bans. Prefer allowing only trusted IPs in your EC2 Security Group for port 22/tcp.",
      },
      {
        type: "heading",
        content: "Kernel Hardening (Sysctl)",
      },
      {
        type: "paragraph",
        content: "A set of IPv4 hardening options is applied via /etc/sysctl.d/99-brand-hardened.conf:",
      },
      {
        type: "list",
        items: [
          "Disable accepting/sending ICMP redirects",
          "Disable accepting source-routed packets",
          "Ignore ICMP echo broadcasts",
          "Enable reverse path filtering to prevent IP spoofing",
        ],
      },
      {
        type: "paragraph",
        content: "These settings are conservative and do not break normal traffic.",
      },
      {
        type: "heading",
        content: "SSH Host Key Regeneration",
      },
      {
        type: "paragraph",
        content: "For AMI integrity, SSH host keys are removed during AMI creation and machine ID is reset. On first boot of an instance:",
      },
      {
        type: "list",
        items: [
          "New SSH host keys are generated via cloud-init",
          "A new machine ID is created",
        ],
      },
      {
        type: "paragraph",
        content: "This ensures each EC2 instance launched from the AMI has unique cryptographic material and identity. If you reuse an Elastic IP or DNS name, your SSH client may show a one-time \"host key changed\" warning. Update your local known_hosts entry and reconnect.",
      },
    ],
  },
  operations: {
    id: "operations",
    title: "Operations",
    description: "Understanding the first-boot lifecycle, CLI tools, and day-to-day operations.",
    content: [
      {
        type: "heading",
        content: "NPM Initialization (First Boot)",
      },
      {
        type: "paragraph",
        content: "On first boot, the appliance uses a three-stage initialization sequence:",
      },
      {
        type: "list",
        items: [
          "npm-preflight.service → System checks and clear failure reasons",
          "npm-init.service → One-time credential initialization",
          "npm-postinit.service → Post-init health verification",
        ],
      },
      {
        type: "paragraph",
        content: "You can see the current state in the SSH login banner (MOTD) under Initialization Status, or by running:",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo npm-helper status`,
      },
      {
        type: "paragraph",
        content: "The npm-init.service runs once to:",
      },
      {
        type: "list",
        items: [
          "Wait for the NPM SQLite database to become ready (up to ~300 seconds)",
          "Generate a secure random admin password",
          "Update the database with the new credentials",
          "Write credentials to a root-only file",
          "Update the SSH login banner (MOTD)",
        ],
      },
      {
        type: "heading",
        content: "npm-helper CLI Toolkit",
      },
      {
        type: "paragraph",
        content: "The npm-helper CLI is installed under /usr/local/bin and provides essential management commands:",
      },
      {
        type: "code",
        language: "bash",
        content: `# View service health and container status
npm-helper status

# Retrieve the current admin username
npm-helper show-admin

# Securely generate and reset the admin password
npm-helper rotate-admin

# Generate a technical health report for support
npm-helper diagnostics

# One-click Ubuntu security patching
npm-helper update-os`,
      },
      {
        type: "subheading",
        content: "status",
      },
      {
        type: "paragraph",
        content: "Shows Docker service status, npm service status, container status from docker compose ps, and last backup timestamp found under /var/backups. This is a quick way to check if the system is healthy.",
      },
      {
        type: "subheading",
        content: "show-admin",
      },
      {
        type: "paragraph",
        content: "Outputs the current admin username. Note: the password is not displayed again after first login for security.",
      },
      {
        type: "subheading",
        content: "rotate-admin",
      },
      {
        type: "paragraph",
        content: "Generates a new strong random password, updates the NPM auth table with the new bcrypt hash, and writes new credentials to the root-only credentials file. Use this whenever you want to rotate the admin password without using the web UI.",
      },
      {
        type: "subheading",
        content: "diagnostics",
      },
      {
        type: "paragraph",
        content: "Emits non-sensitive diagnostic JSON for support/troubleshooting. Use --json flag for structured output.",
      },
      {
        type: "subheading",
        content: "update-os",
      },
      {
        type: "paragraph",
        content: "Runs a one-click apt-get update + apt-get upgrade for Ubuntu security patching. May require a reboot.",
      },
      {
        type: "heading",
        content: "Systemd Services",
      },
      {
        type: "paragraph",
        content: "Key services running on the appliance:",
      },
      {
        type: "list",
        items: [
          "docker.service – Docker engine",
          "npm.service – NPM Docker stack",
          "npm-preflight.service – First-boot preflight checks",
          "npm-init.service – One-time first-boot initialization",
          "npm-postinit.service – First-boot post-init health summary",
          "npm-backup.timer – Daily backup timer (runs at 02:00)",
          "amazon-cloudwatch-agent.service – CloudWatch log shipping",
        ],
      },
      {
        type: "code",
        language: "bash",
        content: `# Check status
sudo systemctl status npm
sudo systemctl status docker
sudo systemctl status amazon-cloudwatch-agent

# View logs
sudo journalctl -u npm
sudo journalctl -u amazon-cloudwatch-agent

# Restart NPM stack
sudo systemctl restart npm`,
      },
      {
        type: "heading",
        content: "Data Locations",
      },
      {
        type: "paragraph",
        content: "NPM runs in Docker and stores its state in:",
      },
      {
        type: "list",
        items: [
          "/opt/npm/data – Configuration and SQLite database",
          "/opt/npm/letsencrypt – TLS certificates managed by Let's Encrypt",
        ],
      },
      {
        type: "note",
        variant: "info",
        content: "Both directories are mounted into the NPM container, included in backup archives, and preserved across instance reboots.",
      },
    ],
  },
  troubleshooting: {
    id: "troubleshooting",
    title: "Troubleshooting",
    description: "Common issues and how to debug them.",
    content: [
      {
        type: "heading",
        content: "First Boot FAQ (Preflight / Init / Post-init)",
      },
      {
        type: "paragraph",
        content: "The first boot flow is: npm-preflight.service → npm-init.service → npm-postinit.service. Status is visible in the SSH login banner and via npm-helper status.",
      },
      {
        type: "paragraph",
        content: "Status files are located at:",
      },
      {
        type: "list",
        items: [
          "/var/lib/northstar/npm/preflight-status",
          "/var/lib/npm-init-complete (marker file)",
          "/var/lib/northstar/npm/postinit-status",
        ],
      },
      {
        type: "subheading",
        content: "Preflight Failures",
      },
      {
        type: "paragraph",
        content: "Preflight checks for common blockers: disk space, Docker active, docker compose available, image pullability, directory permissions, required tools.",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo systemctl status npm-preflight --no-pager
sudo journalctl -u npm-preflight --no-pager -n 200
sudo npm-helper status`,
      },
      {
        type: "paragraph",
        content: "Most common causes:",
      },
      {
        type: "list",
        items: [
          "Insufficient disk space",
          "Docker inactive",
          "docker compose missing",
          "No outbound internet access (image pull fails)",
          "Permissions/ownership issues on /opt/npm or its subdirectories",
          "Missing curl on the host",
        ],
      },
      {
        type: "subheading",
        content: "Init / Post-init Failures",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo systemctl status npm-init npm-postinit npm --no-pager
sudo journalctl -u npm-init -n 200 --no-pager
sudo journalctl -u npm-postinit -n 200 --no-pager
sudo npm-helper diagnostics --json`,
      },
      {
        type: "paragraph",
        content: "Safe rerun commands (after fixing the underlying issue):",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo systemctl start npm-preflight.service
sudo systemctl start npm-init.service
sudo systemctl start npm-postinit.service`,
      },
      {
        type: "heading",
        content: "NPM Admin UI Not Reachable on Port 81",
      },
      {
        type: "paragraph",
        content: "1. Check security group – ensure 81/tcp is allowed from your IP or CIDR.",
      },
      {
        type: "paragraph",
        content: "2. Check UFW on the instance:",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo ufw status numbered`,
      },
      {
        type: "paragraph",
        content: "3. Check services:",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo systemctl status docker
sudo systemctl status npm`,
      },
      {
        type: "paragraph",
        content: "4. Check Docker containers:",
      },
      {
        type: "code",
        language: "bash",
        content: `cd /opt/npm
sudo docker compose ps

# If not running, check logs:
sudo docker compose logs`,
      },
      {
        type: "heading",
        content: "Lost Admin Password",
      },
      {
        type: "paragraph",
        content: "You can always recover or reset it from the instance:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Show current username
sudo npm-helper show-admin

# Force a rotation (generates a new password)
sudo npm-helper rotate-admin`,
      },
      {
        type: "note",
        variant: "info",
        content: "For security, passwords are not re-printed on login. See the Security docs for where credentials are stored and how to handle them safely.",
      },
      {
        type: "heading",
        content: "Backups Not Appearing in S3",
      },
      {
        type: "list",
        items: [
          "Check /etc/npm-backup.conf: ensure s3_bucket is set and s3_prefix is correct",
          "Ensure the instance has an IAM role with permissions to write to the bucket",
          "Run sudo npm-backup and check output for warnings",
          "Verify the S3 bucket in the AWS Console",
        ],
      },
      {
        type: "note",
        variant: "info",
        content: "Even if S3 upload fails, local backups are still created in local_backup_dir.",
      },
      {
        type: "heading",
        content: "CloudWatch Logs Missing",
      },
      {
        type: "code",
        language: "bash",
        content: `# Check the agent service
sudo systemctl status amazon-cloudwatch-agent

# Check journal
sudo journalctl -u amazon-cloudwatch-agent`,
      },
      {
        type: "paragraph",
        content: "Ensure the instance IAM role has permissions to write CloudWatch Logs. In the AWS Console, navigate to CloudWatch → Logs → Log groups → /northstar-cloud-solutions/npm. If the agent is running but logs are missing, IAM permissions are the most common cause.",
      },
      {
        type: "heading",
        content: "Getting More Help",
      },
      {
        type: "paragraph",
        content: "Before opening a support request, run the diagnostics command and include the output:",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo npm-helper diagnostics`,
      },
    ],
  },
  "backup-restore": {
    id: "backup-restore",
    title: "Backup & Restore",
    description: "Protecting your Nginx Proxy Manager data and TLS certificates with built-in backup and restore tooling.",
    content: [
      {
        type: "heading",
        content: "What Gets Backed Up",
      },
      {
        type: "paragraph",
        content: "The npm-backup script creates timestamped archives containing:",
      },
      {
        type: "list",
        items: [
          "/opt/npm/data – Configuration and SQLite database",
          "/opt/npm/letsencrypt – TLS certificates",
        ],
      },
      {
        type: "paragraph",
        content: "Backups are stored locally under a configurable directory (default: /var/backups), named like npm-YYYYMMDDHHMMSS.tar.gz, and optionally uploaded to S3.",
      },
      {
        type: "heading",
        content: "Configuration: /etc/npm-backup.conf",
      },
      {
        type: "paragraph",
        content: "Backup behavior is controlled by an INI-style configuration file:",
      },
      {
        type: "code",
        language: "ini",
        content: `[backup]
local_backup_dir = /var/backups
s3_bucket =
s3_prefix = npm
local_retention = 7`,
      },
      {
        type: "list",
        items: [
          "local_backup_dir – Directory where backup archives are stored",
          "s3_bucket – If set (e.g., my-npm-backups), backups are also uploaded to S3. If empty, S3 upload is disabled",
          "s3_prefix – Optional key prefix (e.g., npm → backups stored under npm/... in S3)",
          "local_retention – Number of most recent local backups to keep (must be 1 or greater, recommended: 7)",
        ],
      },
      {
        type: "note",
        variant: "warning",
        content: "Setting local_retention to 0 will cause npm-backup to fail with an error to prevent unbounded disk growth.",
      },
      {
        type: "heading",
        content: "Creating Backups",
      },
      {
        type: "paragraph",
        content: "Run a backup manually:",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo npm-backup`,
      },
      {
        type: "paragraph",
        content: "This will: read /etc/npm-backup.conf, create an archive under local_backup_dir, optionally upload to S3 if configured, and apply the retention policy.",
      },
      {
        type: "paragraph",
        content: "A systemd timer runs backups automatically once per day at 02:00:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Check timer status
sudo systemctl status npm-backup.timer
sudo systemctl status npm-backup.service`,
      },
      {
        type: "note",
        variant: "success",
        content: "Backups use SQLite hot-backup technology for zero-downtime protection. The database remains fully operational during backup.",
      },
      {
        type: "heading",
        content: "Checking Backup Status",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo npm-helper status`,
      },
      {
        type: "paragraph",
        content: "This displays: last backup file, last run timestamp, last success timestamp and filename, and last failure reason if present.",
      },
      {
        type: "paragraph",
        content: "Status is stored in sentinel files at /var/lib/northstar/npm/:",
      },
      {
        type: "list",
        items: [
          "backup-last-run – Timestamp of last backup start",
          "backup-last-success – Timestamp + filename on success",
          "backup-last-failure – Timestamp + reason on failure (cleared on success)",
        ],
      },
      {
        type: "heading",
        content: "Optional S3 Backups",
      },
      {
        type: "paragraph",
        content: "S3 uploads are optional. Local backups work without IAM permissions. To enable S3 sync:",
      },
      {
        type: "list",
        items: [
          "Attach an IAM role with s3:PutObject and s3:ListBucket permissions to the instance",
          "Set s3_bucket in /etc/npm-backup.conf",
          "Run sudo npm-backup to test",
        ],
      },
      {
        type: "paragraph",
        content: "Minimal IAM policy for S3 backups:",
      },
      {
        type: "code",
        language: "json",
        content: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ListBucketForPrefix",
      "Effect": "Allow",
      "Action": ["s3:ListBucket", "s3:GetBucketLocation"],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME",
      "Condition": {
        "StringLike": { "s3:prefix": ["npm/*"] }
      }
    },
    {
      "Sid": "PutObjectsInPrefix",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:AbortMultipartUpload"],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/npm/*"
    }
  ]
}`,
      },
      {
        type: "heading",
        content: "Restoring from Backup",
      },
      {
        type: "paragraph",
        content: "Use npm-restore to restore from a backup archive:",
      },
      {
        type: "code",
        language: "bash",
        content: `# List available backups
ls -1 /var/backups/npm-*.tar.gz

# Restore from specific backup
sudo npm-restore /var/backups/npm-YYYYMMDDHHMMSS.tar.gz`,
      },
      {
        type: "paragraph",
        content: "What npm-restore does:",
      },
      {
        type: "list",
        items: [
          "Stops the npm systemd service",
          "Moves existing /opt/npm/data and /opt/npm/letsencrypt to .bak-<timestamp> safety backups",
          "Extracts the archive to restore original paths",
          "Fixes ownership on restored directories",
          "Starts the npm service",
          "Performs a health check against the local NPM API (port 81)",
        ],
      },
      {
        type: "note",
        variant: "warning",
        content: "Only restore archives created by npm-backup on trusted instances. The restore script validates archive contents and will refuse to extract archives containing paths outside the expected directories.",
      },
      {
        type: "heading",
        content: "Best Practices",
      },
      {
        type: "list",
        items: [
          "Keep local_retention at least 5–7 for a buffer of good backups",
          "Use S3 uploads with IAM roles for off-instance copies",
          "After major configuration changes, force a backup with sudo npm-backup",
          "Test npm-restore in a non-production environment before you need it",
        ],
      },
    ],
  },
  monitoring: {
    id: "monitoring",
    title: "Monitoring & Metrics",
    description: "CloudWatch integration for comprehensive observability – optional but pre-configured.",
    content: [
      {
        type: "heading",
        content: "IAM Permissions (Optional)",
      },
      {
        type: "paragraph",
        content: "CloudWatch integration is optional. This AMI functions normally without any AWS IAM permissions. If no instance role is attached (or permissions are missing), the CloudWatch Agent may log permission errors but will not affect application functionality.",
      },
      {
        type: "heading",
        content: "What Gets Shipped to CloudWatch",
      },
      {
        type: "subheading",
        content: "Logs",
      },
      {
        type: "paragraph",
        content: "The following logs are shipped to CloudWatch Logs group /northstar-cloud-solutions/npm:",
      },
      {
        type: "list",
        items: [
          "/var/log/syslog",
          "/var/log/auth.log",
          "/var/lib/docker/containers/*/*-json.log",
        ],
      },
      {
        type: "paragraph",
        content: "Each instance uses separate log streams (e.g., {instance_id}-syslog, {instance_id}-auth).",
      },
      {
        type: "subheading",
        content: "Metrics",
      },
      {
        type: "paragraph",
        content: "System metrics are published under the CloudWatch namespace NorthstarCloudSolutions/System:",
      },
      {
        type: "list",
        items: [
          "Disk: used percent on /",
          "Memory: used percent",
          "CPU: idle and iowait",
          "Network: bytes in/out on the primary interface (typically eth0)",
        ],
      },
      {
        type: "note",
        variant: "info",
        content: "This AMI does not create alarms, dashboards, or notifications by default. CloudWatch retention and costs are controlled by your account settings.",
      },
      {
        type: "heading",
        content: "Minimal IAM Policy (Logs + Metrics)",
      },
      {
        type: "paragraph",
        content: "Attach an instance role with a policy similar to the following:",
      },
      {
        type: "code",
        language: "json",
        content: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudWatchLogsWrite",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CloudWatchMetricsWrite",
      "Effect": "Allow",
      "Action": ["cloudwatch:PutMetricData"],
      "Resource": "*"
    }
  ]
}`,
      },
      {
        type: "heading",
        content: "CloudWatch Agent Configuration",
      },
      {
        type: "paragraph",
        content: "The CloudWatch Agent is installed and configured via:",
      },
      {
        type: "list",
        items: [
          "Config file: /opt/aws/amazon-cloudwatch-agent/amazon-cloudwatch-agent.json",
          "Service: amazon-cloudwatch-agent.service",
        ],
      },
      {
        type: "heading",
        content: "Troubleshooting Permissions",
      },
      {
        type: "code",
        language: "bash",
        content: `# Check agent logs
sudo journalctl -u amazon-cloudwatch-agent.service -n 200 --no-pager

# If you see AccessDenied or UnauthorizedOperation:
# 1. Attach an instance role with the permissions above
# 2. Restart the agent:
sudo systemctl restart amazon-cloudwatch-agent.service`,
      },
    ],
  },
  upgrades: {
    id: "upgrades",
    title: "Upgrades",
    description: "How to think about upgrades for the Nginx Proxy Manager – Hardened Edition. The design philosophy is stability first.",
    content: [
      {
        type: "note",
        variant: "info",
        content: "The base OS is a hardened Ubuntu 22.04 image. Nginx Proxy Manager is pinned to a specific, tested Docker image tag. You choose when to upgrade instead of things changing underneath you.",
      },
      {
        type: "heading",
        content: "1. OS & Package Updates",
      },
      {
        type: "paragraph",
        content: "The underlying OS is Ubuntu 22.04. Security updates are handled by unattended-upgrades, but you can still run manual updates when needed:",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo apt-get update
sudo apt-get upgrade`,
      },
      {
        type: "heading",
        content: "2. Upgrading to a Newer AMI Version",
      },
      {
        type: "paragraph",
        content: "When Northstar Cloud Solutions releases a new version of the AMI (e.g., with updated NPM Docker image, security patches, or new features), you can upgrade by launching a new instance from the newer AMI and migrating your data.",
      },
      {
        type: "subheading",
        content: "Recommended Upgrade Workflow",
      },
      {
        type: "paragraph",
        content: "1. Backup your current instance:",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo npm-backup`,
      },
      {
        type: "paragraph",
        content: "If you have S3 configured, the backup will be uploaded automatically. Otherwise, copy the backup file from /var/backups/ to a safe location.",
      },
      {
        type: "paragraph",
        content: "2. Launch a new instance from the newer AMI:",
      },
      {
        type: "list",
        items: [
          "In AWS Console, select the latest AMI version",
          "Use the same instance type (or upgrade if needed)",
          "Configure security groups and networking as before",
        ],
      },
      {
        type: "paragraph",
        content: "3. Test the new instance:",
      },
      {
        type: "list",
        items: [
          "Verify the new instance boots correctly",
          "Check that NPM admin UI is accessible",
          "Confirm CloudWatch logs and metrics are working",
          "Test basic functionality before migrating data",
        ],
      },
      {
        type: "paragraph",
        content: "4. Restore your data to the new instance:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Copy backup file to new instance (via S3, scp, or other method)
sudo npm-restore /path/to/npm-YYYYMMDDHHMMSS.tar.gz`,
      },
      {
        type: "paragraph",
        content: "5. Verify everything works:",
      },
      {
        type: "list",
        items: [
          "Log into NPM admin UI",
          "Check that all proxy hosts are present",
          "Verify SSL certificates are intact",
          "Test a few proxy hosts to ensure routing works",
        ],
      },
      {
        type: "paragraph",
        content: "6. Switch traffic (if applicable):",
      },
      {
        type: "list",
        items: [
          "Update DNS records to point to the new instance",
          "Update load balancer targets",
          "Monitor for any issues",
        ],
      },
      {
        type: "paragraph",
        content: "7. Keep old instance running temporarily:",
      },
      {
        type: "list",
        items: [
          "Don't terminate the old instance immediately",
          "Keep it running for a few days as a rollback option",
          "Once confident, terminate the old instance",
        ],
      },
      {
        type: "subheading",
        content: "Rollback Considerations",
      },
      {
        type: "paragraph",
        content: "If something goes wrong with the new instance:",
      },
      {
        type: "list",
        items: [
          "The old instance is still running with your original data",
          "Simply point DNS/load balancer back to the old instance",
          "Investigate issues on the new instance without pressure",
          "Fix issues and try the upgrade again when ready",
        ],
      },
      {
        type: "heading",
        content: "3. Updating NPM Docker Image (In-Place Patch)",
      },
      {
        type: "paragraph",
        content: "The AMI pins NPM to a specific, tested Docker image tag for stability. The recommended approach is to upgrade by launching a newer AMI version and restoring from backup. If you choose to update NPM in-place, you are choosing to deviate from the pinned version promise and assume the operational risk.",
      },
      {
        type: "note",
        variant: "warning",
        content: "In-place NPM image updates are optional and not automatic. Test in a non-production environment first.",
      },
      {
        type: "subheading",
        content: "When to Consider Manual Updates",
      },
      {
        type: "list",
        items: [
          "You need a feature available in a newer NPM version",
          "A security vulnerability is patched in a newer version",
          "You're comfortable troubleshooting Docker and NPM issues",
        ],
      },
      {
        type: "subheading",
        content: "Conservative In-Place Steps (Patch Updates)",
      },
      {
        type: "paragraph",
        content: "1. Backup first:",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo npm-backup`,
      },
      {
        type: "paragraph",
        content: "2. Edit the Docker Compose file to a newer patch tag:",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo nano /opt/npm/docker-compose.yml`,
      },
      {
        type: "paragraph",
        content: "Change the image tag, for example:",
      },
      {
        type: "code",
        language: "yaml",
        content: `# From:
image: "jc21/nginx-proxy-manager:2.13.5"

# To:
image: "jc21/nginx-proxy-manager:2.13.6"`,
      },
      {
        type: "paragraph",
        content: "3. Pull the new image:",
      },
      {
        type: "code",
        language: "bash",
        content: `cd /opt/npm
sudo docker compose pull`,
      },
      {
        type: "paragraph",
        content: "4. Restart the stack:",
      },
      {
        type: "code",
        language: "bash",
        content: `sudo systemctl restart npm`,
      },
      {
        type: "paragraph",
        content: "5. Verify everything works:",
      },
      {
        type: "list",
        items: [
          "Check NPM admin UI is accessible",
          "Verify all proxy hosts are still configured",
          "Test a few proxy hosts",
          "Monitor for a few hours",
        ],
      },
      {
        type: "subheading",
        content: "Rollback (Revert the Pinned Tag)",
      },
      {
        type: "paragraph",
        content: "If something breaks after an in-place update:",
      },
      {
        type: "list",
        items: [
          "Revert the image: tag in /opt/npm/docker-compose.yml back to the previously pinned value",
          "Restart the stack with: sudo systemctl restart npm",
          "If needed, restore from a known-good backup using npm-restore",
        ],
      },
      {
        type: "subheading",
        content: "Staying on the Pinned Version",
      },
      {
        type: "paragraph",
        content: "The AMI's pinned version is tested and known to work. For production stability, consider:",
      },
      {
        type: "list",
        items: [
          "Waiting for the next AMI release that includes the newer NPM version",
          "Testing newer versions in a separate test instance first",
          "Contacting support if you need a specific NPM version",
        ],
      },
      {
        type: "heading",
        content: "4. Best Practices",
      },
      {
        type: "subheading",
        content: "Always Backup Before Upgrades",
      },
      {
        type: "paragraph",
        content: "Whether upgrading the AMI or manually updating NPM:",
      },
      {
        type: "list",
        items: [
          "Create a backup using npm-backup",
          "Verify the backup file exists and is not corrupted",
          "Store backups in S3 or another safe location",
          "Keep multiple backup generations",
        ],
      },
      {
        type: "subheading",
        content: "Test in Non-Production First",
      },
      {
        type: "list",
        items: [
          "Launch a test instance from the new AMI",
          "Restore a copy of your production backup to the test instance",
          "Verify all functionality works",
          "Only upgrade production after successful testing",
        ],
      },
      {
        type: "subheading",
        content: "Monitor After Upgrades",
      },
      {
        type: "list",
        items: [
          "Check CloudWatch logs for errors",
          "Monitor CloudWatch metrics for unusual patterns",
          "Test all critical proxy hosts",
          "Verify SSL certificates are still valid",
          "Check that backups continue to work",
        ],
      },
      {
        type: "subheading",
        content: "When to Contact Support",
      },
      {
        type: "paragraph",
        content: "Contact Northstar Cloud Solutions support if:",
      },
      {
        type: "list",
        items: [
          "The upgrade process fails unexpectedly",
          "Data is lost during migration",
          "NPM becomes inaccessible after upgrade",
          "You encounter errors not covered in this documentation",
          "You need guidance on a specific upgrade scenario",
        ],
      },
      {
        type: "subheading",
        content: "Upgrade Timing",
      },
      {
        type: "list",
        items: [
          "Plan upgrades during maintenance windows",
          "Avoid upgrading during peak traffic periods",
          "Have a rollback plan ready",
          "Communicate with your team about the upgrade schedule",
        ],
      },
    ],
  },
  roadmap: {
    id: "roadmap",
    title: "Roadmap",
    description: "Planned future enhancements for the Nginx Proxy Manager – Hardened Edition.",
    content: [
      {
        type: "note",
        variant: "info",
        content: "These features are not required for day-one production use but are intended to make the product even more powerful over time.",
      },
      {
        type: "heading",
        content: "Planned: NPM Update Tooling",
      },
      {
        type: "paragraph",
        content: "Currently, NPM is pinned to a specific Docker image version for stability. Planned enhancements include a dedicated npm-update CLI tool that will:",
      },
      {
        type: "list",
        items: [
          "Create a backup of NPM data before updating",
          "Pull a new NPM image version (configurable tag)",
          "Restart the stack and perform a health check",
          "Allow easy rollback if the new version misbehaves",
        ],
      },
      {
        type: "paragraph",
        content: "Goal: provide a safe, repeatable upgrade path without requiring manual Docker commands.",
      },
      {
        type: "heading",
        content: "Planned: Optional Customization via Config",
      },
      {
        type: "paragraph",
        content: "Introduce a configuration file (/etc/npm-ami.conf) that lets advanced users customize defaults without editing code:",
      },
      {
        type: "list",
        items: [
          "Default admin email (instead of the built-in admin@example.com)",
          "Branding information for MOTD banner and SSH banner",
          "Optional tuning of backup behavior beyond /etc/npm-backup.conf",
        ],
      },
      {
        type: "paragraph",
        content: "Goal: make the AMI more flexible for MSPs and teams with specific policies, while keeping the default experience simple.",
      },
      {
        type: "heading",
        content: "Planned: Additional Logging Options",
      },
      {
        type: "list",
        items: [
          "Optional collection of NPM application logs into CloudWatch Logs",
          "Example dashboards/queries to monitor NPM activity",
        ],
      },
      {
        type: "paragraph",
        content: "These will be designed to avoid adding overhead for users who don't need them.",
      },
      {
        type: "heading",
        content: "Planned: Deployment Patterns & HA Guides",
      },
      {
        type: "paragraph",
        content: "Non-code roadmap items including documentation for:",
      },
      {
        type: "list",
        items: [
          "Running NPM behind an AWS Application Load Balancer",
          "Using Route 53 health checks and multiple NPM instances for higher availability",
          "Example CloudFormation / Terraform snippets to deploy the AMI in a standardized way",
        ],
      },
      {
        type: "paragraph",
        content: "Goal: give teams clearer guidance on how to scale from a single NPM instance to more resilient setups.",
      },
    ],
  },
};

export const getDocContent = (id: string): DocContent | undefined => {
  return docContents[id];
};
