# Git add, commit and push
$ErrorActionPreference = "Stop"
Set-Location "C:\Users\Alessandro\Downloads\IBR_Maragogi\ibr-maragogi"

# Add changes
git add -A

# Commit
git commit -m "Fix: Remove TypeScript config issues and add global.css import to App.jsx

- Remove old main.ts, counter.ts, style.css files
- Add global.css import to App.jsx
- Adjust tsconfig.json for JSX files
- Remove types/index.js (was using TS syntax in .js file)"

# Push to remote
git push -u origin main