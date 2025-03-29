# 📝 Day Tech Blog

A full-stack blogging platform built with **React (Vite)** and **Django REST Framework**. It allows users to write and share tech blogs, showcasing modern web development practices including JWT-based authentication, API integration, and a clean UI/UX.

---

## 🔧 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Django, Django REST Framework
- **Database:** SQLite (Development)
- **Authentication:** JWT (Token-based)
- **Environment Management:** `.env` for secrets and config
- **Deployment Ready:** Production-safe settings and structure

---

## ✨ Features

- 🔐 User Authentication (JWT)
- 📝 Create, Edit, Delete Blogs
- 📖 View Public Blogs
- 🌐 RESTful API integration
- 🎯 Responsive Design
- ⚙️ Environment-based config separation

---

## 📁 Project Structure


---

## 🛠️ Setup Instructions

### ✅ Prerequisites

- Node.js (v18+)
- Python 3.9+
- pip / venv
- Git

---

### 🔙 Backend (Django)

# Navigate to backend folder
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r ../requirements.txt

# Setup .env file (refer to .env.example)
cp .env.example .env

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Run backend server
python manage.py runserver

---

📂 Example .env for Django:
env
SECRET_KEY=your_django_secret
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

---

⚛️ Frontend Setup (React with Vite)
bash

# Navigate to frontend folder
cd ../frontend

# Install frontend dependencies
npm install

# Copy environment config
cp .env.example .env

# Start the frontend development server
npm run dev

---

📂 Example .env for React:
env
VITE_API_URL=http://127.0.0.1:8000/api

---

🚀 Deployment Tips

Set DEBUG=False in production

Use a strong, secret SECRET_KEY

Add your domain(s) to ALLOWED_HOSTS

Use PostgreSQL or other production-grade DB

Collect static files: python manage.py collectstatic

Serve React build with Nginx or deploy frontend via Vercel/Netlify

Use Gunicorn or Uvicorn + Nginx for Django in production



