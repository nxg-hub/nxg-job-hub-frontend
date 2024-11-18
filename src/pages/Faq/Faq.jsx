import React, { useEffect } from "react";
import FaqItem from "./FaqItem";
import Container from "../../components/Container/Container";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./index.module.scss";
const Faq = () => {
  useEffect(() => {
    //page to scroll to top unmount
    document.documentElement.scrollTop = 0; // For most modern browsers
  }, []);
  return (
    <section className="w-full bg-white">
      <div className="bg-black">
        <Header />
      </div>
      <Container>
        <h1 className={styles.heading}>FAQs</h1>
        <FaqItem
          title="What is NXG Job Hub?"
          body="NXG Job Hub is an exclusive online platform where verified employers and agents can discover vetted tech talents for various job opportunities across the globe."
        />
        <FaqItem
          title="How can I search for tech talents on NXG Job Hub?"
          body="You can search for tech talents by using keywords related to skills, experience, or location in the search bar. All talents showcased on our platform have been vetted to ensure quality."
        />
        <FaqItem
          title="How do I apply to showcase my tech talent on NXG Job Hub?"
          body="To showcase your tech talent, you need to apply and undergo our vetting process. Once approved, your profile will be visible to verified employers and agents seeking tech talents."
        />
        <FaqItem
          title="How can employers post jobs on NXG Job Hub?"
          body="Employers and agents must first verify their accounts to post job listings. Once verified, they can easily create job postings, specifying details such as job requirements and contact information."
        />
        <FaqItem
          title="Can employers set up interviews and recruit directly on NXG Job Hub?"
          body="Yes, employers can manage the entire hiring process on NXG Job Hub. They can schedule interviews, communicate with candidates, and make hiring decisions directly through our platform."
        />
        <FaqItem
          title="Can tech talents see jobs based on their location, skills, and other criteria?"
          body="Absolutely! Tech talents can customize their job search on NXG Job Hub by filtering job listings based on location, required skills, job type, and more, ensuring they find opportunities that match their preferences."
        />
        <FaqItem
          title="Is there a fee for using NXG Job Hub?"
          body="NXG Job Hub offers a one-month free subscription for all users. After the trial period, employers can choose from subscription plans like Silver or Platinum, tailored to meet their hiring needs effectively."
        />
        <FaqItem
          title="What are the benefits of subscribing to NXG Job Hub?"
          body="Subscribing to NXG Job Hub provides employers with enhanced features such as priority job listings, advanced search filters, and access to a curated pool of vetted tech talents, ensuring efficient and targeted hiring."
        />
        <FaqItem
          title="Can I receive alerts for new job postings on NXG Job Hub?"
          body="Yes, you can set up job alerts based on your preferences. You'll receive notifications via email or directly on the platform whenever new job listings matching your criteria are posted."
        />
        <FaqItem
          title="How secure is my data on NXG Job Hub?"
          body="We prioritize the security and privacy of your personal information. NXG Job Hub employs robust security measures, including encryption and data protection protocols, to safeguard all user data."
        />
        <FaqItem
          title="How can I manage my subscription on NXG Job Hub?"
          body="You can manage your subscription settings by accessing your account dashboard. From there, you can upgrade, downgrade, or cancel your subscription plan as per your hiring requirements."
        />
      </Container>
      <Footer />
    </section>
  );
};

export default Faq;
