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
  type: "paragraph" | "heading" | "code" | "list" | "note" | "prereq";
  content?: string;
  items?: string[];
  language?: string;
  variant?: "info" | "warning" | "success";
}

export const docSections: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "Rocket",
    items: [
      { id: "quickstart", label: "Quickstart" },
    ],
  },
  {
    id: "security",
    title: "Security & Hardening",
    icon: "Shield",
    items: [
      { id: "security-hardening", label: "Security Hardening" },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    icon: "Terminal",
    items: [
      { id: "operations", label: "Lifecycle & CLI" },
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
    ],
  },
];

export const docContents: Record<string, DocContent> = {
  quickstart: {
    id: "quickstart",
    title: "Quickstart",
    description: "Get your Northstar appliance up and running in under 5 minutes.",
    content: [
      {
        type: "prereq",
        items: [
          "AWS Account with EC2 launch permissions",
          "VPC with public subnet (for proxy use cases)",
          "Terraform 1.0+ or AWS CLI configured",
          "SSH key pair configured in your target region",
        ],
      },
      {
        type: "heading",
        content: "Step 1: Launch the EC2 Instance",
      },
      {
        type: "paragraph",
        content: "Deploy the NPM Hardened Edition AMI using our Terraform module for the fastest deployment path:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Clone the deployment repository
git clone https://github.com/northstar-cloud/npm-hardened-deploy.git
cd npm-hardened-deploy

# Initialize and apply
terraform init
terraform apply`,
      },
      {
        type: "heading",
        content: "Step 2: SSH and Retrieve Credentials",
      },
      {
        type: "paragraph",
        content: "Once the instance is running, SSH in to retrieve your automatically generated admin credentials:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Connect to your instance
ssh -i your-key.pem admin@<instance-public-ip>

# Retrieve admin credentials (root access required)
sudo cat /root/npm-admin-credentials.txt`,
      },
      {
        type: "note",
        variant: "info",
        content: "Credentials are automatically generated on first boot and stored in a root-only file at /root/npm-admin-credentials.txt. They are never transmitted externally.",
      },
      {
        type: "heading",
        content: "Step 3: Configure Your First Proxy Host",
      },
      {
        type: "paragraph",
        content: "Access the admin panel at https://<your-instance-ip>:81 using the credentials from the previous step. From there you can:",
      },
      {
        type: "list",
        items: [
          "Add your first proxy host pointing to your backend service",
          "Configure SSL certificates via Let's Encrypt",
          "Set up access lists for restricted endpoints",
          "Configure custom locations and advanced settings",
        ],
      },
    ],
  },
  "security-hardening": {
    id: "security-hardening",
    title: "Security & Hardening",
    description: "Comprehensive security controls pre-configured in every Hardened Edition appliance.",
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
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2`,
      },
      {
        type: "note",
        variant: "warning",
        content: "Root login is disabled. Use the 'admin' user with sudo privileges for all administrative tasks.",
      },
      {
        type: "heading",
        content: "UFW Firewall Rules",
      },
      {
        type: "paragraph",
        content: "The Uncomplicated Firewall (UFW) is pre-configured with strict ingress rules:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Default UFW configuration
sudo ufw status verbose

# Allowed ports:
# 22/tcp  - SSH access
# 80/tcp  - HTTP (redirects to HTTPS)
# 81/tcp  - NPM Admin Panel
# 443/tcp - HTTPS proxy traffic`,
      },
      {
        type: "heading",
        content: "Fail2Ban Integration",
      },
      {
        type: "paragraph",
        content: "Fail2Ban automatically bans IPs after repeated failed authentication attempts:",
      },
      {
        type: "list",
        items: [
          "SSH jail: 5 failed attempts triggers 10-minute ban",
          "NPM admin panel: 3 failed attempts triggers 30-minute ban",
          "Ban events are logged to CloudWatch for alerting",
        ],
      },
      {
        type: "heading",
        content: "SSH Host Key Regeneration",
      },
      {
        type: "paragraph",
        content: "For security, SSH host keys are automatically regenerated on first boot via cloud-init. This ensures each instance has unique cryptographic identity:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Performed automatically on first boot
rm -f /etc/ssh/ssh_host_*
ssh-keygen -A
systemctl restart sshd`,
      },
    ],
  },
  operations: {
    id: "operations",
    title: "Operations",
    description: "Understanding the first-boot lifecycle and day-to-day operations.",
    content: [
      {
        type: "heading",
        content: "First-Boot Lifecycle",
      },
      {
        type: "paragraph",
        content: "The Hardened Edition follows a structured initialization sequence:",
      },
      {
        type: "list",
        items: [
          "npm-preflight: Validates system requirements and network connectivity",
          "npm-init: Initializes the application, generates credentials, starts services",
          "npm-postinit: Configures monitoring agents, enables backup schedules",
        ],
      },
      {
        type: "code",
        language: "bash",
        content: `# View initialization logs
sudo journalctl -u npm-init.service

# Check current service status
npm-helper status`,
      },
      {
        type: "heading",
        content: "npm-helper CLI Toolkit",
      },
      {
        type: "paragraph",
        content: "The npm-helper CLI provides essential management commands:",
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
        type: "heading",
        content: "Data Locations",
      },
      {
        type: "paragraph",
        content: "NPM stores its data in the following locations:",
      },
      {
        type: "list",
        items: [
          "/opt/npm/data - Application database and configuration",
          "/opt/npm/letsencrypt - SSL certificates managed by Let's Encrypt",
        ],
      },
      {
        type: "note",
        variant: "info",
        content: "Both directories are included in automated backups when using the npm-backup tool.",
      },
    ],
  },
  "backup-restore": {
    id: "backup-restore",
    title: "Backup & Restore",
    description: "Zero-downtime backup and restore operations using SQLite hot-backup technology.",
    content: [
      {
        type: "heading",
        content: "npm-backup Tool",
      },
      {
        type: "paragraph",
        content: "Create atomic backups without stopping the application:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Create a backup
sudo npm-backup

# Backup with custom filename
sudo npm-backup --output /tmp/npm-backup-$(date +%Y%m%d).tar.gz

# View backup history
sudo npm-backup --list`,
      },
      {
        type: "note",
        variant: "success",
        content: "Backups use SQLite hot-backup technology for zero-downtime protection. The database remains fully operational during backup.",
      },
      {
        type: "heading",
        content: "npm-restore Tool",
      },
      {
        type: "paragraph",
        content: "Restore from any backup archive:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Restore from latest backup
sudo npm-restore

# Restore from specific backup file
sudo npm-restore --input /path/to/backup.tar.gz

# Dry-run to validate backup integrity
sudo npm-restore --dry-run --input /path/to/backup.tar.gz`,
      },
      {
        type: "heading",
        content: "Configuration",
      },
      {
        type: "paragraph",
        content: "Backup behavior is configured in /etc/npm-backup.conf:",
      },
      {
        type: "code",
        language: "bash",
        content: `# /etc/npm-backup.conf
BACKUP_DIR=/var/backups/npm
RETENTION_DAYS=7
COMPRESSION=gzip

# Optional S3 sync
S3_BUCKET=my-backup-bucket
S3_PREFIX=npm-backups/
AWS_REGION=us-east-1`,
      },
      {
        type: "heading",
        content: "S3 Synchronization",
      },
      {
        type: "paragraph",
        content: "Enable automatic S3 sync for off-site backup storage:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Configure IAM role or credentials
aws configure

# Enable S3 sync in config
echo "S3_ENABLED=true" | sudo tee -a /etc/npm-backup.conf

# Manual sync to S3
sudo npm-backup --sync-s3`,
      },
    ],
  },
  monitoring: {
    id: "monitoring",
    title: "Monitoring",
    description: "CloudWatch integration for comprehensive observability.",
    content: [
      {
        type: "heading",
        content: "CloudWatch Agent",
      },
      {
        type: "paragraph",
        content: "The CloudWatch Agent is pre-installed and configured to ship logs and metrics to AWS CloudWatch.",
      },
      {
        type: "heading",
        content: "Log Groups",
      },
      {
        type: "paragraph",
        content: "Application and system logs are sent to the following CloudWatch Log Group:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Default log group
/northstar-cloud-solutions/npm

# Log streams include:
# - npm/access.log     - Proxy access logs
# - npm/error.log      - Application errors
# - auth/fail2ban.log  - Security events
# - system/syslog      - System messages`,
      },
      {
        type: "heading",
        content: "Metrics Namespace",
      },
      {
        type: "paragraph",
        content: "System metrics are published to CloudWatch under:",
      },
      {
        type: "code",
        language: "bash",
        content: `# Metrics namespace
NorthstarCloudSolutions/System

# Available metrics:
# - CPUUtilization
# - MemoryUtilization
# - DiskUsedPercent
# - NetworkIn/NetworkOut
# - ContainerHealth`,
      },
      {
        type: "note",
        variant: "info",
        content: "Create CloudWatch Alarms on these metrics to receive notifications for resource thresholds or anomalies.",
      },
    ],
  },
  upgrades: {
    id: "upgrades",
    title: "Upgrades",
    description: "Safely upgrade to new AMI versions while preserving your configuration.",
    content: [
      {
        type: "heading",
        content: "Upgrade Workflow",
      },
      {
        type: "paragraph",
        content: "The recommended upgrade path involves launching a new instance with the latest AMI and migrating data:",
      },
      {
        type: "list",
        items: [
          "Create a backup of your current instance using npm-backup",
          "Launch a new EC2 instance with the latest Hardened Edition AMI",
          "Transfer the backup file to the new instance",
          "Restore using npm-restore",
          "Verify functionality and update DNS/load balancer",
          "Terminate the old instance",
        ],
      },
      {
        type: "heading",
        content: "Step-by-Step",
      },
      {
        type: "code",
        language: "bash",
        content: `# On the OLD instance: Create backup
sudo npm-backup --output /tmp/npm-migration.tar.gz

# Transfer to new instance
scp -i key.pem /tmp/npm-migration.tar.gz admin@new-instance:/tmp/

# On the NEW instance: Restore
sudo npm-restore --input /tmp/npm-migration.tar.gz

# Verify services
npm-helper status`,
      },
      {
        type: "note",
        variant: "warning",
        content: "Always test the new instance thoroughly before switching production traffic. Keep the old instance running until you've verified the migration was successful.",
      },
    ],
  },
};

export const getDocContent = (id: string): DocContent | undefined => {
  return docContents[id];
};
