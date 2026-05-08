# 🚀 Laravel + React JSX Starter Kit

## 🧩 Introduction
This is a **JSX-based version** of the Laravel React Starter Kit.  
It provides a modern and minimalist setup for building **Laravel applications** with a **React frontend** using **Inertia.js**.

Unlike the original version, this kit removes **TypeScript** and uses plain **JavaScript** (`.jsx` instead of `.tsx`), making it easier for developers who prefer JavaScript over TypeScript.

This kit includes **React 19**, **JavaScript**, **TailwindCSS 4**, and modern UI libraries like **shadcn/ui** and **Radix UI** to help you build fast and beautiful applications.

---

## 🎯 Features

✅ **React 19 + JSX** – No TypeScript, just JavaScript  
✅ **Laravel 12** – Backend power with the latest Laravel features  
✅ **Inertia 2** – Seamless single-page app experience  
✅ **TailwindCSS 4 + ShadCN** – Modern UI components  
✅ **Vite** – Super-fast development with hot module replacement (HMR)  
✅ **Testing Support** – PHPUnit & Pest included  
✅ **Zero Configuration Required** – Just install and start coding!  

---

## 🛠 Installation

### 1️⃣ Create your project
Installation can be done using the **Laravel Installer**:
```bash
laravel new --using=YazidKHALDI/react-jsx-starter-kit react-jsx-app
2️⃣ Install dependencies
bash
Copier le code
cd react-jsx-app
composer install
npm install
3️⃣ Setup environment
Copy the .env.example file and generate your application key:

bash
Copier le code
cp .env.example .env
php artisan key:generate
4️⃣ Run database migrations
bash
Copier le code
php artisan migrate --seed
5️⃣ Start the development environment
bash
Copier le code
composer dev
Your app is now running at http://localhost:8000 🎉

📚 Official Documentation
📖 Documentation for all Laravel starter kits can be found on the Laravel website.
You can also check out the documentation for:

Inertia.js

TailwindCSS

Shadcn UI

Radix UI

🤝 Contributing
Thank you for considering contributing to our starter kit!
You can open issues or pull requests directly on GitHub.

Please refer to the official Laravel Contribution Guide before submitting.

📜 Code of Conduct
To ensure that the Laravel community remains welcoming to all, please review and abide by the Code of Conduct.

⚖️ License
The Laravel + React JSX Starter Kit is open-sourced software licensed under the MIT license.







