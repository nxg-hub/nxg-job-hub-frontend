import React, { useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { talentUsers, recuritter } from './usersdetails'
import '../../../adminstyle.scss'

export default function UserDetailedLink() {
    const {id} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        const userId = parseInt(id, 10);
        const techUser = talentUsers.find((user) => user.id === userId);
        setUser(techUser || {})
    }, [id]);

  return (
    <div className='admin-main'>
        <Link to={"/admindashboard"} style={{display:"flex", alignItems:"center", gap:"5px", fontSize:"12px", fontWeight:"400", color:"#000", margin:"0 0 1rem 1rem", paddingTop:".5rem"}}>
            <BsArrowLeft style={{fontSize:"26px"}}/>
            <span>Back</span>
        </Link>
        <section className="user-details-container">
            {user && (
                <div className="user-picsContent">
                    <div className="user-pics-container">
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
                        <div className="user-pics-detail">
                            <p>Name : <span>{user.userName}</span></p>
                            <p>Date Joined : <span>{user.userDate}</span></p>
                            <p>Subscription : <span>{user.subPlan}</span></p>
                        </div>
                    </div>
                    <div className="user-btn-section">
                        <button className={user.subGroup === "Reactivate" ? "reactivate-btn" : ""} >{user.subGroup === "Reactivate" ? "Reactivate Account" : "Suspend Account"}</button>
                    </div>
                </div>
            )}
        </section>
        <section className="application">
            <div className="contracts user-jobs">
                <h5>Number of Job Applications</h5>
                <p>49</p>
            </div>
            <div className="contracts">
                <h5>Number of Contracts Secured</h5>
                <p>49</p>
            </div>
            <div className="contracts">
                <h5>Number of Contracts Delievered</h5>
                <p>49</p>
            </div>
        </section>
        <section className="history">
            <h4>History</h4>
            <div className="employer-history">
                {recuritter.map((recurit) => (
                    <div className="active-employer" key={recurit.id}>
                        <div className="employer-section">
                            <div className="employer-logo">
                                {recurit.companyLogo}
                            </div>
                            <h5>{recurit.companyName}</h5>
                        </div>
                        <p>{recurit.userType}</p>
                        <Link>
                        <span>{recurit.companyDetails}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    </div>
  )
}
