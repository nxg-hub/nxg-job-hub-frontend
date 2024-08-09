import React from "react";
import Container from "../../../components/Container/Container";
import styles from '../Help/index.module.scss'
import Accordion from "./Accordion/Accordion";
const Help = () => {
  return <Container> 
    <div className={styles.helpContainer}>
    
      <p>Account Setup and Management</p>
      <p>Managing saved jobs and applications</p>
      <p>Troubleshooting common issues with </p>
      <p>Subscription and Payment</p>
      <p>Contact Information for customer support or assistance </p>
      <p>Frequently Asked Questions (FAQs)</p>
    
   <div className={styles.accordions}>
      <Accordion title= "How can I apply for  job?" content="lorem10"/>
      <Accordion title= "How to subscribe to a plan" content="lorem10"/>
      <Accordion title= "How to save jobs" content="lorem10"/>
      <Accordion title= "How can I withdraw  money from your wallet?" content="lorem10"/>
      <Accordion title= "How can I apply for  job?" content="lorem10"/>
    
      </div>
      </div>
  </Container>
};

export default Help;
