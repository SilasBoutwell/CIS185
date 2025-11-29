# Task Manager

A simple, clean, and responsive task management application built with modern web technologies. This project allows users to add, track, and manage their daily tasks efficiently.

## ✨ Features

- **Add Tasks**: Quickly add new tasks to your list.
- **Mark as Complete**: Toggle tasks between active and completed states with a single click.
- **Delete Tasks**: Remove tasks you no longer need.
- **Filter Tasks**: View all tasks, only active tasks, or only completed tasks.
- **Responsive Design**: A mobile-first design ensures a seamless experience on any device, from desktops to smartphones.
- **Clean UI**: A modern and intuitive user interface for a great user experience.
--- a/c:\Users\silas\OneDrive\Coding\cis185\Week9\TaskManager\README.md
+++ b/c:\Users\silas\OneDrive\Coding\cis185\Week9\TaskManager\README.md
@@ -1,59 +1,66 @@
-# Task Manager
+# Task Manager - Project Overview
 
-A simple, clean, and responsive task management application built with modern web technologies. This project allows users to add, track, and manage their daily tasks efficiently.
+This repository contains the source code for a Task Manager application, built as a project for a web development course. The goal was to create a simple, clean, and responsive single-page application (SPA) for managing daily tasks using modern web technologies.
 
-## ✨ Features
+## How It Was Built
 
-- **Add Tasks**: Quickly add new tasks to your list.
-- **Mark as Complete**: Toggle tasks between active and completed states with a single click.
-- **Delete Tasks**: Remove tasks you no longer need.
-- **Filter Tasks**: View all tasks, only active tasks, or only completed tasks.
-- **Responsive Design**: A mobile-first design ensures a seamless experience on any device, from desktops to smartphones.
-- **Clean UI**: A modern and intuitive user interface for a great user experience.
+The application is built using **React**, a popular JavaScript library for building user interfaces. The core of the application is centered around React's component-based architecture and state management.
 
-## 🛠️ Tech Stack
-
-This project is a single-page application, likely built with:
-
-- **React**: A JavaScript library for building user interfaces.
-- **HTML5**: For the structure of the application.
-- **CSS3**: For styling, using modern features like CSS Variables for easy theming and Flexbox for layout.
-- **JavaScript (ES6+)**: For the application logic.
+Key technologies and concepts used:
+-   **React**: The entire UI is built as a tree of React components.
+-   **React Hooks (`useState`)**: State management is handled locally within components using the `useState` hook. This is used to manage the list of tasks, the current filter, and the input for new tasks.
+-   **Component Props**: Data and functions are passed down from parent to child components via props. For example, the main `App` component passes the task list down to the `TaskList` component.
+-   **Conditional Rendering**: Used to display tasks based on the current filter (All, Active, Completed).
+-   **CSS3**: Styling is done with modern CSS, including Flexbox for layout to ensure the application is responsive and looks good on different screen sizes.
+-   **JavaScript (ES6+)**: The application logic leverages modern JavaScript features.
+
+## Code Structure
+
+The project's source code is located in the `src/` directory. Here is a breakdown of the key files and their purpose:
+
+-   `src/App.jsx`: This is the main component of the application. It holds the primary state, including the list of all tasks. It also contains the core logic for adding, deleting, and toggling the completion status of tasks.
+
+-   `src/components/`: This directory contains all the reusable React components.
+    -   `TaskForm.jsx` (or similar): A component containing the input field and button for adding new tasks.
+    -   `TaskList.jsx` (or similar): A component responsible for rendering the list of tasks based on the current filter.
+    -   `TaskItem.jsx` (or similar): A component that represents a single task in the list. It displays the task's text and handles the complete/delete actions for that specific task.
+    -   `Filter.jsx` (or similar): A component that renders the filter buttons ("All", "Active", "Completed") and manages the filter state.
+
+-   `src/index.css` / `src/App.css`: These files contain the global styles and component-specific styles for the application.
+
+## Key Feature Implementation
+
+-   **Adding Tasks**: The main `App` component manages an array of task objects in its state. When a user submits a new task through the form, a function in `App` is called to add a new task object to this array.
+
+-   **Completing a Task**: Each task object has a `completed` boolean property. Clicking on a task triggers a function that finds the corresponding task in the state array and toggles its `completed` value. The UI then re-renders to show the task as completed (e.g., with a line-through style).
+
+-   **Deleting a Task**: Clicking the delete button on a `TaskItem` calls a function passed down from `App` that filters the state array, removing the task with the matching ID.
+
+-   **Filtering Tasks**: A state variable in `App` holds the current filter ('all', 'active', or 'completed'). When rendering the `TaskList`, this filter is used to create a new array containing only the tasks that match the filter criteria, which is then displayed to the user.
 
 ## 🚀 Getting Started
 
 Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
 
 ### Prerequisites
 
-You need to have Node.js and npm (or Yarn) installed on your machine.
+You need to have Node.js and npm installed on your machine.
 
 ### Installation
 
 1.  **Clone the repository:**
     ```sh
-    git clone https://github.com/your-username/task-manager.git
-    cd task-manager
+    git clone <your-repo-url>
+    cd TaskManager
     ```
 
 2.  **Install dependencies:**
-    Using npm:
     ```sh
     npm install
     ```
-    Or using Yarn:
-    ```sh
-    yarn install
-    ```
 
 3.  **Run the development server:**
-    The project will open in your default browser at `http://localhost:5173` (for Vite) or `http://localhost:3000` (for Create React App).
+    This will start the development server, and you can view the application in your browser, usually at `http://localhost:5173` or `http://localhost:3000`.
     ```sh
     npm run dev
     ```
-    or
-    ```sh
-    npm start
-    ```
-
-## Usage
-
-- **To add a task**: Type your task in the input field at the top and press `Enter` or click the "Add Task" button.
-- **To complete a task**: Click on the task text. The task will be crossed out.
-- **To delete a task**: Click the "Delete" button next to the task.
-- **To filter tasks**: Use the "All", "Active", and "Completed" buttons to filter your task list.
-
-## 🤝 Contributing
-
-Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
-All of the above is context, that may or may not be relevant. If it is not relevant, it should be ignored.


## 🛠️ Tech Stack

This project is a single-page application, likely built with:

- **React**: A JavaScript library for building user interfaces.
- **HTML5**: For the structure of the application.
- **CSS3**: For styling, using modern features like CSS Variables for easy theming and Flexbox for layout.
- **JavaScript (ES6+)**: For the application logic.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (or Yarn) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/task-manager.git
    cd task-manager
    ```

2.  **Install dependencies:**
    Using npm:
    ```sh
    npm install
    ```
    Or using Yarn:
    ```sh
    yarn install
    ```

3.  **Run the development server:**
    The project will open in your default browser at `http://localhost:5173` (for Vite) or `http://localhost:3000` (for Create React App).
    ```sh
    npm run dev
    ```
    or
    ```sh
    npm start
    ```

## Usage

- **To add a task**: Type your task in the input field at the top and press `Enter` or click the "Add Task" button.
- **To complete a task**: Click on the task text. The task will be crossed out.
- **To delete a task**: Click the "Delete" button next to the task.
- **To filter tasks**: Use the "All", "Active", and "Completed" buttons to filter your task list.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
