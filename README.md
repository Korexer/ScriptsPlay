# ScriptsPlay - Professional Transcription & Captioning Platform

ScriptsPlay is a modern, high-performance web platform for professional transcription and captioning services. It features a public-facing corporate website and a secure workers' portal where transcriptionists can manage tasks, track earnings, and complete assessments.

## 🚀 Tech Stack

*   **Frontend**: React (v19), TypeScript, Vite, Tailwind CSS
*   **Icons & Animation**: Lucide React, Framer Motion
*   **Routing**: React Router DOM (v7)
*   **Backend & Database**: Supabase (Database, Auth, Edge Functions)
*   **Deployment**: Vercel (Frontend), Supabase (Edge Functions)

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (v18+ recommended)
*   [npm](https://www.npmjs.com/) (packaged with Node.js)
*   [Git](https://git-scm.com/)

You will also need a **Supabase Project** to handle the database backend, email edge functions, and user authentication.

---

## 📥 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Korexer/ScriptsPlay.git
cd ScriptsPlay
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env  # Or create it manually
```

Add your Supabase credentials to the `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```
*(Do not commit your `.env` file to version control. It is already added to `.gitignore`.)*

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## 📦 Database & Backend Setup (Supabase)

To make the contact form, authentication, and worker portal fully functional, configure your Supabase instance:

### 1. Database Schema
Create a `contact_submissions` table to store messages sent via the contact page:
```sql
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  message text not null
);
```

### 2. Edge Function (Email Notifications)
The contact form triggers an email notification to `hello@scriptsplay.com` via a Supabase Edge Function (`supabase/functions/send-contact-email`).

To deploy and configure this Edge Function:
1.  Install the Supabase CLI on your system.
2.  Log in and link your project:
    ```bash
    supabase login
    supabase link --project-ref your_project_ref
    ```
3.  Deploy the Edge Function:
    ```bash
    supabase functions deploy send-contact-email
    ```
4.  Configure the Gmail SMTP secrets in Supabase:
    ```bash
    supabase secrets set GMAIL_USER=your_gmail_address
    supabase secrets set GMAIL_APP_PASSWORD=your_gmail_app_password
    ```

---

## 🚀 Production Deployment (Vercel)

This project is configured to deploy directly to Vercel. 

### Vercel Configuration Notes:
*   **Build Command**: `npm run build`
*   **Output Directory**: `dist`
*   **Framework Preset**: `Vite`
*   **Client-Side Routing**: The project includes a `vercel.json` file to handle routing rewrites. This prevents `404 Not Found` errors when refreshing pages on custom routes (e.g., `/services` or `/spworkersportal101/signup`).
*   **Environment Variables**: Ensure you configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the **Environment Variables** settings of your Vercel project dashboard.

---

## 📂 Project Structure

```text
├── public/                 # Static assets (images, logos)
├── src/
│   ├── assets/             # Asset files
│   ├── components/         # Reusable UI elements (Header, Footer, SEO)
│   │   └── portal/         # Portal layouts and route guards
│   ├── context/            # AuthContext provider
│   ├── lib/                # Configured library clients (Supabase)
│   ├── pages/              # Page views (Home, About, Jobs, Contact)
│   │   └── portal/         # Worker Portal pages (Dashboard, Earnings, Signup)
│   ├── App.tsx             # Main routing layout
│   └── main.tsx            # Application entry point
├── supabase/
│   └── functions/          # Deno Edge Functions
├── vercel.json             # Vercel deployment configuration
└── package.json            # Scripts and dependencies
```
