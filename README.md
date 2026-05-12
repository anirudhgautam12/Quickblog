# Quickblog 🚀

A modern, full-stack blogging platform built with the MERN stack. Designed with a premium SaaS-style aesthetic, glassmorphism UI, and integrated AI capabilities to make content creation seamless.

🌐 **Live Demo:** [https://quickblog-alpha.vercel.app/](https://quickblog-alpha.vercel.app/)

## ✨ Key Features

- **Premium UI/UX:** Responsive, modern design using Tailwind CSS with glassmorphism, gradient accents, and micro-animations (hover effects, lift, scale).
- **AI Content Generation:** Integrated OpenAI API allows the admin to instantly generate rich-text blog content with a single click.
- **Admin Dashboard:** Secure admin panel to manage blogs, view metrics, and approve/delete comments.
- **Rich Text Editor:** Built-in Quill editor for styling blog posts.
- **Media Management:** Image upload handling via ImageKit.
- **Newsletter System:** Users can subscribe to the blog, securely saving their emails to the database.
- **Decoupled Architecture:** Built for scale with separate frontend (Vite/React) and backend (Node/Express) applications.

## 🛠️ Technology Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, React Hot Toast
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **External APIs:** OpenAI (GPT-3.5) for text generation, ImageKit for image storage, Nodemailer for emails.
- **Deployment:** Vercel (Frontend), Render (Backend)

## 💻 Running Locally

### Prerequisites
Make sure you have Node.js and MongoDB installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/anirudhgautam12/Quickblog.git
cd Quickblog
```

### 2. Setup the Backend
Open a new terminal window:
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory and add the following variables:
```env
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin
MONGODB_URI=your_mongodb_connection_string
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url
SMTP_USER=your_smtp_email
SMTP_PASS=your_smtp_password
OPENAI_API_KEY=your_openai_api_key
FRONTEND_URL=http://localhost:5173
```
Start the backend server:
```bash
npm run server
```

### 3. Setup the Frontend
Open another terminal window:
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_BASE_URL=http://localhost:3000
```
Start the development server:
```bash
npm run dev
```

### 4. Open the App
Navigate to `http://localhost:5173` in your browser. To access the admin panel, navigate to `/admin` and log in with the admin credentials set in your backend `.env` file.

## 📄 License
This project is licensed under the MIT License.
