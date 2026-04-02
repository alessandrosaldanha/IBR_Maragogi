# Git add, commit and push
$ErrorActionPreference = "Stop"
Set-Location "C:\Users\Alessandro\Downloads\IBR_Maragogi\ibr-maragogi"

# Add changes
git add -A

# Commit
git commit -m "Fix: Layout padding issue causing page content to be hidden

- Remove padding-top from main-content in Layout.css
- Ensure page content is visible with proper spacing"

# Push to remote
git push