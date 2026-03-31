# 🚀 Unified Command Center

A centralized, professional dashboard built to aggregate and manage various Google Sheet trackers. Designed for high scalability and ease of use.

## 🛠️ Tech Stack
- **Library:** React 18 (Vite)
- **Styling:** Tailwind CSS (Dark/Light Mode)
- **API Engine:** Google Apps Script (Web App)
- **Data Source:** Google Sheets API
- **Hosting:** Vercel

## ✨ Features
- **Bento Grid Layout:** Clean, modular UI for high-level data visualization.
- **Admin Control:** Dedicated panel to link/unlink new spreadsheets dynamically.
- **Security:** Secure PIN-entry system with environment variable protection.
- **Usage Tracking:** Smart sorting of trackers based on your personal frequency.
- **Category Filtering:** Instantly filter trackers by Type (Coding, Finance, Admin, etc.).

## 🏗️ System Architecture
The project uses a **Metadata-Driven** approach. A "Master Registry" Google Sheet stores the metadata for all sub-trackers. 
1. **React** fetches the registry via a **Google Apps Script API**.
2. The UI dynamically maps the registry into **Tracker Cards**.
3. Each card independently fetches its own live data from its respective sheet.

## 🚀 Installation & Setup
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env` file based on `.env.example`.
4. Run locally: `npm run dev`.

## 🔒 Security
Sensitive URLs and PINs are managed via **Environment Variables** and are never pushed to the repository.