# Complete Workflow: Cursor → GitHub → Replit

## Step 1: Initialize Git in Cursor
```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit"
```

## Step 2: Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click "+" in top right corner
3. Select "New repository"
4. Name it "soundstage"
5. Leave it public
6. Don't initialize with README
7. Click "Create repository"

## Step 3: Connect and Push to GitHub
```bash
# Add GitHub repository as remote
git remote add origin https://github.com/yourusername/soundstage.git

# Push to GitHub
git push -u origin main
```

## Step 4: Add Replit Configuration Files
1. Create `.replit` file:
```bash
echo 'run = "npm run dev"
entrypoint = "app/page.tsx"

[nix]
channel = "stable-22_11"' > .replit
```

2. Create `replit.nix`:
```bash
echo '{ pkgs }: {
    deps = [
        pkgs.nodejs-18_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.replitPackages.jest
    ];
}' > replit.nix
```

## Step 5: Add GitHub Workflow for Replit
1. Create `.github/workflows/replit-deploy.yml`:
```yaml
name: Deploy to Replit

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install Dependencies
        run: npm install
      - name: Build Project
        run: npm run build
      - name: Push to Replit Branch
        run: |
          git config --global user.name "GitHub Action"
          git config --global user.email "action@github.com"
          git checkout -b replit
          git add .
          git commit -m "Setup for Replit"
          git push origin replit --force
```

## Step 6: Add One-Click Deploy Button
Add this to your README.md:
```markdown
[![Run on Repl.it](https://replit.com/badge/github/yourusername/soundstage)](https://replit.com/new/github/yourusername/soundstage)
```

## Step 7: Push Updates
```bash
# Add all changes
git add .

# Commit changes
git commit -m "Add Replit configuration"

# Push to GitHub
git push origin main
```

## Step 8: Deploy to Replit
1. Click the "Run on Repl.it" button in your GitHub README
2. Wait for Replit to import and setup the project
3. Click "Run" to start the development server

## Automation Script
Create a `deploy.sh` script:

```bash
#!/bin/bash

# Check if repository URL is provided
if [ -z "$1" ]; then
    echo "Usage: ./deploy.sh <github-username>"
    exit 1
fi

USERNAME=$1

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit"

# Create GitHub repository
gh repo create soundstage --public --source=. --remote=origin

# Push to GitHub
git push -u origin main

# Add Replit configuration
echo 'run = "npm run dev"
entrypoint = "app/page.tsx"' > .replit

# Add Replit badge to README
echo "[![Run on Repl.it](https://replit.com/badge/github/$USERNAME/soundstage)](https://replit.com/new/github/$USERNAME/soundstage)" >> README.md

# Commit and push Replit configuration
git add .
git commit -m "Add Replit configuration"
git push origin main

echo "Deployment complete! Your project is ready to run on Replit."
```

Make the script executable and run it:
```bash
chmod +x deploy.sh
./deploy.sh your-github-username
```

This will automate the entire process from Cursor to GitHub to Replit! 