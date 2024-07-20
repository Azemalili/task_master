import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{width: '90%',marginLeft: '5%', textAlign: 'center', marginTop: '150px', fontSize: '25px'}}>
      <h1 style={{fontSize: '60px', marginBottom: '50px'}}>Task Master</h1>
      Welcome to TASK MASTER, your ultimate productivity companion designed to help you stay organized and on top of your tasks. Whether you’re managing personal projects, work assignments, or daily chores, TASK MASTER simplifies your to-do list and ensures nothing slips through the cracks. With a user-friendly interface and robust features, you can easily create, edit, and prioritize tasks, setting due dates and reminders to keep you on track. Our intuitive drag-and-drop functionality allows for effortless task organization, while customizable categories help you tailor your to-do lists to suit your unique needs. Stay motivated with progress tracking and visual indicators that show how close you are to completing your goals. TASK MASTER also offers seamless synchronization across all your devices, ensuring you can access and update your task list anytime, anywhere. Collaborate with others by sharing tasks and lists, making it perfect for team projects and family planning. With built-in notifications and alerts, you’ll never miss a deadline or important task again. Start using TASK MASTER today and transform the way you manage your time and responsibilities. Achieve more, stress less, and master your tasks with TASK MASTER.
    </div>
  )
}
