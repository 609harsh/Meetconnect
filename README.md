<div align="center">
  <img src="./client/public/Jobsy (1).svg" alt="Jobsy" height="200px">
</div>

# JOBSY - One Stop Platform during Your Job Hunt

Objective:
Jobsy is a full-stack project designed to streamline job application management. It features an interactive interviews dashboard, a Kanban-style board to track interview statuses, a digital and shareable resume profile builder, and free resources to aid interview preparation

![Jobsy](https://res.cloudinary.com/dpklosu5v/image/upload/v1735280474/u7rdym40zoey5aswnniv.png)

Hosted URL's-

- Client URL: https://jobsy-one.vercel.app/
- API Url: https://meetconnect-ua6j.onrender.com
- API documentation:https://documenter.getpostman.com/view/32342391/2sAYJ4hfaN

⚠️ Note- Render Spins down the webservice after periods of inactivity, which can delay requests by 50 seconds or more.

## Features and Functionality

1. **Interview Dashboard:** Manage interviews and organize them into live, upcoming, and past categories.
2. **Kanban-style Board:** Visualize and update job application statuses for a more intuitive experience than traditional spreadsheets.
3. **Shareable Resume Profile:** Create a public resume profile with a photo, making sharing with connections seamless.
4. **Career Resources:** Access free tools and materials to prepare for interviews.
5. **Simple Onboarding:** User-friendly signup/login with custom designs and support for Google authentication for passwordless access.
6. **Performance Optimizations:** SVG and WebP image formats for faster loading; optimized CRUD operations for efficient database reads/writes.
7. **Robust Security:** JWT-based authentication, hashed password storage, and secured protected routes.
8. **Responsive Design:** Ensures a flawless experience across devices.
9. **Validation:** Comprehensive form field validation for error-free input.
10. **Modular coding** support where project is broken down into multiple small reusable components.

## Tech Stack

1. **Frontend**

- Vite, ReactJS, TailwindCSS, TypeScript
- Libraries: Redux Toolkit, RTK Query, React DND Kit, Swiper, React Toastify, React Select, Heroicons

2. **Backend & Database**

- Node.js, Express.js, Prisma, MongoDB
- Libraries: bcryptjs, Nodemon, dotenv

3. **Hosting & Tools**

- Vercel (Frontend), Render (Backend), Postman (API testing), Git/GitHub, VSCode

### Screenshots

![InterviewDashboard](https://res.cloudinary.com/dpklosu5v/image/upload/v1735282841/rdkgmonr6u9obhnwff35.png)
![JobBoard](https://res.cloudinary.com/dpklosu5v/image/upload/v1735282847/kufzrxey0x3f6ltx1zsx.png)
![Resources](https://res.cloudinary.com/dpklosu5v/image/upload/v1735282836/vn1pxjx5usxc0bldd4hc.png)
![Profile](https://res.cloudinary.com/dpklosu5v/image/upload/v1735282728/omng8n92l4ogiy2kji0h.png)

# Project Structure

```bash
├───client
│   ├───public
│   └───src
│       ├───components
│       │   ├───Interview
│       │   ├───Profile
│       │   └───Tracker
│       ├───icons
│       ├───pages
│       └───redux
│           └───ApiSlice
└───server-api
    ├───prisma
    └───src
        ├───controllers
        ├───routes
        └───services
```

## Future Works

- **Dark mode** for improved user experience.
- **Resume parser** for automated profile creation.
- **Password recovery** functionality.
- **AI-driven** tools for career resources.
- **Enhancing drag-and-drop** features and improving UI/UX responsiveness.

## Installation

#### Git Clone

```
https://github.com/609harsh/Meetconnect.git
```

#### Client Folder env

```
VITE_API_HOST=
VITE_CLOUDINARY_API_KEY=
VITE_CLOUDINARY_API_SECRET=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

### Server Folder env

```
PORT=3000
DATABASE_URL=
TOKEN_SECRET=
TOKEN_VALIDITY=
DOCUMENTATION_URL=
```

#### Run npm install
```
npm install

cd .\Meetconnect\client\
npm install

cd .\Meetconnect\server-api\
npm install
```
#### Go to client folder

```
cd .\Meetconnect\client\
```

#### Start client

```
npm run dev
```

#### Go to server-api folder

```
cd .\Meetconnect\server-api\
```

#### Start API

```
npm run dev
```
