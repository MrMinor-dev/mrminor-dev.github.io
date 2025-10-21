# Deployment Instructions for GitHub Portfolio Site

## Step 1: Create Repository on GitHub

1. Go to https://github.com/MrMinor-dev
2. Click **"New repository"** (green button)
3. **Repository name:** `mrminor-dev.github.io` (MUST be exactly this)
4. **Description:** "Professional portfolio showcasing technical program management and automation frameworks"
5. **Public** repository (required for free GitHub Pages)
6. **DO NOT** initialize with README (we have our own files)
7. Click **"Create repository"**

## Step 2: Copy Files via GitHub Desktop

1. Open **GitHub Desktop**
2. Click **"Add"** → **"Add Existing Repository"**
3. Navigate to: `G:\My Drive\Career-Portfolio\github-portfolio-site`
4. Click **"Add Repository"**
5. Publish to GitHub:
   - Click **"Publish repository"**
   - Ensure name is: `mrminor-dev.github.io`
   - Uncheck **"Keep this code private"** (must be public)
   - Click **"Publish repository"**

## Step 3: Enable GitHub Pages (Automatic)

**Good news:** Because your repository is named `mrminor-dev.github.io`, GitHub Pages is **automatically enabled**!

Your site will be live at: **https://mrminor-dev.github.io**

**Wait Time:** 1-2 minutes after first push

## Step 4: Verify Deployment

1. Wait 1-2 minutes after publishing
2. Visit: https://mrminor-dev.github.io
3. You should see your portfolio site live!

## Step 5: Future Updates

When you want to update the site:

1. Edit files in `G:\My Drive\Career-Portfolio\github-portfolio-site\`
2. Open GitHub Desktop
3. Review changes
4. Write commit message (e.g., "Update experience section")
5. Click **"Commit to main"**
6. Click **"Push origin"**
7. Wait 1-2 minutes → changes are live!

## Files Included

```
github-portfolio-site/
├── index.md           # Main portfolio page (your content)
├── _config.yml        # Jekyll configuration
├── README.md          # Repository documentation
└── DEPLOY.md          # This file (deployment instructions)
```

## Customization Options

### Change Theme
Edit `_config.yml`:
```yaml
theme: minima  # Other options: jekyll-theme-cayman, jekyll-theme-slate, etc.
```

Browse themes: https://pages.github.com/themes/

### Add Google Analytics
Edit `_config.yml`:
```yaml
google_analytics: UA-XXXXXXXXX-X  # Your tracking ID
```

### Custom Domain (Optional - Later)
If you buy `jordanwaxman.com`:
1. Create file `CNAME` with your domain
2. Configure DNS settings
3. Enable HTTPS in GitHub Pages settings

## Troubleshooting

**Site not loading?**
- Check repository is public
- Verify name is exactly: `mrminor-dev.github.io`
- Wait 5 minutes (initial deployment can be slow)

**404 Error?**
- Ensure `index.md` exists
- Check file is committed and pushed

**Styling looks wrong?**
- Theme may not be loaded yet (wait 2-3 minutes)
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

## Next Steps

After this repository is live:
1. Test the site at https://mrminor-dev.github.io
2. Add the URL to your resume
3. Add to LinkedIn profile (Featured section)
4. Build the next 4 repositories (the framework repos)

---

**Need Help?**
- GitHub Pages docs: https://docs.github.com/en/pages
- Jekyll docs: https://jekyllrb.com/docs/
