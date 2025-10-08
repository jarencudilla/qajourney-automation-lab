# cPanel Deployment Instructions

## Quick Deploy Steps

1. **Download the built files**
   - The file `qa-playground-cpanel.tar.gz` contains all your production files

2. **Upload to cPanel**
   - Log into your cPanel
   - Open **File Manager**
   - Navigate to `public_html` (or your subdomain folder)
   - Click **Upload** and upload `qa-playground-cpanel.tar.gz`
   - Right-click the uploaded file and select **Extract**
   - Delete the `.tar.gz` file after extraction

3. **That's it!**
   - Visit your domain to see the application live
   - Example: `https://yourdomain.com`

## Alternative: Manual Upload

If you prefer to upload files manually:

1. Build the project locally (already done)
2. Download the `dist` folder from your project
3. Upload all contents of the `dist` folder to your cPanel `public_html`
   - Make sure `index.html` is in the root
   - Upload the `assets` folder with all CSS/JS files

## File Structure in cPanel

Your `public_html` should look like:
```
public_html/
  ├── index.html
  ├── assets/
  │   ├── index-[hash].css
  │   └── index-[hash].js
  └── playground/
```

## Important Notes

- **No .env needed** - This is a static site with no backend
- **No Node.js needed** - It's pure HTML/CSS/JS after build
- **Works immediately** - No installation or setup required on cPanel
- **Single Page App** - All navigation happens in the browser

## Subdomain Deployment

To deploy to a subdomain (e.g., `playground.yourdomain.com`):

1. Create subdomain in cPanel
2. Upload files to the subdomain's folder (usually `public_html/subdomain-name`)
3. Follow same steps as above

## Troubleshooting

**Blank page?**
- Check browser console for errors
- Ensure all files from `dist` folder were uploaded
- Clear browser cache

**404 errors?**
- Make sure `index.html` is in the correct directory
- Check that assets folder was uploaded

**Need to update?**
- Run `npm run build` again
- Delete old files from cPanel
- Upload new `dist` folder contents
