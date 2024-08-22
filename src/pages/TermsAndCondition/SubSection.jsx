import React from 'react'
import styles from "/Users/user/Desktop/nxg-job-hub-frontend/src/pages/TermsAndCondition/index.module.scss"
const SubSection = ({subheading, list}) => {
  return (
    <div>
        <h4 className={styles.subheading}>{subheading}</h4>
        <ul className={styles.bulletlist}>
            {list.map((point, index)  => (
                 <li className={styles.bulletlist} key={index}>{point}</li>
                ))}
        </ul>

    </div>
  )
}

export default SubSection