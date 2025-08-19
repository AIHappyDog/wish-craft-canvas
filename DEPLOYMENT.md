# 🚀 Deployment Guide for Manifest Magic

## Prerequisites
- GitHub account
- Vercel account
- OpenAI API key

## Step 1: Prepare Your Repository

1. **Remove sensitive data** (already done):
   - ✅ API key removed from `src/lib/config.ts`
   - ✅ `.gitignore` updated to exclude `.env` files

2. **Commit and push your changes**:
   ```bash
   git add .
   git commit -m "Remove API key and prepare for deployment"
   git push origin main
   ```

## Step 2: Deploy to Vercel

1. **Connect your GitHub repository**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

2. **Configure project settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

## Step 3: Set Environment Variables

1. **In Vercel Dashboard**:
   - Go to your project
   - Click "Settings" → "Environment Variables"
   - Add the following variable:

   ```
   Name: OPENAI_API_KEY
   Value: sk-your-actual-openai-api-key-here
   Environment: Production, Preview, Development
   ```

2. **Get your OpenAI API key**:
   - Go to [platform.openai.com](https://platform.openai.com)
   - Navigate to "API Keys"
   - Create a new secret key
   - Copy the key and paste it in Vercel

## Step 4: Deploy

1. **Click "Deploy"** in Vercel
2. **Wait for build to complete**
3. **Test your application**:
   - Try generating a vision plan
   - Try generating an image
   - Check that API calls work

## Step 5: Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## 🔒 Security Notes

- ✅ API key is now stored securely in Vercel environment variables
- ✅ API key is never exposed to the client
- ✅ All OpenAI API calls go through Vercel serverless functions
- ✅ Your source code is safe to share publicly

## 🐛 Troubleshooting

### API Key Issues
- Ensure `OPENAI_API_KEY` is set in Vercel environment variables
- Check that the key has sufficient credits/quota
- Verify the key is valid in OpenAI dashboard

### Build Issues
- Check that all dependencies are in `package.json`
- Ensure build command is correct
- Check Vercel build logs for errors

### Function Issues
- Check Vercel function logs
- Verify API endpoints are accessible
- Test functions locally with `vercel dev`

## 📱 Local Development

To test locally with Vercel functions:

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Link your project**:
   ```bash
   vercel link
   ```

3. **Pull environment variables**:
   ```bash
   vercel env pull .env.local
   ```

4. **Run locally**:
   ```bash
   vercel dev
   ```

## 🎉 Success!

Your Manifest Magic application is now:
- ✅ Securely deployed on Vercel
- ✅ Using environment variables for API keys
- ✅ Ready for production use
- ✅ Safe to share publicly

The application will automatically redeploy when you push changes to your GitHub repository!
