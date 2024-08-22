import React from 'react'
import styles from "/Users/user/Desktop/nxg-job-hub-frontend/src/pages/TermsAndCondition/index.module.scss"

const Section = ({title, subtitle, body, definition, bulletpoint}) => {
  return (
    <div>
    <h1 className={styles.heading}>{title}</h1>
    <h4 className={styles.subheading}>{subtitle}</h4>
    <p className={styles.body}>{body}</p>
    <h4 className={styles.subheading}>{definition}</h4>
    <ul className={styles.body}>
        {bulletpoint.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    
    </div>
  )
}

export default Section