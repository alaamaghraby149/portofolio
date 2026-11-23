# Alaa Ayman — Personal Portfolio Website

A production-quality personal portfolio website designed and developed for **Alaa Ayman**, Full-Stack Developer specializing in **Node.js** and **Angular**.

Built with **HTML5**, **Tailwind CSS**, and modern **Vanilla JavaScript (ES6+)**.

---

## 🌟 Live Demo & Quick Highlights

- **Visual Aesthetic:** Futuristic developer aesthetic with deep navy surfaces (`#060A13`, `#0B1325`, `#1B365D`), cyber blue accents (`#005A9C`), glowing cyan highlights (`#60C1E5`), subtle glassmorphism, and smooth micro-interactions.
- **Theme System:** Tri-state theme manager (**Dark**, **Light**, **System**). Default starts on **System** following `prefers-color-scheme` automatically, with persistence in `localStorage`.
- **Hero & Animations:** Animated role typing cycling through *Full-Stack Developer*, *Node.js Developer*, and *Angular Developer*; interactive constellation/particle canvas with mouse repulsion; desktop custom cursor follower; and 3D card tilt.
- **Accessible & Responsive:** Fully responsive from 320px mobile screens to 4K displays with sticky navigation, active section scroll spy, mobile slide drawer, and `prefers-reduced-motion` compliance.
- **Complete Sections:** Home, About, Education, Experience, Skills, Projects, Testimonials (sample placeholders), Contact (Formspree integration structure), and Footer.

---

## 📁 Project Architecture

```
portofolio/
├── index.html                 # Main semantic HTML5 single-page application
├── package.json               # Dependencies and build scripts
├── tailwind.config.js         # Custom theme colors, fonts, animations, keyframes
├── postcss.config.js          # PostCSS configuration for Tailwind & Autoprefixer
├── .gitignore                 # Node modules and temporary build exclusions
├── README.md                  # Complete documentation and configuration guide
├── src/
│   ├── css/
│   │   └── input.css          # Tailwind directives, CSS variables, glassmorphism styles
│   └── js/
│       ├── main.js            # App entry point & global event orchestrator
│       ├── theme.js           # Dark/Light/System theme switcher with OS listener
│       ├── navigation.js      # Sticky navbar, scroll spy, mobile drawer & progress bar
│       ├── animations.js      # Typing effect, particle canvas, 3D tilt & cursor
│       └── contact.js         # Contact form validation & Formspree email submission
├── dist/
│   └── css/
│       └── style.css          # Production-compiled, minified Tailwind CSS bundle
└── assets/
    ├── images/
    │   ├── favicon.svg        # Modern developer monogram favicon (<AA/>)
    │   ├── profile-placeholder.svg # High-aesthetic profile image placeholder
    │   ├── project-instagram.svg   # Instagram Clone UI preview visual
    │   ├── project-ecommerce-api.svg # E-commerce REST API architecture preview
    │   └── project-shop.svg   # E-commerce Shop storefront preview
    └── cv/
        └── Alaa_Ayman_CV.pdf  # Downloadable CV document placeholder
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your system.

### 2. Installation
Open your terminal in the project directory and install the development dependencies:
```bash
npm install
```

### 3. Local Development
Run the local live-reloading server:
```bash
npm run dev
```
This serves the website at `http://localhost:3000` with live browser reloading.

In a separate terminal window, if you want Tailwind CSS to watch for file changes during development:
```bash
npm run watch:css
```

### 4. Production Build
Compile and minify the production stylesheet:
```bash
npm run build
```
This generates the optimized `dist/css/style.css` file.

---

## ⚙️ Configuration & Customization Guide

