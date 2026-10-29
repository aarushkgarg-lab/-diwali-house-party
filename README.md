# Diwali House Party website

A mobile-friendly, single-page React/Vite invitation for 31 October 2026, 4 PM onwards, at "Flat Party".

## Run locally

1. Open this folder in VS Code.
2. Open Terminal → New Terminal.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL Vite prints (usually `http://localhost:5173`).

## Create a production build

```bash
npm run build
```

## Publish a shareable link with Vercel

1. Create a GitHub account if you do not already have one.
2. Create a new GitHub repository and upload the files in this folder.
3. Sign in to Vercel with GitHub and choose **Add New → Project**.
4. Import the repository. Vercel should detect Vite automatically.
5. Keep the build command `npm run build` and output directory `dist`, then click **Deploy**.
6. When deployment finishes, copy the public `*.vercel.app` URL and share it in WhatsApp.

No API keys or environment variables are needed.

## Notes

- Music starts only after the visitor taps the music button because browsers restrict autoplay.
- The party details are in `src/main.jsx`. Change the location text there if needed.
- This is an invitation front end; it does not store guest RSVP responses on a server.
