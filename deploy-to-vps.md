# VPS Deployment Instructions for 4eb1 E-Learning Platform

## Prerequisites on VPS
- Node.js 18+ and npm
- PM2 (for process management)
- Nginx (for reverse proxy)

## Step 1: Setup VPS
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx
sudo apt-get update
sudo apt-get install nginx
```

## Step 2: Deploy Application
```bash
# Clone your repository
git clone https://github.com/earthhousefarms-dot/4eb1public.git
cd 4eb1public

# Install dependencies
npm install

# Build the application
npm run build

# Start with PM2
pm2 start npm --name "4eb1-app" -- start
pm2 save
pm2 startup
```

## Step 3: Configure Nginx
Create file `/etc/nginx/sites-available/4eb1`:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/4eb1 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Step 4: Setup SSL (Optional but Recommended)
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Step 5: Update Application
To update your application after making changes:
```bash
cd 4eb1public
git pull
npm install
npm run build
pm2 restart 4eb1-app
```

## Quick Deploy Script
Save this as `deploy.sh` on your VPS:
```bash
#!/bin/bash
cd ~/4eb1public
git pull
npm install
npm run build
pm2 restart 4eb1-app
echo "Deployment completed!"
```

Make it executable: `chmod +x deploy.sh`
Run with: `./deploy.sh`

## Environment Variables
Create a `.env.local` file in your project root if needed:
```
NODE_ENV=production
```

## Monitor Application
```bash
# View logs
pm2 logs 4eb1-app

# Check status
pm2 status

# Monitor resources
pm2 monit
```

Your application will be accessible at http://your-domain.com (or https:// if SSL configured)