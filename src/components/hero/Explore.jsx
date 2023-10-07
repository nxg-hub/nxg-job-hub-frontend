import React from 'react'

const Explore = () => {
  return (
    <div style={{textAlign:"center", margin:"2rem 0"}}>
        <div className="explore-title">
            <h2 style={{color:"#2596be", fontSize:"38px", fontWeight:"700"}}>Explore Tech Jobs</h2>
        </div>
        <div className="land-search" style={{display:"flex", justifyContent:"space-between", alignItems:"center", margin:"2% 6%"}}>
          <h3 style={{fontSize:"28px", fontWeight:"600"}}>Popular Categories</h3>
          <div className="search">
            <input 
              style={{textAlign:"center", padding:"8px 0", border:"1px", background:"#f0f0f0", color:"#000000", fontSize:"18px", fontWeight:"400",  borderRadius:"1px solid #f0f0f0"}}
              type="search" 
              name="search" 
              id="search" 
              placeholder='Search' 
            />
          </div>
        </div>
        <div className="slider">Put carousels here</div>
        <section>
          <div className="job-posting">
          <h3 style={{fontSize:"28px", fontWeight:"700"}}>Recent Job Postings</h3>
          <p>View and search our vacancies. Attach your CV  and apply online</p>
          </div>
        </section>
    </div>
  )
}

export default Explore