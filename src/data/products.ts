export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  icon: string;
  capabilities: string[];
  comingSoon?: boolean;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  security: {
    title: string;
    description: string;
  }[];
  observability: {
    title: string;
    description: string;
  }[];
  cliCommands: {
    command: string;
    description: string;
  }[];
  terraform: string;
  cloudformation: string;
  motd: string[];
}

export const products: Product[] = [
  {
    id: "nginx-proxy-manager",
    name: "Nginx Proxy Manager (NPM) for AWS",
    tagline: "Production-Ready Reverse Proxy for AWS",
    description: "Ubuntu 22.04 AMI with Docker Compose, a secure-by-default admin plane, root-only credentials, and optional CloudWatch + S3 integrations when configured. Day 0 flow is SSH-only (no GUI installer).",
    category: "Networking",
    icon: "Shield",
    capabilities: ["Ubuntu 22.04", "Docker Compose", "Secure Admin Plane", "Backups", "CloudWatch Optional"],
    features: [
      {
        title: "Secure First-Boot Initialization",
        description: "Generates a strong admin password on first boot, stores it in a root-only file, and never prints secrets in the login banner.",
        icon: "Zap"
      },
      {
        title: "Backup & Restore Tooling",
        description: "Local backups with retention, plus optional S3 uploads when IAM is configured. Restore validation is built in.",
        icon: "Database"
      },
      {
        title: "Operational Helper Toolkit",
        description: "npm-helper provides status checks, credential retrieval, admin access controls, cert checks, backups, restores, and upgrades.",
        icon: "RefreshCw"
      }
    ],
    security: [
      {
        title: "UFW Defaults: 22/80/443",
        description: "UFW allows SSH, HTTP, and HTTPS by default. Port 81 is restricted and must be allowlisted or tunneled for admin access."
      },
      {
        title: "SSH Hardening + Fail2ban",
        description: "Key-based SSH only, root login disabled, and fail2ban configured for SSH protection."
      },
      {
        title: "Secure Admin Plane",
        description: "Admin UI access uses allowlists (AdminCidr/admin_cidrs) or an SSH tunnel. Do not expose port 81 publicly."
      }
    ],
    observability: [
      {
        title: "CloudWatch Agent (Optional)",
        description: "Preconfigured to ship logs and basic system metrics when IAM permissions are provided."
      },
      {
        title: "Local-First Operation",
        description: "The AMI functions normally without IAM permissions; CloudWatch and S3 features are opt-in only."
      }
    ],
    cliCommands: [
      {
        command: "npm-helper status",
        description: "View service health, initialization status, and backup summaries"
      },
      {
        command: "npm-helper show-creds --yes",
        description: "Reveal admin credentials from the root-only credentials file"
      },
      {
        command: "npm-helper admin-access enable --cidr <your-ip>/32",
        description: "Temporarily allowlist port 81 for a trusted admin IP"
      },
      {
        command: "npm-helper backup verify",
        description: "Verify the latest backup archive integrity"
      },
      {
        command: "npm-helper restore --dry-run /var/backups/npm-YYYYMMDDHHMMSS.tar.gz",
        description: "Validate a backup archive before restoring"
      },
      {
        command: "npm-helper upgrade --dry-run",
        description: "Preview backup-first upgrade steps without changes"
      },
      {
        command: "npm-helper cert-check",
        description: "Run the certificate expiry check immediately"
      }
    ],
    terraform: `data "aws_ami" "npm" {
  most_recent = true
  owners      = ["aws-marketplace"]

  filter {
    name   = "name"
    values = ["Nginx Proxy Manager (NPM) for AWS*"]
  }
}

resource "aws_security_group" "npm" {
  name   = "npm-admin"
  vpc_id = var.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.admin_cidrs
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 81
    to_port     = 81
    protocol    = "tcp"
    cidr_blocks = var.admin_cidrs
  }
}

resource "aws_instance" "npm" {
  ami                    = data.aws_ami.npm.id
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  vpc_security_group_ids = [aws_security_group.npm.id]
}`,
    cloudformation: `AWSTemplateFormatVersion: '2010-09-09'
Description: Nginx Proxy Manager (NPM) for AWS

Parameters:
  AdminCidr:
    Type: String
    Default: 203.0.113.10/32
  AmiId:
    Type: AWS::EC2::Image::Id
    Description: Nginx Proxy Manager (NPM) for AWS AMI ID
  InstanceType:
    Type: String
    Default: t3.small

Resources:
  NPMSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Allow SSH and admin UI from trusted CIDRs
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: !Ref AdminCidr
        - IpProtocol: tcp
          FromPort: 81
          ToPort: 81
          CidrIp: !Ref AdminCidr
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0

  NPMInstance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !Ref AmiId
      InstanceType: !Ref InstanceType
      SecurityGroupIds:
        - !Ref NPMSecurityGroup
`,
    motd: [
      "╔══════════════════════════════════════════════════════════════╗",
      "║   NORTHSTAR CLOUD SOLUTIONS - NPM FOR AWS                   ║",
      "╠══════════════════════════════════════════════════════════════╣",
      "║  Instance ID: i-0a1b2c3d4e5f67890                            ║",
      "║  Version: ubuntu22.04                                       ║",
      "║  Status: INITIALIZED ✓                                       ║",
      "╠══════════════════════════════════════════════════════════════╣",
      "║  ONBOARDING CHECKLIST                                        ║",
      "║  ────────────────────────────────────────────────────────────║",
      "║  [1] Retrieve admin credentials (root-only):                 ║",
      "║      sudo npm-helper show-creds --yes                        ║",
      "║  [2] Admin UI access (allowlist or SSH tunnel)               ║",
      "║      sudo npm-helper admin-access enable --cidr <ip>/32      ║",
      "║  [3] Verify health: sudo npm-helper status                   ║",
      "╚══════════════════════════════════════════════════════════════╝"
    ]
  },
  {
    id: "secure-vpn-gateway",
    name: "Secure VPN / Zero-Trust Access Gateway AMI",
    tagline: "Coming Soon",
    description: "Hardened WireGuard/OpenVPN gateway for controlled, auditable remote access without exposing internal services.",
    category: "Security",
    icon: "Server",
    capabilities: ["Coming Soon"],
    comingSoon: true,
    features: [],
    security: [],
    observability: [],
    cliCommands: [],
    terraform: "",
    cloudformation: "",
    motd: []
  },
  {
    id: "observability-monitoring",
    name: "Hardened Observability/Monitoring AMI",
    tagline: "Coming Soon",
    description: "Single-node Prometheus + Grafana + Loki stack with secure defaults and simplified operational guardrails.",
    category: "Observability",
    icon: "Server",
    capabilities: ["Coming Soon"],
    comingSoon: true,
    features: [],
    security: [],
    observability: [],
    cliCommands: [],
    terraform: "",
    cloudformation: "",
    motd: []
  },
  {
    id: "object-storage-gateway",
    name: "Hardened Object Storage Gateway / Backup Appliance AMI",
    tagline: "Coming Soon",
    description: "MinIO-based gateway with lifecycle controls and optional S3 sync for resilient backup workflows.",
    category: "Storage",
    icon: "Server",
    capabilities: ["Coming Soon"],
    comingSoon: true,
    features: [],
    security: [],
    observability: [],
    cliCommands: [],
    terraform: "",
    cloudformation: "",
    motd: []
  },
  {
    id: "app-security-edge",
    name: "App Security Edge AMI",
    tagline: "Coming Soon",
    description: "WAF + rate limiting + TLS termination appliance using Nginx with ModSecurity or similar controls.",
    category: "Security",
    icon: "Server",
    capabilities: ["Coming Soon"],
    comingSoon: true,
    features: [],
    security: [],
    observability: [],
    cliCommands: [],
    terraform: "",
    cloudformation: "",
    motd: []
  },
  {
    id: "identity-provider",
    name: "Identity Provider / SSO Gateway AMI",
    tagline: "Coming Soon",
    description: "Hardened single-node Keycloak deployment focused on secure identity workflows and access control.",
    category: "Security",
    icon: "Server",
    capabilities: ["Coming Soon"],
    comingSoon: true,
    features: [],
    security: [],
    observability: [],
    cliCommands: [],
    terraform: "",
    cloudformation: "",
    motd: []
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};
