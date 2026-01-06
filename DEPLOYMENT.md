# Deployment Guide for northstarcloud.io

This guide will help you deploy your Cloud Solutions Foundry website to your domain and set up analytics.

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel:**
- Free tier with excellent performance
- Automatic HTTPS/SSL
- Easy GitHub integration
- Built-in analytics (optional upgrade)
- Automatic deployments on git push
- Perfect for React/Vite apps

**Steps:**

1. **Sign up for Vercel:**
   - Go to https://vercel.com
   - Sign up with your GitHub account
   - Authorize Vercel to access your repositories

2. **Import your project:**
   - Click "Add New Project"
   - Select your `cloud-foundry-hub` repository
   - Vercel will auto-detect Vite settings
   - Framework Preset: **Vite**
   - Root Directory: `.` (root)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)
   - You'll get a URL like `cloud-foundry-hub.vercel.app`

4. **Connect your domain:**
   - In Vercel dashboard, go to your project → Settings → Domains
   - Click "Add Domain"
   - Enter `northstarcloud.io` and `www.northstarcloud.io`
   - Vercel will show you DNS records to add

5. **Update Namecheap DNS:**
   - Log into Namecheap
   - Go to Domain List → Manage → Advanced DNS
   - Add these records (Vercel will show exact values):
     - Type: `A Record`
       - Host: `@`
       - Value: `76.76.21.21` (Vercel's IP - check Vercel dashboard for current)
     - Type: `CNAME Record`
       - Host: `www`
       - Value: `cname.vercel-dns.com`
   - Save changes
   - Wait 5-30 minutes for DNS propagation

6. **SSL Certificate:**
   - Vercel automatically provisions SSL certificates
   - Wait 5-10 minutes after DNS propagates
   - Your site will be live at https://northstarcloud.io

---

### Option 2: Netlify (Alternative)

**Why Netlify:**
- Free tier available
- Similar to Vercel
- Good GitHub integration
- Built-in form handling (if needed later)

**Steps:**

1. Sign up at https://netlify.com with GitHub
2. Click "Add new site" → "Import an existing project"
3. Select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"
6. Add custom domain: Site settings → Domain management → Add custom domain
7. Update Namecheap DNS with Netlify's provided records

---

### Option 3: AWS S3 + CloudFront (Advanced)

**Why AWS:**
- You're already using AWS for products
- Full control
- Can integrate with other AWS services

**Steps:**

1. **Create S3 Bucket:**
   ```bash
   aws s3 mb s3://northstarcloud.io
   aws s3 website s3://northstarcloud.io --index-document index.html
   ```

2. **Upload build files:**
   ```bash
   npm run build
   aws s3 sync dist/ s3://northstarcloud.io --delete
   ```

3. **Set up CloudFront distribution:**
   - Create distribution pointing to S3 bucket
   - Add alternate domain names: `northstarcloud.io`, `www.northstarcloud.io`
   - Request SSL certificate in AWS Certificate Manager (us-east-1 region)

4. **Update DNS:**
   - Add CNAME records in Namecheap pointing to CloudFront distribution URL

---

## Setting Up Analytics

### Google Analytics 4 (Free, Recommended)

1. **Create GA4 Property:**
   - Go to https://analytics.google.com
   - Create account → Create property
   - Property name: "Northstar Cloud Solutions"
   - Website URL: `https://northstarcloud.io`
   - Get your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Add to your site:**
   - Create `.env` file in project root:
     ```
     VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
     ```
   - Add to `.gitignore`: `.env`
   - Install Google Analytics:
     ```bash
     npm install react-ga4
     ```
   - Add tracking code (I can help implement this)

### Plausible Analytics (Privacy-Focused, Paid)

- Go to https://plausible.io
- Sign up ($9/month for 10k pageviews)
- Add script tag to `index.html`
- No cookies, GDPR compliant

### Vercel Analytics (If using Vercel)

- Built into Vercel Pro plan
- Or use Vercel Analytics package (free tier available)
- Simple integration

---

## Recommended Setup

**For fastest deployment:**
1. Use **Vercel** (easiest, free, automatic SSL)
2. Add **Google Analytics 4** (free, comprehensive)
3. Set up **Vercel Analytics** (optional, if on Vercel)

**DNS Records Summary (for Vercel):**
```
Type    Host    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

---

## Post-Deployment Checklist

- [ ] Verify site loads at https://northstarcloud.io
- [ ] Verify www.northstarcloud.io redirects (Vercel handles this)
- [ ] Check SSL certificate is active (green padlock)
- [ ] Test all pages load correctly
- [ ] Verify mobile responsiveness
- [ ] Set up analytics tracking
- [ ] Submit sitemap to Google Search Console
- [ ] Test 404 page works
- [ ] Verify all links work

---

## Need Help?

If you want me to:
- Set up Google Analytics code in your project
- Create deployment configuration files
- Help with DNS setup
- Set up automated deployments

Just let me know which option you prefer and I can help implement it!

