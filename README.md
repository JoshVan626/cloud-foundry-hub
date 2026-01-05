# Cloud Solutions Foundry

Production-ready infrastructure appliances for AWS. Northstar Cloud Solutions delivers hardened, automated infrastructure components that bridge the gap between open-source and enterprise-ready solutions.

## Overview

The Cloud Solutions Foundry is a showcase of production-ready AWS appliances that include:

- **Automated Operations**: First-boot initialization, automated backups, and Day-2 operations
- **Security Hardening**: Defense-in-depth security with pre-configured firewalls, fail2ban, and kernel hardening
- **AWS-Native Integration**: CloudWatch logging, S3 backup sync, and full observability
- **Infrastructure as Code**: Terraform and CloudFormation modules for easy deployment

## Technologies

This project is built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **React Router** - Client-side routing
- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** - Data fetching and caching

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd cloud-foundry-hub

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Building Documentation

The documentation is generated from markdown files in the `docs/` directory:

```sh
# Generate documentation data
npm run build:docs

# Build for production (automatically runs build:docs)
npm run build
```

## Project Structure

```
cloud-foundry-hub/
├── docs/              # Markdown documentation files
├── public/            # Static assets
├── scripts/           # Build scripts
├── src/
│   ├── components/   # React components
│   ├── data/         # Data files and generated documentation
│   ├── pages/        # Page components
│   └── lib/          # Utility functions
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes docs generation)
- `npm run build:docs` - Generate documentation from markdown files
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Deployment

Build the project for production:

```sh
npm run build
```

The `dist/` directory will contain the production-ready files that can be deployed to any static hosting service (Vercel, Netlify, AWS S3, etc.).

## License

© 2026 Northstar Cloud Solutions LLC. All rights reserved.
