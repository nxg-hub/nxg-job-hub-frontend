import React from 'react'
import AdminSidebar from './Sidebar'
import './adminstyle.scss'
import { Outlet } from 'react-router'

function Admin() {
  return (
    <>
        <div className='admin-container'>
            <AdminSidebar />
          <div className="admin-main">
            <Outlet/>
          </div>
        </div>
    </>
  )
}

export default Admin