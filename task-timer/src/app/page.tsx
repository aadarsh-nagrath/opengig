"use client"; 

import TaskForm from "@/components/task-form";
import TaskList from "@/components/task-list";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Task Timer</h1>
      <TaskForm onTaskAdded={() => location.reload()} />
      <TaskList />
    </div>
  );
}
