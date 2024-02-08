import React from 'react'
import { employerUsers } from './usersdetails'
import { Link } from 'react-router-dom'

export default function EmployerDetailsCard() {
  return (
    <div className='app-users'>
        {employerUsers.map((user) => (
            <div className="user-card" key={user.id}>
                <div className="user-plan">
                    <span>{user.subPlan}</span>
                </div>
                <div className="user-contents">
                    <div className="user-pics-section">
                        {/* Conditionally display the restriction icon */}
                        {user.subGroup === "Reactivate" && (
                            <div className="user-pics restrict">
                                <img src={user.restricIcon} alt="Restriction-Icon" />
                            </div>
                        )}
                        <div className="user-pics">
                            <img src={user.userPics} alt={user.userName} />
                        </div>
                    </div>
                    <div className="user-details-contents">
                        <h5>{user.userName}</h5>
                        <p>{user.userType}</p>
                       <div className="user-link">
                        <Link to={`userdetail/${user.id}`}>{user.detailLink}</Link>
                       </div>
                    </div>
                </div>
                <div className="user-btn-section">
                    <button className={user.subGroup === "Reactivate" ? "reactivate-btn" : ""} >{user.subGroup === "Reactivate" ? "Reactivate Account" : "Suspend Account"}</button>
                </div>
            </div>
        ))}
    </div>
  )
}
