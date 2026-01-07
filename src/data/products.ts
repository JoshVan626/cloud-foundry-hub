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
    name: "Nginx Proxy Manager (Hardened Edition)",
    tagline: "Enterprise-Ready Reverse Proxy",
    description: "Production-hardened Nginx Proxy Manager (Hardened Edition) with automated Day-2 operations, security hardening, and full observability. Deploy in minutes, operate with confidence.",
    category: "Networking",
    icon: "Shield",
    capabilities: ["Automated Ops", "Hardened", "AWS Native", "Observable"],
    features: [
      {
        title: "Automated First-Boot Initialization",
        description: "npm-init.py handles complete setup including SSL configuration, database initialization, and admin credential generation stored securely at /root/npm-admin-credentials.txt.",
        icon: "Zap"
      },
      {
        title: "Atomic Backups",
        description: "npm-backup and npm-restore tools leverage SQLite hot-backup technology for zero-downtime protection with automatic rotation and S3 sync capabilities.",
        icon: "Database"
      },
      {
        title: "Rollback-Safe Updates",
        description: "Proprietary update mechanism with automatic state preservation and one-command rollback.",
        icon: "RefreshCw"
      }
    ],
    security: [
      {
        title: "Pre-configured UFW Firewall",
        description: "Strict ingress rules allowing only necessary ports (80, 443, 81) with rate limiting."
      },
      {
        title: "Fail2Ban Integration",
        description: "Automatic IP banning after failed authentication attempts with CloudWatch alerting."
      },
      {
        title: "Kernel-Level Hardening",
        description: "Optimized sysctl parameters for network security and DDoS mitigation."
      }
    ],
    observability: [
      {
        title: "CloudWatch Agent",
        description: "Pre-configured agent shipping system metrics, application logs, and security events."
      },
      {
        title: "Health Dashboard",
        description: "Real-time visibility into proxy performance, SSL status, and upstream health."
      }
    ],
    cliCommands: [
      {
        command: "npm-helper status",
        description: "View service health and container status"
      },
      {
        command: "npm-helper show-admin",
        description: "Retrieve the current admin username"
      },
      {
        command: "npm-helper rotate-admin",
        description: "Securely generate and reset the admin password"
      },
      {
        command: "npm-helper diagnostics",
        description: "Generate a technical health report for support"
      },
      {
        command: "npm-helper update-os",
        description: "One-click Ubuntu security patching"
      }
    ],
    terraform: `module "nginx_proxy_manager" {
  source  = "northstar-cloud/npm-hardened/aws"
  version = "2.1.0"

  instance_type    = "t3.small"
  vpc_id           = var.vpc_id
  subnet_id        = var.subnet_id
  
  # AMI Filter
  ami_filter       = "npm-hardened-edition-ubuntu22-*"
  
  # Security Configuration
  allowed_cidrs    = ["10.0.0.0/8"]
  enable_fail2ban  = true
  
  # Backup Configuration  
  backup_retention = 7
  s3_backup_bucket = var.backup_bucket
  
  # Observability
  cloudwatch_logs  = true
  alarm_sns_topic  = var.alerts_topic
}`,
    cloudformation: `AWSTemplateFormatVersion: '2010-09-09'
Description: Northstar NPM Hardened Edition

Parameters:
  VpcId:
    Type: AWS::EC2::VPC::Id
  SubnetId:
    Type: AWS::EC2::Subnet::Id
  InstanceType:
    Type: String
    Default: t3.small

Resources:
  NPMInstance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !FindInMap [RegionMap, !Ref 'AWS::Region', AMI]
      InstanceType: !Ref InstanceType
      SubnetId: !Ref SubnetId
      SecurityGroupIds:
        - !Ref NPMSecurityGroup
      UserData:
        Fn::Base64: !Sub |
          #!/bin/bash
          /opt/northstar/npm-init.py --auto`,
    motd: [
      "╔══════════════════════════════════════════════════════════════╗",
      "║     NORTHSTAR CLOUD SOLUTIONS - NPM Hardened Edition        ║",
      "╠══════════════════════════════════════════════════════════════╣",
      "║  Instance ID: i-0a1b2c3d4e5f67890                            ║",
      "║  Version: 2.13.5-hardened                                    ║",
      "║  Status: INITIALIZED ✓                                       ║",
      "╠══════════════════════════════════════════════════════════════╣",
      "║  ONBOARDING CHECKLIST                                        ║",
      "║  ────────────────────────────────────────────────────────────║",
      "║  [1] Retrieve admin credentials:                             ║",
      "║      sudo cat /root/npm-admin-credentials.txt                ║",
      "║  [2] Access the Admin Panel:                                 ║",
      "║      https://<your-ip>:81                                    ║",
      "║  [3] Configure your first proxy host                         ║",
      "║  [4] Run 'npm-helper status' to verify health                ║",
      "╚══════════════════════════════════════════════════════════════╝"
    ]
  },
  {
    id: "wordpress-hardened",
    name: "WordPress (Hardened Edition)",
    tagline: "Enterprise WordPress Appliance",
    description: "Production-hardened WordPress built for IT-managed sites. Includes automated backups, safe upgrades with rollback, and CloudWatch observability.",
    category: "Web Apps",
    icon: "Server",
    capabilities: ["Coming Soon", "Automated Ops", "Hardened", "AWS Native", "Observable", "S3 Media Ready"],
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
    id: "wikijs-hardened",
    name: "Wiki.js (Hardened Edition)",
    tagline: "Internal Documentation Hub",
    description: "A production-ready internal wiki with hardened defaults, verified backups, SSO-ready patterns, and CloudWatch logs/metrics for day-2 operations.",
    category: "Security",
    icon: "Server",
    capabilities: ["Coming Soon", "Automated Ops", "Hardened", "AWS Native", "Observable", "SSO Ready"],
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
