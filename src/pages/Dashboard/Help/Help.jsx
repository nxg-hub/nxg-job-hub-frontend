import React from "react";
import Container from "../../../components/Container/Container";
import styles from '../Help/index.module.scss'
import Accordion from "./Accordion/Accordion";

const Help = () => {
    return (
        <Container>
            <div className={styles.helpContainer}>
                <h1>Help Center</h1>
                <p>Welcome to the NXG Job Hub Help Center. Below you'll find resources and guides to help you manage your account, apply for jobs, and troubleshoot common issues.</p>

                <h2>Account Setup and Management</h2>
                <p>Learn how to create and manage your NXG Job Hub account, update your profile, and maintain your account security.</p>

                <h2>Managing Saved Jobs and Applications</h2>
                <p>Understand how to save jobs you're interested in, track your job applications, and manage your favorites list effectively.</p>

                <h2>Troubleshooting Common Issues</h2>
                <p>If you're facing issues with logging in, try resetting your password, or clearing your browser cache.</p>

                <h2>Subscription and Payment</h2>
                <p>Learn more about our subscription plans, payment methods, and how to upgrade or cancel your plan.</p>

                <h2>Contact Information</h2>
                <p>Need help? Reach out to our customer support for assistance with any issue at <a href="mailto:info@nextgenhub.com.ng">info@nextgenhub.com.ng</a>.</p>

                <h2>Frequently Asked Questions (FAQs)</h2>

                <div className={styles.accordions}>
                    <Accordion
                        title="How can I apply for a job?"
                        content="To apply for a job, first make sure your profile is fully updated and verified. Search for job listings that match your skills, and click 'Apply' on the job post. Follow the on-screen instructions to submit your application."
                    />
                    <Accordion
                        title="How do I subscribe to a plan?"
                        content="Go to your dashboard, and under 'Subscription', choose the plan that best suits your needs. You'll be guided through the payment process to complete the subscription."
                    />
                    <Accordion
                        title="How do I save jobs?"
                        content="To save a job for later, click on the 'Save' button on the job listing. You can view all your saved jobs in the 'Saved Jobs' section of your profile."
                    />
                    <Accordion
                        title="What should I do if I have trouble logging in?"
                        content="If you're having trouble logging in, try resetting your password by clicking 'Forgot Password' on the login page. If the issue persists, contact our support team for assistance."
                    />
                </div>
            </div>
        </Container>
    );
};

export default Help;
