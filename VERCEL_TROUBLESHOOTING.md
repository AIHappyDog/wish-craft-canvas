# Vercel Deployment Troubleshooting Guide

## 🚨 Issue: API Generation Failed on Vercel

### **Step 1: Check Environment Variables**

1. **Go to Vercel Dashboard:**
   - Navigate to your project
   - Click "Settings" → "Environment Variables"

2. **Verify OPENAI_API_KEY:**
   - Name: `OPENAI_API_KEY`
   - Value: Your actual OpenAI API key (starts with `sk-...`)
   - Environment: **Production** (make sure this is checked!)
   - Preview: **Production** (check this too)

3. **Redeploy after setting environment variables:**
   - Go to "Deployments" tab
   - Click "Redeploy" on your latest deployment

### **Step 2: Check API Function Deployment**

1. **Verify API folder exists:**
   - Ensure `api/` folder is in your project root
   - Contains `vision-plan.ts` and `image.ts`

2. **Check build logs:**
   - Look for any errors during deployment
   - Ensure no TypeScript compilation errors

### **Step 3: Test API Endpoints Directly**

1. **Test vision-plan endpoint:**
   ```bash
   curl -X POST https://your-domain.vercel.app/api/vision-plan \
     -H "Content-Type: application/json" \
     -d '{"wish":"test wish"}'
   ```

2. **Test image endpoint:**
   ```bash
   curl -X POST https://your-domain.vercel.app/api/image \
     -H "Content-Type: application/json" \
     -d '{"prompt":"test","style":"vivid"}'
   ```

### **Step 4: Check Vercel Function Logs**

1. **Go to Vercel Dashboard:**
   - Click "Functions" tab
   - Look for your API functions
   - Check for any error logs

2. **Common errors to look for:**
   - "Missing OPENAI_API_KEY environment variable"
   - "OpenAI API request failed"
   - CORS errors

### **Step 5: Verify OpenAI API Key**

1. **Test your API key:**
   ```bash
   curl -X POST https://api.openai.com/v1/chat/completions \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello"}]}'
   ```

2. **Check API key permissions:**
   - Ensure it has access to GPT-4o and DALL-E 3
   - Check if there are any usage limits

### **Step 6: Common Solutions**

1. **Environment Variable Issues:**
   - Delete and recreate the environment variable
   - Ensure it's set for Production environment
   - Redeploy after changes

2. **CORS Issues:**
   - Added CORS headers to API functions
   - Check browser console for CORS errors

3. **Function Timeout:**
   - Increased maxDuration to 30 seconds in vercel.json
   - Check if requests are timing out

### **Step 7: Debug Steps**

1. **Add console.log statements:**
   - Check Vercel function logs
   - Verify environment variables are loaded
   - Monitor API request/response flow

2. **Check network tab:**
   - Look for failed API calls
   - Check response status codes
   - Verify request payloads

### **Step 8: Alternative Testing**

1. **Test with Postman/Insomnia:**
   - Test API endpoints directly
   - Verify authentication works
   - Check response formats

2. **Check browser console:**
   - Look for JavaScript errors
   - Check network request failures
   - Verify API endpoint URLs

## 🔧 Quick Fixes

### **Immediate Actions:**
1. ✅ **Redeploy** your project on Vercel
2. ✅ **Verify** environment variables are set
3. ✅ **Check** API function deployment
4. ✅ **Test** endpoints directly

### **If Still Not Working:**
1. 🔄 **Delete and recreate** environment variables
2. 🔄 **Check Vercel function logs** for specific errors
3. 🔄 **Verify OpenAI API key** is valid and has credits
4. 🔄 **Test API endpoints** with curl/Postman

## 📞 Need Help?

If the issue persists:
1. Check Vercel function logs for specific error messages
2. Verify your OpenAI API key is working
3. Ensure environment variables are properly set
4. Test API endpoints directly

The most common issue is environment variables not being set for the Production environment in Vercel!
