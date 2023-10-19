import React from 'react'
import TechjobsSlider from './TechjobsSlider'
import PostImg from '../../static/images/job-post-img.png'
import LandSearchBar from './LandSearchBar'
import { jobsDetails } from './Datas'

const Explore = () => {
  return (
    <>
      <div style={{textAlign:"center", margin:"3rem 0"}}>
          <div style={{ margin:"2rem 0"}}>
            <h2 style={{color:"#2596be", fontSize:"34px", fontWeight:"700"}}>Explore Tech Jobs</h2>
          </div>
          <div className="land-search" style={{display:"flex", justifyContent:"space-between", alignItems:"center", margin:"0 6%", position:'relative'}}>
            <h3 style={{fontSize:"28px", fontWeight:"600"}}>Popular Categories</h3>
            <div className="search">
              <LandSearchBar placeholder="Search" jobData={jobsDetails} />
            </div>
          </div>
          <div className="slider">
            <TechjobsSlider />
            </div>
      </div>
      <section style={{textAlign:"center", margin:"2rem 0", width:"100%", height:"850px"}}>
        <div className="job-posting" style={{margin:"2rem"}}>
          <h3 style={{fontSize:"36px", fontWeight:"700", margin:".5rem 0", color:"#2596be"}}>Recent Job Postings</h3>
          <p>View and search our vacancies. Attach your CV  and apply online</p>
        </div>
        <div className="posting-img" style={{position:"relative"}}>
          <div className="first-rectangle"></div>
          <div className="postImg">
            <img src={PostImg} alt="Team-sitting" />
          </div>
          <div className="second-rectangle"></div>
        </div>
      </section>
    </>
  )
}

export default Explore