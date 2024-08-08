import { useState } from "react";
import styles from "./Accordion.module.scss"
import chevronUp from "/Users/user/Desktop/nxg-job-hub-frontend/src/assets/svg/chevron-up.svg";
import chevronDown from "/Users/user/Desktop/nxg-job-hub-frontend/src/assets/svg/chevron-down.svg";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.accordionItem}>
      <div className={styles.accordionHeader} onClick={toggleAccordion}>
        <div className={styles.accordionTitle}>{title}</div>
        <div className={styles.accordionIcon}>
          {isOpen ? (
           <img src={chevronUp} alt="chevron up icon" />
        ) : (
          <img src={chevronDown} alt="chevron down icon" />

          )}
        </div>
      </div>
      {isOpen && <div className={styles.accordionContent}>{content}</div>}
    </div>
  );
};

export default Accordion;