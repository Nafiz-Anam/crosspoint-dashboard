const fs = require('fs')
const path = require('path')

console.log('🚀 Preparing app for cPanel hosting...')

// Restore API routes after build
const apiDir = path.join(__dirname, '../src/app/api')
const tempApiDir = path.join(__dirname, '../temp-api-routes')

if (fs.existsSync(tempApiDir)) {
  console.log('🔄 Restoring API routes...')

  // Create API directory
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true })
  }

  // Copy API routes back
  const copyRecursive = (src, dest) => {
    const files = fs.readdirSync(src)
    files.forEach(file => {
      const srcPath = path.join(src, file)
      const destPath = path.join(dest, file)

      if (fs.statSync(srcPath).isDirectory()) {
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true })
        }
        copyRecursive(srcPath, destPath)
      } else {
        fs.copyFileSync(srcPath, destPath)
      }
    })
  }

  copyRecursive(tempApiDir, apiDir)

  // Remove temp directory
  fs.rmSync(tempApiDir, { recursive: true, force: true })
  console.log('✅ API routes restored')
}

// Create .htaccess file for proper routing
const htaccessContent = `# Enable rewrite engine
RewriteEngine On

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Compress files
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Prevent access to sensitive files
<Files ".env*">
    Order allow,deny
    Deny from all
</Files>

<Files "package*.json">
    Order allow,deny
    Deny from all
</Files>

<Files "*.log">
    Order allow,deny
    Deny from all
</Files>
`

// Write .htaccess file
fs.writeFileSync(path.join(__dirname, '../dist/.htaccess'), htaccessContent)
console.log('✅ Created .htaccess file')

// Create robots.txt
const robotsContent = `User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
`

fs.writeFileSync(path.join(__dirname, '../dist/robots.txt'), robotsContent)
console.log('✅ Created robots.txt file')

// Create sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://yourdomain.com/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://yourdomain.com/en/dashboards/analytics</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://yourdomain.com/it/dashboards/analytics</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
</urlset>`

fs.writeFileSync(path.join(__dirname, '../dist/sitemap.xml'), sitemapContent)
console.log('✅ Created sitemap.xml file')

// Create deployment instructions
const deploymentInstructions = `# cPanel Deployment Instructions

## 1. Build the Application
Run the following command in the frontend directory:
\`\`\`bash
npm run build:cpanel
\`\`\`

## 2. Upload Files
1. Upload all contents of the 'dist' folder to your cPanel public_html directory
2. Make sure to maintain the folder structure

## 3. Environment Variables
Create a .env.local file in your cPanel public_html directory with the following variables:
\`\`\`
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secret-key
\`\`\`

## 4. Database Configuration
- Set up your database in cPanel
- Update the database connection string in your backend
- Run database migrations

## 5. Backend API
- Deploy your backend API to a subdomain or subdirectory
- Update the NEXT_PUBLIC_API_URL in your frontend environment variables

## 6. SSL Certificate
- Enable SSL certificate in cPanel
- Update all URLs to use HTTPS

## 7. File Permissions
Set the following permissions:
- Folders: 755
- Files: 644
- .htaccess: 644

## 8. Testing
- Test all routes and functionality
- Verify that client-side routing works correctly
- Check that all API calls are working

## Notes
- The app is configured for static export
- Client-side routing is handled by .htaccess
- All images are unoptimized for static hosting
- Make sure your hosting supports the required Node.js version
`

fs.writeFileSync(path.join(__dirname, '../DEPLOYMENT.md'), deploymentInstructions)
console.log('✅ Created deployment instructions')

console.log('🎉 cPanel deployment preparation complete!')
console.log('📁 Build output is in the "dist" folder')
console.log('📖 See DEPLOYMENT.md for detailed instructions')
