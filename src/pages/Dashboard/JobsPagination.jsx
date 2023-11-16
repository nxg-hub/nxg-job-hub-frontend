import React from 'react';
import { LiaGreaterThanSolid, LiaLessThanSolid } from 'react-icons/lia';

function JobsPagination({ page, setPage, hasNextPage}) {
    function adjustPage (amount) {
        setPage(prevPage => prevPage + amount)
    }

  return (
    <div style={{display:'flex', alignItems:'center'}}>
        {page !== 1 && 
            <div className="pagination-previous" onClick={() => adjustPage(-1)}>
                <LiaLessThanSolid className='pagination-icons'/>
            </div>
        }
        
        {page !== 1 && 
            <div className="pagination-item" onClick={() => setPage(1)}>
             {page - 1}
            </div>
        }
        <div className="pagination-item active-item">
            {page}
        </div>
        {hasNextPage && 
            <div className="pagination-item" onClick={() => adjustPage(1)}>
                {page + 1}
            </div>        
        }
       {hasNextPage && 
         <div className="pagination-next" onClick={() => adjustPage(1)}>
            <LiaGreaterThanSolid className='pagination-icons'/>
        </div>
       }
    </div>
  )
}

export default JobsPagination