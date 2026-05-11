# Copilot Instructions for IdeaOrbit Blog App

## Project Overview
This is a full-stack blog application with a React + Vite frontend (`client/`) and an Express/MongoDB backend (`server/`). The app supports public blog viewing and admin management features.

## Architecture & Data Flow
- **Frontend (`client/`)**: Built with React, Vite, and Tailwind CSS. Uses React Router for navigation and Quill for rich text editing. Key UI components are in `src/components/` and pages in `src/pages/`.
- **Backend (`server/`)**: Express server with REST API routes for blogs and admin actions. MongoDB is used for data storage (see `models/Blog.js`). Image uploads use ImageKit and Multer. Auth is handled via JWT (see `middleware/auth.js`).
- **API Endpoints**: Main routes are `/api/blog` and `/api/admin` (see `server/routes/`).
- **Integration**: Frontend communicates with backend via REST API calls to `/api/blog` and `/api/admin`.

## Developer Workflows
- **Frontend**:
  - Start dev server: `npm run dev` (in `client/`)
  - Build for production: `npm run build`
  - Lint: `npm run lint`
- **Backend**:
  - Start dev server: `npm run server` (uses nodemon)
  - Start production server: `npm start`
  - Environment variables in `server/.env`

## Conventions & Patterns
- **React Components**: Use functional components and hooks. Admin components are in `src/components/admin/` and pages in `src/pages/admin/`.
- **Routing**: Admin routes are nested under `/admin` and require authentication (see `App.jsx`).
- **API Calls**: Use `fetch` or `axios` from frontend to backend endpoints. Example: `fetch('/api/blog')`.
- **Database**: Mongoose models in `server/models/`. Blog schema is defined in `Blog.js`.
- **Image Uploads**: Handled via Multer middleware and ImageKit integration (`server/configs/imagekit.js`).
- **Auth**: JWT-based, middleware in `server/middleware/auth.js`.

## External Dependencies
- **Frontend**: React, Vite, Tailwind CSS, Quill, React Router
- **Backend**: Express, Mongoose, Multer, ImageKit, JWT, dotenv, cors

## Key Files & Directories
- `client/src/App.jsx`: Main app routing
- `client/src/components/`: UI components
- `client/src/pages/`: Page components
- `server/server.js`: Express app entry point
- `server/routes/`: API route definitions
- `server/models/Blog.js`: Blog data model
- `server/middleware/`: Auth and upload middleware
- `server/configs/`: DB and ImageKit config

## Example Patterns
- **Adding a Blog**: Frontend posts to `/api/admin/addblog`, backend handles with Multer and ImageKit, stores in MongoDB.
- **Admin Auth**: Login via `/api/admin/login`, JWT token required for protected routes.
- **Blog Listing**: Frontend fetches `/api/blog`, displays with `Bloglist` and `Blogcard` components.

---
Update this file if you introduce new workflows, conventions, or major dependencies. For questions, check referenced files and follow existing patterns.
