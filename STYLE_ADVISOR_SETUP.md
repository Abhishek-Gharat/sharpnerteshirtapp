# Style Advisor - Environment Variable Setup

## For Vite (Your Project)

Vite uses `import.meta.env` instead of `process.env`.

### Option 1: No API Key (Works Immediately)
The Style Advisor works **without any API key** using smart fallback logic. Just use it as-is!

### Option 2: Add OpenRouter API Key

1. Get your free API key from: https://openrouter.ai/keys

2. Create `.env` file in project root:
```env
VITE_OPENROUTER_API_KEY=sk-or-your-actual-key-here
```

3. **Important**: Variables must start with `VITE_` for Vite to expose them to the browser

4. Restart dev server:
```bash
npm run dev
```

## What's Fixed

The error was because I used `process.env` (React default) but your project uses **Vite** which requires `import.meta.env`.

### Changed:
```javascript
// Before (React default) - WRONG for Vite
const key = process.env.REACT_APP_OPENROUTER_API_KEY;

// After (Vite compatible) - CORRECT
const key = import.meta.env.VITE_OPENROUTER_API_KEY;
```

## Current Status

✅ Build successful
✅ Works without API key (fallback mode)
✅ Works with API key (AI mode)
✅ No console errors

The Style Advisor is ready to use! 🚀
