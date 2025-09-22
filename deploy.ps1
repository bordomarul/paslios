# Paslios Launch Day Deployment Script
# Run this in PowerShell from the paslios directory

Write-Host "🚀 Paslios Launch Day Deployment Starting..." -ForegroundColor Green

# Step 1: Initialize Git (if not already done)
if (-not (Test-Path ".git")) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Step 2: Add all files
Write-Host "📁 Adding all files to Git..." -ForegroundColor Yellow
git add .

# Step 3: Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
$commitMessage = "Production ready - Launch Day $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git commit -m $commitMessage

# Step 4: Add remote origin (if not exists)
Write-Host "🔗 Setting up remote origin..." -ForegroundColor Yellow
git remote add origin https://github.com/bordomarul/paslios.git 2>$null

# Step 5: Push to GitHub
Write-Host "🌐 Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

# Step 6: GitHub Pages setup instructions
Write-Host ""
Write-Host "🌍 GitHub Pages Setup Instructions:" -ForegroundColor Cyan
Write-Host "1. Go to https://github.com/bordomarul/paslios" -ForegroundColor White
Write-Host "2. Click Settings → Pages" -ForegroundColor White
Write-Host "3. Source: Deploy from a branch" -ForegroundColor White
Write-Host "4. Branch: main" -ForegroundColor White
Write-Host "5. Folder: / (root)" -ForegroundColor White
Write-Host "6. Click Save" -ForegroundColor White

# Step 7: Display launch information
Write-Host ""
Write-Host "🎉 LAUNCH INFORMATION" -ForegroundColor Green
Write-Host "====================" -ForegroundColor Green
Write-Host "Repository: https://github.com/bordomarul/paslios" -ForegroundColor White
Write-Host "Live URL: https://bordomarul.github.io/paslios" -ForegroundColor White
Write-Host "Status: Ready to launch! 🚀" -ForegroundColor Green

# Step 8: Launch checklist
Write-Host ""
Write-Host "📋 POST-DEPLOYMENT CHECKLIST" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host "[ ] GitHub Pages enabled" -ForegroundColor Yellow
Write-Host "[ ] URL accessible" -ForegroundColor Yellow
Write-Host "[ ] Mobile responsive tested" -ForegroundColor Yellow
Write-Host "[ ] Authentication working" -ForegroundColor Yellow
Write-Host "[ ] Navigation functional" -ForegroundColor Yellow
Write-Host "[ ] Performance optimized" -ForegroundColor Yellow

# Step 9: Test commands
Write-Host ""
Write-Host "🧪 QUICK TESTS TO RUN:" -ForegroundColor Magenta
Write-Host "1. Open browser console and run: runLaunchTests()" -ForegroundColor White
Write-Host "2. Test mobile view (F12 - Device toolbar)" -ForegroundColor White
Write-Host "3. Test registration and login flow" -ForegroundColor White
Write-Host "4. Check all main pages load correctly" -ForegroundColor White

# Step 10: Social media announcement template
Write-Host ""
Write-Host "📱 SOCIAL MEDIA ANNOUNCEMENT TEMPLATE:" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Paslios artık canlı!" -ForegroundColor White
Write-Host ""
Write-Host "Türkiye'nin yeni futbol sosyal medya platformu:" -ForegroundColor White
Write-Host "⚽ Maç organizasyonu" -ForegroundColor White
Write-Host "👥 Futbolcu buluşması" -ForegroundColor White
Write-Host "🏆 Liderlik tablosu" -ForegroundColor White
Write-Host "💬 Sohbet sistemi" -ForegroundColor White
Write-Host ""
Write-Host "Test edin: https://bordomarul.github.io/paslios" -ForegroundColor White
Write-Host "#futbol #paslios #sosyalmedya #launch" -ForegroundColor White

Write-Host ""
Write-Host "🎯 Deployment completed! Ready for launch! 🎉" -ForegroundColor Green