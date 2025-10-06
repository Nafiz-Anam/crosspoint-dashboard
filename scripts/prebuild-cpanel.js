const fs = require('fs')
const path = require('path')

console.log('🔧 Preparing for cPanel static build...')

// Move API routes out of the way for static export
const apiDir = path.join(__dirname, '../src/app/api')
const tempApiDir = path.join(__dirname, '../temp-api-routes')

if (fs.existsSync(apiDir)) {
  console.log('📁 Moving API routes to temporary directory...')

  // Create temp directory
  if (!fs.existsSync(tempApiDir)) {
    fs.mkdirSync(tempApiDir, { recursive: true })
  }

  // Copy API routes to temp directory
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

  copyRecursive(apiDir, tempApiDir)

  // Remove API directory
  fs.rmSync(apiDir, { recursive: true, force: true })
  console.log('✅ API routes moved to temporary directory')
} else {
  console.log('ℹ️  No API routes found to move')
}

console.log('✅ Pre-build preparation complete!')