### 1. Connecting the Contact Form to Formspree
The contact form is pre-configured to deliver messages to **aymalaaan11@gmail.com** using [Formspree](https://formspree.io).

**Steps to activate email delivery:**
1. Sign up for a free account at [https://formspree.io](https://formspree.io).
2. Click **+ New Form**, enter the form name (e.g. *Alaa Ayman Portfolio Contact*), and set the target recipient email to:
   ```
   aymalaaan11@gmail.com
   ```
3. Formspree will give you an endpoint URL such as:
   `https://formspree.io/f/xbjnvkzw`
4. Open [src/js/contact.js](file:///d:/projects/portofolio/src/js/contact.js#L14) and update the `FORMSPREE_ENDPOINT` constant:
   ```javascript
   // Replace 'YOUR_FORMSPREE_FORM_ID' with your actual form ID
   export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xbjnvkzw';
   ```
5. Save the file. All form submissions will now be delivered directly to your inbox with validation and real-time feedback.

---

### 2. Replacing the Profile Image
- The current profile image placeholder is located at:
  `assets/images/profile-placeholder.svg`
- To use your real photograph:
  1. Place your photo file (JPG, PNG, or WebP) inside `assets/images/` (e.g., `assets/images/profile.jpg`).
  2. Open [index.html](file:///d:/projects/portofolio/index.html#L215) and update the image `src`:
     ```html
     <img 
       src="assets/images/profile.jpg" 
       alt="Alaa Ayman - Full-Stack Developer" 
       class="w-full h-auto aspect-square object-cover rounded-2xl shadow-inner hover:scale-[1.02] transition-transform duration-500"
     >
     ```

---

### 3. Updating the Downloadable CV
- The downloadable CV file is located at:
  `assets/cv/Alaa_Ayman_CV.pdf`
- Simply replace this file with your updated PDF resume using the same filename `Alaa_Ayman_CV.pdf`, or point the download buttons in `index.html` to your new resume file.

---

### 4. Updating Project Repositories & Live Demos
In [index.html](file:///d:/projects/portofolio/index.html#L470-L650), each project card features dedicated **GitHub** and **Live Demo** buttons:
- **Instagram Clone:**
  - GitHub link: `https://github.com/alaamaghraby149` (update to repository URL when published)
  - Live Demo link: currently scrolls to `#contact` or update to live deployment URL (e.g., Vercel / Netlify)
- **E-commerce API:**
  - GitHub link: `https://github.com/alaamaghraby149`
  - API Demo link: currently scrolls to `#contact` or update to Swagger/Postman documentation
- **Shop:**
  - GitHub link: `https://github.com/alaamaghraby149`
  - Live Demo link: currently scrolls to `#contact` or update to live store demo URL

---

### 5. Updating Social Links & Contact Details
To update social media URLs or email addresses, they are organized in the following locations:
- **Email:** `aymalaaan11@gmail.com` (Hero, Contact Section, Footer)
- **GitHub:** `https://github.com/alaamaghraby149` (Hero, Projects, Contact, Footer)
- **LinkedIn:** `https://www.linkedin.com/in/alaa-maghraby` (Hero, Contact, Footer)

---

## 🎨 Color Palette Reference

| Name | Dark Mode Value | Light Mode Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary** | `#1B365D` (Dark Navy) | `#60C1E5` (Cyan) | Brand foundation & accents |
| **Secondary** | `#005A9C` (Deep Blue) | `#005A9C` (Deep Blue) | Supporting buttons & gradients |
| **Accent** | `#60C1E5` (Vibrant Cyan) | `#005A9C` (Deep Blue) | Glowing highlights & focus rings |
| **Background** | `#060A13` / `#0B1325` | `#F8FAFC` / `#FFFFFF` | Base page & surface cards |
| **Main Text** | `#F8FAFC` (Near White) | `#0B1325` (Deep Navy) | Headings & primary typography |
| **Muted Text**| `#94A3B8` (Soft Gray) | `#64748B` (Muted Slate)| Descriptions & metadata |

---

## 🛠️ Verification & Quality Checklist

- [x] HTML5 Semantic Structure (no missing tags, valid landmark roles).
- [x] Responsive layout across 320px, 768px, 1024px, 1440px+ screens.
- [x] Dynamic OS and manual theme switching (Dark / Light / System).
- [x] Zero console errors.
- [x] No broken links (every internal anchor links to an existing section ID).
- [x] No missing assets or 404 images.
- [x] Respects `prefers-reduced-motion` for accessibility.
- [x] Formspree form submission pipeline with live client-side validation.
- [x] No fake statistics or fabricated endorsements.
