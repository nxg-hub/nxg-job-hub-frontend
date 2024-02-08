import React, { useState} from 'react'
import Logo from '../../../static/images/nxg-logo.png'
import { PiUserCircle, PiShieldCheck, PiFileTextDuotone } from 'react-icons/pi'
import { Health, Job, Logout } from '../../../pages/Dashboard/TechTalent/Sidebar/SidebarIcons'
import { NavLink, useNavigate } from 'react-router-dom'
import { Dialog } from '@headlessui/react'
import '../adminstyle.scss'

function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const menuItem = [
        {
          path: "dashboard",
          name: "User Management",
          icon: <PiUserCircle />
        },
        {
          path: "jobmanagement",
          name: "Job Management",
          icon: <Job />
        },
        {
          path: "vetting",
          name: " Vetting Oversight",
          icon: <PiShieldCheck />
        },
        {
          path: "payments",
          name: "Payment & Transactions",
          icon: <PiFileTextDuotone />
        },
        {
          path: "health",
          name: "System Health",
          icon: <Health />
        }
    ];

    const moveToDashboard = () => {
        navigate("/dashboard");
        setIsOpen(false);
      };

    const handleLogout = () => {
        // Clear user authentication information
        localStorage.removeItem("NXGJOBHUBLOGINKEYV1");
    
        // Navigate to the login page
        navigate("/login");
    }

  return (
    <div className='sidebar-main'>
        <div className="side-logo">
            <img src={Logo} alt="Nxg-logo" />
        </div>
        <div className="menu-icons-container">
            {menuItem.map((item, index) => (
            <NavLink end to={item.path} key={index} className="dashboardItem">
                <div>{item.icon}</div>
                <p>{item.name}</p>
            </NavLink>
            ))}
        </div>
        <NavLink
            className="Logout"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div><Logout /></div>
            <p> Logout </p>
        </NavLink>
      {/* Render the LogoutModal component if showLogoutModal is true */}
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "800px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#ffffff",
            border: "none",
            borderRadius: "24px",
            padding:"2rem 1rem",
            zIndex: "100"
          }}
        >
          <Dialog.Panel>
            <Dialog.Title style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: "40px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                Are you sure you want to logout?
              </p>
              <div
                style={{
                  width: "100%",
                  display: "block",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  margin: "3rem auto",
                }}
              >
                <button
                  onClick={moveToDashboard}
                  style={{
                    width: "100%",
                    maxWidth: "580px",
                    padding: "8px",
                    background: "#006A90",
                    border: "none",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "25px",
                    fontWeight: "500",
                    margin: "2.5rem 0",
                  }}
                >
                  Back To Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    maxWidth: "580px",
                    padding: "8px",
                    background: "#006A90",
                    border: "none",
                    borderRadius: "10px",
                    color: "#fff",
                    fontSize: "25px",
                    fontWeight: "500",
                  }}
                >
                  Continue To Logout
                </button>
              </div>
            </Dialog.Title>
          </Dialog.Panel>
        </Dialog>
      )}
    </div>
  )
}

export default AdminSidebar