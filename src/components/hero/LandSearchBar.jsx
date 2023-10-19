import React, { useState } from 'react'
import { GrFormClose } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import './sponsor.scss'

function LandSearchBar({placeholder, jobData}) {
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [dataEntered, setDataEntered] = useState("");

    const handleJobSearch = (e) => {
        const searchWord = e.target.value;
        setDataEntered(searchWord);
        const newFilter = jobData.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if(searchWord === "") {
            setFilteredJobs([]);
        } else {
            setFilteredJobs(newFilter);
        }
    };

    const clearSearch = () => {
        setFilteredJobs([]);
        setDataEntered("");
    };

  return (
    <div>
        <div className="search_icon">
            <input 
                type="text" 
                placeholder={placeholder}
                value={dataEntered}
                onChange={handleJobSearch}
            />
            <div className="search-close-icon">
                {filteredJobs.length === 0 ? ("") : (<GrFormClose id='close-icon'  onClick={clearSearch}/>)}
            </div>
        </div>
        {filteredJobs.length !== 0 && (
            <div className="searchResults">
                {filteredJobs.slice(0, 6).map((value) => {
                    return (
                        <div key={value.id} className='result-lists'>
                            <Link href={value.href} >
                                <p>{value.title}</p>
                            </Link>
                        </div>
                        
                    )
                })}
            </div>
        )}
    </div>
  )
}

export default LandSearchBar