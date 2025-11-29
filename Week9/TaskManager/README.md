# Task Manager

This project is a simple web app for managing daily tasks. It was built as part of a class assignment to demonstrate how core features of a task manager can be implemented.

## 🔑 What the App Does
- **Add Tasks** – Type a task and add it to the list.  
- **Mark Complete** – Click a task to toggle between active and completed.  
- **Delete Tasks** – Remove tasks you don’t need anymore.  
- **Filter Tasks** – Switch views between *All*, *Active*, and *Completed* tasks.  

## ⚙️ How It Works
- The app keeps track of tasks in a list stored in state.  
- Each task is an object with text and a `completed` property.  
- Adding a task creates a new object and adds it to the list.  
- Clicking a task flips its `completed` value (true/false).  
- Deleting a task removes it from the list by filtering it out.  
- Filtering is done by checking the `completed` property and showing only tasks that match the selected filter.  
- The interface updates automatically whenever the state changes, so the task list always reflects the latest actions.  
