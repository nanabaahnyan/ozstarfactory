# OZSTAR Factory — Maintenance Page

A one-page site that tells visitors **"System is under maintenance"**.

```
backend/    Django API (deploy to Render)  → GET /api/status/, GET /api/health/
frontend/   Static HTML/CSS/JS (deploy to Vercel)
render.yaml Render Blueprint for the backend
```

The page shows its default message on its own. If the backend responds, it fills
in the title, message, and an optional "Expected back" time from `/api/status/`.
That means the page still works while Render's free tier is waking up or down.

## Run locally

```bash
# backend → http://127.0.0.1:8000/api/status/
cd backend
pip install -r requirements.txt
python manage.py runserver 8000

# frontend → http://localhost:5500  (uses the local backend automatically)
cd frontend
python -m http.server 5500
```

Tests: `cd backend && python manage.py test`

## Deploy

Push this folder to a GitHub repository first. Both Render and Vercel deploy from it.

### 1. Backend on Render

1. In Render, choose **New → Blueprint** and pick the repo. It reads `render.yaml`
   (root dir `backend`, build `./build.sh`, start `gunicorn`). If you create a
   **Web Service** by hand instead, use those same values.
2. Environment variables (see `backend/.env.example`):

   | Key | Value |
   |---|---|
   | `DJANGO_SECRET_KEY` | long random string (the Blueprint generates one) |
   | `DJANGO_DEBUG` | `False` |
   | `DJANGO_ALLOWED_HOSTS` | `api.ozstarfactory.com` |
   | `CORS_ALLOWED_ORIGINS` | `https://ozstarfactory.com,https://www.ozstarfactory.com` |
   | `MAINTENANCE_MESSAGE` | optional custom message |
   | `MAINTENANCE_ETA` | optional, e.g. `Monday, 9:00 AM GMT` |

   You don't need to add the `*.onrender.com` hostname. Render provides it and Django allows it automatically.
3. Under **Settings → Custom Domains**, add `api.ozstarfactory.com`.

To change the message later, edit `MAINTENANCE_MESSAGE` / `MAINTENANCE_ETA` in Render.
No code change is needed.

### 2. Frontend on Vercel

1. Set `PRODUCTION_API_URL` in `frontend/config.js` to your backend URL:
   `https://api.ozstarfactory.com`, or the `onrender.com` URL until DNS is ready.
2. In Vercel, choose **Add New → Project**, import the repo, and set **Root Directory** to `frontend`.
   Framework preset: **Other**. Leave the build command empty.
3. Under **Settings → Domains**, add `ozstarfactory.com` and `www.ozstarfactory.com`.
4. If you test on a `*.vercel.app` URL, add that URL to `CORS_ALLOWED_ORIGINS` on Render too.

### 3. Namecheap DNS

Live now: frontend https://ozstarfactory.vercel.app, backend https://ozstarfactory-api.onrender.com.
`ozstarfactory.com` and `www.ozstarfactory.com` are already added to the Vercel project.
Once the domain is active in Namecheap, go to **Domain List → Manage → Advanced DNS**,
delete the default parking records (the `@` URL Redirect and the `www` CNAME to parkingpage),
and add:

| Type | Host | Value |
|---|---|---|
| A Record | `@` | `216.198.79.1` |
| CNAME Record | `www` | `7c2a9fc32c788bca.vercel-dns-017.com.` |

Vercel then issues SSL automatically, and `ozstarfactory.com` redirects to `www.ozstarfactory.com`.
