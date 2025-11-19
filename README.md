Here is your README fully **rewritten professionally**, with smoother language, stronger structure, and a clean open-source tone — exactly like a real production GitHub project maintained by an experienced developer.

Your content is preserved, but the writing, formatting, and clarity are **significantly improved**.

---

# 📚 **BlogSpace — Modern Blogging Platform**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/blogspace)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.0+-61DAFB.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-38B2AC.svg)](https://tailwindcss.com/)
[![Appwrite](https://img.shields.io/badge/Appwrite-1.4+-FD366E.svg)](https://appwrite.io/)

**BlogSpace** is a modern, feature-rich blogging platform built with **React**, **Redux Toolkit**, and **Tailwind CSS**, powered by **Appwrite** for authentication, storage, and database operations. It offers a clean and responsive UI along with a powerful rich-text editor for content creation.

![BlogSpace Preview](./screenshots/homepage.png)

---

## ✨ Features

* 🔐 **Authentication** — Secure signup and login via Appwrite Auth
* ✍️ **Rich Text Editing** — Create beautiful content with TinyMCE
* 🖼️ **Image Uploading** — Appwrite storage integration for featured images
* 📝 **Full CRUD Support** — Create, edit, update, and delete blog posts
* 📱 **Responsive Design** — Optimized for mobile, tablet, and desktop
* 🔒 **Protected Pages** — Access control with a custom AuthLayout
* 🎨 **Modern UI** — Built with Tailwind CSS + smooth UX enhancements
* ⚡ **High Performance** — Vite-powered development
* 🔄 **State Management** — Redux Toolkit for fast, predictable state handling
* 🔍 **Search System** — Quickly find posts
* 🏷️ **Post States** — Manage draft/published content

---

## 🛠️ Tech Stack

| Technology          | Purpose                     |
| ------------------- | --------------------------- |
| **React**           | Frontend UI                 |
| **Vite**            | Build tooling               |
| **Redux Toolkit**   | Global state management     |
| **Tailwind CSS**    | Styling                     |
| **TinyMCE**         | Rich text content editor    |
| **Appwrite**        | Backend (Auth, DB, Storage) |
| **React Router**    | Client-side routing         |
| **React Hook Form** | Form handling               |

---

## 📁 Project Structure

```
blogspace/
├── public/
├── src/
│   ├── appwrite/
│   │   ├── auth.js
│   │   └── config.js
│   ├── component/
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── pages/
│   │   ├── Post-form/
│   │   ├── AuthLayout.jsx
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── PostCard.jsx
│   │   ├── Container.jsx
│   │   ├── Logo.jsx
│   │   ├── RTE.jsx
│   │   └── index.js
│   ├── conf/
│   │   └── conf.js
│   ├── store/
│   │   ├── authSlice.js
│   │   └── store.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.sample
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### **Prerequisites**

* Node.js v16+
* npm or yarn
* Appwrite project

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/Blog_project.git
   cd Blog_project
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create environment variables**

   ```bash
   cp .env.sample .env
   ```

4. **Update `.env` values**

   ```env
   VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   VITE_TINYMCE_API_KEY=your_tinymce_api_key
   ```

5. **Start development server**

   ```bash
   npm run dev
   ```

6. Open your browser → **[http://localhost:5173](http://localhost:5173)**

---

## ⚙️ Appwrite Setup Guide

### 1. **Create Project**

* Open Appwrite → create a new project
* Copy project ID

### 2. **Enable Authentication**

* Go to `Auth`
* Enable **Email/Password**

### 3. **Create Database & Collection**

* Create DB → Collection: `posts`
* Add fields:

| Field         | Type   | Required |
| ------------- | ------ | -------- |
| title         | String | Yes      |
| slug          | String | Yes      |
| content       | String | Yes      |
| featuredImage | String | No       |
| status        | String | Yes      |
| userId        | String | Yes      |

* Set permissions appropriately

### 4. **Configure Storage**

* Create bucket for images
* Allow user create/read/update/delete

### 5. **Add Platform**

* Add **Web App**
* Set hostname to: `localhost`

---

## 📜 Available Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview build
npm run lint      # Linting
```

---

## 📸 Screenshots

### Homepage

![Homepage](./screenshots/homepage.png)

### Create Post

![Create Post](./screenshots/create-post.png)

### Post View

![Post View](./screenshots/post-view.png)

### Mobile Responsive

![Mobile View](./screenshots/mobile-view.png)

---

## 🔧 Additional Configuration

### **TinyMCE Setup**

TinyMCE runs in **GPL mode** locally.
For production:

1. Request a free TinyMCE API key
2. Add to `.env`
3. Update editor config

### **Tailwind Customization**

Modify `tailwind.config.js`:

```js
theme: {
  extend: {
    // custom styles here
  },
}
```

---

## 🤝 Contributing

We welcome contributions!

1. **Fork the project**
2. Create your feature branch:

   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit changes:

   ```bash
   git commit -m "Add new feature"
   ```
4. Push branch:

   ```bash
   git push origin feature/new-feature
   ```
5. Open a pull request

---

## 🐛 Known Issues

* Minor TinyMCE styling conflicts on specific browsers
* Upload progress UI can be improved
* Search functionality can include filtering

---

## 🔮 Roadmap

* Comments system
* User profiles
* Post categories/tags
* Sharing options
* SEO improvements
* Admin dashboard

---

## 📄 License

This project is distributed under the **MIT License**.
See [`LICENSE`](LICENSE) for details.

---

## 🙏 Acknowledgments

* **Appwrite** — backend infrastructure
* **TinyMCE** — content editor
* **Tailwind CSS** — UI styling
* **React + Vite** — frontend stack

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/yourusername">Your Name</a></p>
  <p>⭐ If you find this project useful, please consider giving it a star!</p>
</div>

---

