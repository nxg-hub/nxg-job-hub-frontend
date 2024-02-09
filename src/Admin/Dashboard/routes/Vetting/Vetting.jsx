import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { MdOutlineSearch } from 'react-icons/md'
import { CiMenuKebab } from 'react-icons/ci'
import { usersToVet, vettedUsers } from '../AdminOverview/usersdetails/usersdetails'
import './vetting.scss'

export default function Vetting() {
    const navigate = useNavigate()
    const handleReview = (id) => {
        navigate(`../review-talent/${id}`)
}
  return (
    <div className='vetting'>
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
        <section className="vetting-contents">
            <div className="tobe-vetted">
                {usersToVet.map((user) => (
                    <ul key={user.id}>
                        <li>{user.userName}</li>
                        <div className="vet-btns">
                            <button onClick={()=>handleReview(user.id)}>Review</button>
                        </div>
                    </ul>
                ))}
            </div>
            <div className="vetted">
                {vettedUsers.map((user) => (
                        <ul key={user.id}>
                            <li>{user.userName}</li>
                            <p>Vetted</p>
                        </ul>
                    ))}
            </div>
        </section>
    </div>
  )
}
