# Git config and commit
$ErrorActionPreference = "Stop"
Set-Location "C:\Users\Alessandro\Downloads\IBR_Maragogi\ibr-maragogi"

# Configure git
git config user.name "Alessandro"
git config user.email "alessandro@example.com"

# Add all files
git add -A

# Commit
git commit -m "Initial commit: IBR Maragogi institutional website

- React + Vite project structure
- Responsive sidebar navigation
- Pages: Home, About, Projects, Materials, FAQ
- Xano API service layer ready
- Mock data for demonstration
- Yellow, black, white color scheme
- Modern and clean design"