# ECLIPSE CLOTHING 4.0 — GitHub Pages build

This version is configured to run as a fully static Vite + React site on:

https://eclipsecl.github.io/

## What was fixed

- Replaced the `/api/products` Supabase dependency with a local product catalogue.
- Added local filtering, sorting, search, product pages, and related products.
- Made wishlist data persist in the browser with `localStorage`.
- Made newsletter, contact, custom-order, review, and checkout flows work locally without a server.
- Made orders persist in the browser for the order-confirmation page.
- Switched React routing to `HashRouter`, which avoids GitHub Pages refresh/route 404 errors.
- Removed server-only API files and the Supabase server dependency.
- Simplified Vite configuration for the GitHub Pages root domain.

## Deploy

Build with:

```bash
npm install
npm run build
```

Then publish the generated `dist` folder with GitHub Pages.

If GitHub Actions is used, configure Pages to deploy the Vite `dist` output.

## Important limitation

GitHub Pages is static hosting. This build intentionally does not use a database or server API. Customer submissions and orders are stored only in the visitor's browser. For real shared orders, payments, reviews, or admin data, a separate backend/serverless service is required.


## GitHub Pages version

This version is designed for GitHub Pages. The storefront product catalogue is bundled into the frontend, so the Shop section does not depend on `/api/products` and will not display a server 404 error. React routes use HashRouter for GitHub Pages compatibility.

Deploy with the included GitHub Actions workflow, or run `npm ci && npm run build` and publish the `dist` folder.
