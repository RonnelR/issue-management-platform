# Issue Management Platform

A minimal full-stack issue management platform built using Next.js, Express.js, PostgreSQL, and Drizzle ORM with Gemini AI integration.

---

# Features

- Create and manage issues
- View all issues
- View issue details
- Add comments/discussions
- Generate AI-powered issue analysis
- REST API architecture
- PostgreSQL database integration

---

# Tech Stack

## Frontend
- Next.js
- TailwindCSS
- TypeScript
- Axios

## Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Drizzle ORM

## AI Integration
- Gemini AI API

---

# Project Structure

```bash
issue-management-platform/
│
├── frontend/
├── backend/
```

---

# Environment Variables

## Backend (.env)

```env
DATABASE_URL=your_postgresql_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

# Installation & Setup

## 1. Clone Repository

```bash
git clone <your-github-repository-url>
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

### Start Backend Server

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# Database Setup

## Create PostgreSQL Database

```sql
CREATE DATABASE issue_management;
```

---

# Run Drizzle Migration

```bash
npm run migrate
```

---

# API Endpoints

## Issues

- GET /issues
- GET /issues/:id
- POST /issues

## Comments

- GET /comments/:issueId
- POST /comments

## AI

- POST /ai/:id

---

# Notes

- Gemini API quota limitations may affect AI responses.
- A fallback response system is implemented for graceful error handling.
