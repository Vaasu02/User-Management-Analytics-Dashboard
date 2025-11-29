# User Management & Analytics Dashboard

A responsive, admin-style dashboard built with React, TypeScript, and TailwindCSS. This project features a comprehensive user management system and an analytics overview, demonstrating modern frontend development practices.

## 🚀 How to Run

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 🛠️ Libraries & Tech Stack

*   **Core**: React 18, TypeScript, Vite
*   **Styling**: TailwindCSS v4, `clsx`, `tailwind-merge`
*   **State Management**: Zustand (Global store for users and theme)
*   **Routing**: React Router DOM v6
*   **Forms & Validation**: React Hook Form, Zod
*   **Charts**: Recharts
*   **Icons**: Lucide React

## 🏗️ Architecture Choices

*   **Feature-Based Folder Structure**: Code is organized by features (`features/users`, `features/analytics`) rather than just technical layers, making it scalable and easier to maintain.
*   **Global State with Zustand**: Chosen for its simplicity and minimal boilerplate compared to Redux. It handles user data, filtering, sorting, and theme persistence.
*   **Reusable UI Components**: Built a set of atomic components (`Button`, `Card`, `Input`, `Modal`, `Table`) in `components/ui` to ensure consistency and speed up development.
*   **Mock Data Layer**: Implemented a robust mock data generator (`lib/mockData.ts`) to simulate a real backend, including realistic user profiles and activity logs.
*   **Dark Mode Strategy**: Implemented using Tailwind's `darkMode: 'class'` strategy with a persisted Zustand store, allowing users to toggle themes manually.

## ✨ Key Features

1.  **Users List**
    *   Paginated table with server-side simulation.
    *   Real-time **Debounced Search** and Status Filtering.
    *   **Sorting** by Name and Date.
    *   Responsive layout for mobile devices.

2.  **User Details**
    *   Detailed profile view with activity history.
    *   **Edit Modal** with form validation to update user details.

3.  **Analytics Dashboard**
    *   Interactive charts for User Growth and Status Distribution.
    *   Key metrics summary cards.

4.  **Bonus Features Implemented**
    *   ✅ Dark Mode Toggle
    *   ✅ Debounced Search
    *   ✅ Skeleton Loaders
    *   ✅ Form Validation (Zod)
    *   ✅ Proper Folder Architecture
    *   ✅ TypeScript
