import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { MdOutlineSearch } from 'react-icons/md'
import { CiMenuKebab } from 'react-icons/ci'
import { BsArrowUp, BsArrowDown } from 'react-icons/bs'
import './health.scss'
import HealthChart from './HealthChart'

export const Systemhealth = () => {
    const userHealth = [
        {
            id: 1,
            healthTitle : "Total Users",
            healthData: "996K",
            healthRatio:" 32%",
            healthIcon: < BsArrowUp />,
            healthGroup: "Ascend"
        },
        {
            id: 2,
            healthTitle : "New Users",
            healthData: "96K",
            healthRatio:" 32%",
            healthIcon: < BsArrowUp />,
            healthGroup: "Ascend"
        },
        {
            id: 3,
            healthTitle : "Average Time on Platform",
            healthData: "00:12:26K",
            healthRatio:" 12%",
            healthIcon: < BsArrowDown />,
            healthGroup: "Descend"
        },
        {
            id: 4,
            healthTitle : "Active Now",
            healthData: "996K",
            healthRatio:" 32%",
            healthIcon: < BsArrowUp />,
            healthGroup: "Ascend"
        },
    ];

  return (
    <div className='vetting health'>
        <section className="vetting-header-section">
            <Link to={"/admindashboard"}>
                <BsArrowLeft style={{fontSize:"24px", color: "#444444"}}/>
            </Link>
            <div className="admin-search">
                <input type="search" placeholder='Search' />
                <MdOutlineSearch style={{fontSize:"28px", color: "#8E8E8E"}}/>
            </div>
            <CiMenuKebab style={{fontSize:"24px", color: "#444444"}}/>
        </section>
        <section className="user-health">
            <div className="user-health-container">
                {userHealth.map((health) => (
                    <div className="health-card" key={health.id}>
                        <div className="health-card-title">
                            <h5>{health.healthTitle}</h5>
                            <CiMenuKebab fontSize={10} />
                        </div>
                        <div className="health-data-container">
                            <p>{health.healthData}</p>
                            <div className={health.healthGroup === "Descend" ? "descend" : "ratio"}>
                                <p>{health.healthRatio}</p>
                                <span>{health.healthIcon}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        <section className="health-chart">
            <HealthChart />
        </section>
    </div>
  )
}
