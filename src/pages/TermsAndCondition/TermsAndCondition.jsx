import React from 'react';
import Container from '../../components/Container/Container';
import styles from './index.module.scss';

const TermsAndCondition = () => {
    return (
        <Container>
            <h1 className={styles.heading}>Terms And Conditions</h1>

            <section className={styles.section}>
                <h2>Introduction</h2>
                <p>
                    Welcome to NXG Job Hub! By accessing or using our platform, you agree to be bound by the following terms and conditions ("Terms"). Please read these Terms carefully before using our services. If you do not agree with any part of these Terms, you must not use our platform.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Definitions</h2>
                <p>
                    "Platform" refers to the NXG Job Hub website and any related services or applications.<br />
                    "User" refers to any individual or entity using the platform, including tech talent, agents, and employers.<br />
                    "Content" refers to any information, data, text, graphics, or other materials uploaded, downloaded, or appearing on the platform.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Use of the Platform</h2>
                <h3>Eligibility</h3>
                <p>
                    Users must be at least 18 years old to create an account and use our services. By using the platform, you represent and warrant that you have the right, authority, and capacity to enter into these Terms.
                </p>
                <br/>
                <h3>Account Registration</h3>
                <p>
                    Users must create an account to access certain features of the platform. Users agree to provide accurate and complete information during the registration process and to update such information as necessary.
                </p>
<br/>
                <h3>User Responsibilities</h3>
                <p>
                    Users are responsible for maintaining the confidentiality of their account credentials. Users agree not to engage in any activity that interferes with or disrupts the platform.
                </p>
<br/>
                <h3>Prohibited Conduct</h3>
                <p>
                    Users may not use the platform for any unlawful purpose or in violation of any applicable laws. Users are prohibited from posting or transmitting any content that is defamatory, obscene, abusive, or otherwise objectionable.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Job Matching and Communication</h2>
                <h3>Efficient Job Matching</h3>
                <p>
                    Our platform utilizes advanced algorithms to match tech talent with relevant job opportunities. Users acknowledge that job matching is based on the information provided and that NXG Job Hub does not guarantee job placement or hiring.
                </p>
<br/>
                <h3>Streamlined Communication</h3>
                <p>
                    Users can communicate directly with other users through the platform’s communication tools. Users agree to use communication features responsibly and in accordance with these Terms.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Content and Intellectual Property</h2>
                <h3>User Content</h3>
                <p>
                    Users retain ownership of any content they post on the platform. By posting content, users grant NXG Job Hub a non-exclusive, royalty-free, worldwide license to use, reproduce, and display such content in connection with the platform.
                </p>
<br/>
                <h3>Intellectual Property Rights</h3>
                <p>
                    All content, trademarks, and logos on the platform are the property of NXG Job Hub or its licensors and are protected by intellectual property laws. Users may not use any content from the platform without express permission from NXG Job Hub.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Privacy and Data Security</h2>
                <h3>Privacy Policy</h3>
                <p>
                    Users agree to the collection and use of personal information as described in our Privacy Policy. We are committed to protecting user data with robust security measures.
                </p>

                <h3>Data Security</h3>
                <p>
                    Users must report any unauthorized access or use of their account immediately. NXG Job Hub is not liable for any loss or damage arising from unauthorized access to user accounts.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Limitation of Liability</h2>
                <p>
                    NXG Job Hub provides the platform "as is" and "as available" without any warranties of any kind. NXG Job Hub is not liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from or related to the use of the platform.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Termination</h2>
                <p>
                    NXG Job Hub reserves the right to suspend or terminate a user’s access to the platform at any time, without notice, for any reason, including violation of these Terms.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Changes to Terms</h2>
                <p>
                    NXG Job Hub reserves the right to modify these Terms at any time. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of the revised Terms.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Governing Law</h2>
                <p>
                    These Terms are governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law principles.
                </p>
            </section>

            <section className={styles.section}>
                <h2>Contact Information</h2>
                <p>
                    For any questions or concerns regarding these Terms, please contact us at https://nxgjobhub.com/contact
                </p>
            </section>
        </Container>
    );
}

export default TermsAndCondition;

// import React from 'react'
// import Container from '../../components/Container/Container'
// const TermsAndCondition = () => {
//   return (
//     <Container>
//     <h1 className='heading'>Terms And Conditions</h1 >
//     </Container>
//     )
// }
//
// export default TermsAndCondition