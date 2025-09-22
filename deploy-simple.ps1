# Paslios Quick Deploy Script
Write-Host "🚀 Paslios Quick Deployment Starting..." -ForegroundColor Green

# Initialize Git if needed
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Add all files
Write-Host "📁 Adding all files to Git..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
$commitMessage = "Production ready - Launch Day $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git commit -m $commitMessage

# Add remote origin
Write-Host "🔗 Setting up remote origin..." -ForegroundColor Yellow
git remote add origin https://github.com/bordomarul/paslios.git 2>$null

# Push to GitHub
Write-Host "🌐 Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

# Success message
Write-Host ""
Write-Host "✅ DEPLOYMENT COMPLETED!" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green
Write-Host "Repository: https://github.com/bordomarul/paslios" -ForegroundColor White
Write-Host "Live URL: https://bordomarul.github.io/paslios" -ForegroundColor White

# GitHub Pages setup instructions
Write-Host ""
Write-Host "📋 NEXT STEPS:" -ForegroundColor Cyan
Write-Host "1. Go to https://github.com/bordomarul/paslios" -ForegroundColor White
Write-Host "2. Click Settings → Pages" -ForegroundColor White
Write-Host "3. Source: Deploy from a branch" -ForegroundColor White
Write-Host "4. Branch: main → Save" -ForegroundColor White
Write-Host "5. Wait 5-10 minutes for deployment" -ForegroundColor White

Write-Host ""
Write-Host "🎉 Platform ready to launch! 🚀" -ForegroundColor Green