# =============================================
#  MIKES CONSTRUCTIONS — Full Setup Guide
#  Read this top to bottom before doing anything
# =============================================

You have two folders in this zip:

  mikes-site/     → The website (HTML/CSS/JS)
  mikes-sanity/   → The CMS dashboard (Sanity Studio)

Follow every step in order. Do not skip any.

---

## ═══════════════════════════════════
## PART 1 — SET UP THE WEBSITE ON VERCEL
## (Skip this if already live)
## ═══════════════════════════════════

### Step 1 — Create a GitHub account
Go to https://github.com and sign up free.

### Step 2 — Upload the website to GitHub
1. Click + → New repository
2. Name it: mikes-site
3. Set to Public
4. Do NOT tick "Add README" — leave everything unchecked
5. Click Create repository
6. Click "uploading an existing file"
7. Drag and drop ALL files from the mikes-site folder
8. Click Commit changes

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com — sign up free with your GitHub account
2. Click Add New → Project
3. Select your mikes-site repository
4. Click Deploy (no settings to change)
5. Your site goes live at: https://mikes-site.vercel.app

---

## ═══════════════════════════════════
## PART 2 — SET UP SANITY CMS
## ═══════════════════════════════════

### Step 4 — Create a Sanity account
1. Go to https://sanity.io
2. Click Get Started Free
3. Sign up with Google or email
4. When asked to create a project:
   - Project name: mikes-constructions
   - Dataset: production (default)
5. You will land on your Sanity dashboard
6. IMPORTANT: Copy your Project ID
   - It's shown on the dashboard, looks like: abc123xy
   - You will need this in Steps 7 and 8

### Step 5 — Install the Sanity CLI
Open your VS Code terminal and run:

  pnpm add -g sanity@latest

Wait for it to finish.

### Step 6 — Install studio dependencies
In your VS Code terminal, navigate into the mikes-sanity folder:

  cd mikes-sanity
  pnpm install

Wait for it to finish.

### Step 7 — Add your Project ID to the studio
Open the file: mikes-sanity/sanity.config.js

Find this line:
  projectId: 'YOUR_PROJECT_ID',

Replace YOUR_PROJECT_ID with the ID you copied in Step 4.
Example:
  projectId: 'abc123xy',

Save the file.

### Step 8 — Add your Project ID to the website
Open the file: mikes-site/js/sanity.js

Find this line:
  const PROJECT_ID = 'YOUR_PROJECT_ID'

Replace YOUR_PROJECT_ID with the same ID.
Example:
  const PROJECT_ID = 'abc123xy'

Save the file.

### Step 9 — Log in to Sanity
In your VS Code terminal (inside the mikes-sanity folder), run:

  sanity login

A browser window will open. Log in with the same account from Step 4.
Come back to the terminal — it should say "Login successful".

### Step 10 — Test the dashboard locally
Still inside mikes-sanity, run:

  pnpm dev

It will open at: http://localhost:3333

You should see the Mikes Constructions dashboard with:
  🏠 About Us
  🏗 Projects
  🔧 Services
  📰 News & Blog
  ⭐ Testimonials
  🏢 Site Settings

This is the dashboard your client will use to update his website.

### Step 11 — Allow the website to read Sanity content
1. Go to https://sanity.io/manage
2. Click on your mikes-constructions project
3. Click API in the left sidebar
4. Click CORS Origins
5. Click Add CORS origin and add:
     https://mikes-site.vercel.app     ← his live site
     http://localhost:5500              ← for your local testing
6. For each one, tick "Allow credentials"
7. Click Save

### Step 12 — Push the updated website to GitHub
The website now has the Sanity connection files added.
Push the changes so the live site is updated:

  cd ../mikes-site
  git add .
  git commit -m "Add Sanity CMS integration"
  git push

Vercel will automatically redeploy in about 30 seconds.

### Step 13 — Deploy the dashboard live
This makes the dashboard accessible from anywhere — not just your computer.

Inside mikes-sanity, run:

  sanity deploy

When asked for a studio hostname, type:
  mikes-constructions

Your client's dashboard will be live at:
  https://mikes-constructions.sanity.studio

This is the URL you give to Mike to log in and manage his website.

---

## ═══════════════════════════════════
## PART 3 — INVITE YOUR CLIENT & USERS
## ═══════════════════════════════════

### Step 14 — Invite Mike as an Editor
1. Go to https://sanity.io/manage
2. Click your project → Members
3. Click Invite members
4. Enter Mike's email address
5. Set role: Editor
   (Editor = can add/edit/delete content but cannot delete the project)
6. Click Send invitation

Mike receives an email, clicks the link, creates a password, and he's in.

### Step 15 — Invite additional maintenance users
Same as Step 14 — repeat for each person.
Roles:
  Editor  → Can create and edit all content
  Viewer  → Can view content only (read-only)

---

## ═══════════════════════════════════
## PART 4 — WHAT MIKE CAN DO
## ═══════════════════════════════════

He logs in at: https://mikes-constructions.sanity.studio

  🏠 About Us
     - Edit the About Us text
     - Upload new team photos

  🏗 Projects
     - Add new projects with photos
     - Mark projects as Ongoing, Completed or Upcoming
     - Add multiple photos per project
     - Tick "Featured on Homepage" to show on the front page
     - Delete old projects

  📰 News & Blog
     - Write new blog posts
     - Upload cover images
     - Save as Draft or Publish immediately
     - Set categories (Tips, Bathroom, Kitchen, etc.)

  🔧 Services
     - Edit service descriptions
     - Upload service photos
     - Reorder services

  ⭐ Testimonials
     - Add new client reviews
     - Set star rating
     - Tick "Show on Homepage" to feature them

  🏢 Site Settings
     - Update phone number
     - Update email address
     - Update all social media links
     - Update project count and years of experience stats

When he saves anything → it appears on the live website immediately.
No code. No developer needed for day-to-day updates.

---

## ═══════════════════════════════════
## QUICK REFERENCE — COMMANDS
## ═══════════════════════════════════

Run studio locally (for testing):
  cd mikes-sanity && pnpm dev

Deploy studio live (first time setup):
  cd mikes-sanity && sanity deploy

Push website changes to live:
  cd mikes-site && git add . && git commit -m "update" && git push

---

## ═══════════════════════════════════
## NEED HELP?
## ═══════════════════════════════════

Sanity documentation:  https://www.sanity.io/docs
Sanity community:      https://slack.sanity.io
Vercel documentation:  https://vercel.com/docs

