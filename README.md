# 🌌 Stunning Cybernetic 3D Developer Portfolio

A responsive, high-performance, and visually breathtaking 3D Developer Portfolio tailored for **Yegoti Sai Thanush Kumar**—specialist in **AI & IoT Full-Stack Development**.

Built with a highly optimized modern stack, it features fluid glassmorphism, responsive 3D elements, dynamic scroll staggers, an integrated AI chatbot companion, and a secure mail contact form.

---

## ✨ Features Overview

### 1. 🌐 Interactive 3D Cyber Constellation (Three.js)
- A glowing wireframe icosahedron and a particle network canvas rendering on the background.
- **Mouse Tracking**: Tilts, warps, and rotates dynamically in reaction to your cursor position with smooth inertia (linear interpolation damping).
- **Scroll Parallax**: Moves, scales, and fades away into a deeper background layer as you scroll through other sections.
- Responsive dimensions adapt instantly on resizing window viewports.

### 2. 🤖 "Naina" AI Chatbot Assistant
- An interactive glassmorphic assistant bubble at the bottom right.
- Pre-loaded with quick-reply cards for **Projects** (Smart Pilgrimage, BankEye 360, KurukshetraMind), **Skills**, **Academics**, and **Contact Info**.
- **Keyword Matching Engine**: Seamlessly answers standard text questions about Sai's programming arsenal, education scores, or project details.
- Flows directly into email contact prompts.

### 3. 📧 Secure Contact Form (Web3Forms / Mailto Backup)
- Features elegant glassmorphic input fields with glowing neon focus states and dynamic status notifications.
- **Web3Forms Integration**: Delivers form submissions directly to your email (`yegotisaithanushkumar143@gmail.com`) seamlessly from client-side script.
- **Mailto Fallback**: Automatically opens the user's default email client if the API key is not configured, ensuring zero dropped messages!

### 4. 📄 Elegant Interactive Academics & Resume Download
- Timeline detailing internships (VLSI Design at Skill Dzire) and active leadership (Vice President of IETE Student Forum).
- Fully formatted, custom print-styled **Downloadable Resume Sheet** in the `public` folder. Clicking the download button opens a beautiful, professional layout ready to print or save as PDF in 1 click!
- Display of academic grades: B.Tech (8.69 CGPA), Intermediate (94%), SSC (99%).

---

## 🛠️ Technology Stack

- **Graphics**: [Three.js](https://threejs.org/) (WebGL)
- **Animations**: [GSAP](https://greensock.com/gsap/) (GreenSock) & IntersectionObserver
- **Bundler & Server**: [Vite](https://vite.dev/) (Vanilla JS Template)
- **Styling**: Vanilla CSS3 Custom Cyber Theme (Tailwind-Free)
- **Form Telemetry**: [Web3Forms API](https://web3forms.com/)

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Contact Mail Forwarding
1. Visit [Web3Forms](https://web3forms.com) and submit your email `yegotisaithanushkumar143@gmail.com` to receive a **free Access Key** instantly.
2. Duplicate `.env.example` and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Paste your Access Key into the `.env` file:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY="YOUR_KEY_HERE"
   ```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Production Build
```bash
npm run build
```
Generates ready-to-deploy static assets inside the `dist/` directory.

---

## 📂 Project Structure

```text
Portfolio-2/
├── public/
│   ├── Yegoti_Sai_Thanush_Kumar_Resume.html  <-- Downloadable print CV
│   └── developer_avatar.png                  <-- Cyberpunk avatar image
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── chatbot.js                        <-- "Naina" Chatbot logic & UI
│   │   ├── three-scene.js                    <-- Interactive Three.js particle core
│   │   └── contact.js                        <-- Web3Forms handler & fallbacks
│   ├── main.js                               <-- Entry script & GSAP scroll staggers
│   ├── resume-data.js                        <-- Central portfolio resume database
│   └── style.css                             <-- Core custom cyber styling
├── index.html                                <-- Landing page structural skeleton
├── package.json
└── README.md
```

Designed and Engineered with cybernetic perfection. 🌌
