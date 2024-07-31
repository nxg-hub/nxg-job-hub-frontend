import React from 'react'
import styles from './index.module.scss'
const FaqItem = ({title, body}) => {
  return (
    
    <div className = {styles.faqItem}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.body}>{body}</p>
    </div>
  )
}

export default FaqItem;