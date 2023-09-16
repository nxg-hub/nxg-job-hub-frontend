import React, {useState} from 'react';

import MultiSelect from './MultiSelect';

export const JobForms = () => {
    const [coverLetter, setCoverLetter] = useState('');
    const [portfolioLink, setPortfolioLink] = useState('');

    

  return (
    <main>
        <div className="left">
            <MultiSelect />
            <div className="letter">
                <label>Write Cover Letter</label>
                <textarea 
                    value={coverLetter}
                    cols="10" rows="5"
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder='Write your cover letter'
                 ></textarea>
            </div>
            <div className="portfolio">
                <label>Insert Portfolio/Linkedin Link</label>
                <input 
                    type="url" 
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    placeholder='Insert link'
                />
            </div>
        </div>
    </main>
  )
}
