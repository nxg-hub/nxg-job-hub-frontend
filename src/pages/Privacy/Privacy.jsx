import React from "react";
import "./styles.scss";
import Container from "../../components/Container/Container";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const PrivacyPolicy = () => {
  return (
    <section className="w-full bg-white">
      <div className="bg-black">{/* <Header /> */}</div>
      <Container>
        <h1 className="heading">Privacy Policy</h1>
        <div className="privacy-policy">
          <h1 className="section-title">Introduction</h1>
          <p className="section-body">
            At NXG Job Hub, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy outlines how we collect, use, share, and safeguard your data
            when you use our platform. By accessing or using NXG Job Hub, you
            agree to the terms described in this policy.
          </p>

          <ol className="section-body">
            <li>
              <h2 className="subsection-title">1. Information We Collect</h2>
              <p className="section-body">
                We collect information to provide, improve, and personalize our
                services. The types of information we collect include:
              </p>

              <ol className="section-body">
                <li>
                  <h3 className="section-title">1.1. Personal Information</h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Account Information: When you create an account, we
                      collect your name, email address, phone number, and other
                      contact details.
                    </li>
                    <li className="bullet-list-item">
                      Profile Information: We collect information you provide
                      for your profile, such as skills, experience, education,
                      and employment history.
                    </li>
                    <li className="bullet-list-item">
                      Verification Information: We may collect identification
                      documents or other information to verify your identity.
                    </li>
                    <li className="bullet-list-item">
                      Communication Data: We collect messages, feedback, and
                      other communications you exchange through our platform.
                    </li>
                  </ul>
                </li>

                <li className="section-body">
                  <h3 className="section-title">1.2. Usage Information</h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Log Data: We collect information about your interactions
                      with our platform, such as IP addresses, browser types,
                      device identifiers, and access times.
                    </li>
                    <li className="bullet-list-item">
                      Cookies: We use cookies and similar technologies to
                      collect information about your preferences and usage
                      patterns.
                    </li>
                    <li className="bullet-list-item">
                      Analytics Data: We collect data about your activities on
                      our platform for analytics purposes.
                    </li>
                  </ul>
                </li>

                <li className="section-body">
                  <h3 className="section-title">
                    1.3. Job and Employer Information
                  </h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Job Applications: We collect information related to your
                      job applications, including resumes, cover letters, and
                      application status.
                    </li>
                    <li className="bullet-list-item">
                      Employer Data: We collect information about employers,
                      including company details, job postings, and hiring
                      practices.
                    </li>
                  </ul>
                </li>
              </ol>
            </li>

            <li className="section-body">
              <h2 className="subsection-title">
                2. How We Use Your Information
              </h2>
              <p className="section-body">
                We use your information for the following purposes:
              </p>

              <ol className="sub-list">
                <li className="section-body">
                  <h3 className="section-title">
                    2.1. Providing and Improving Services
                  </h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Account Management: To manage your account and provide
                      access to our services.
                    </li>
                    <li className="bullet-list-item">
                      Job Matching: To match tech talent with relevant job
                      opportunities and employers.
                    </li>
                    <li className="bullet-list-item">
                      Communication: To facilitate communication between users,
                      including job applications and feedback.
                    </li>
                    <li className="bullet-list-item">
                      Customization: To personalize your experience and
                      recommend relevant content.
                    </li>
                  </ul>
                </li>

                <li className="section-body">
                  <h3 className="section-title">2.2. Analytics and Insights</h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Performance Metrics: To analyze platform performance and
                      user engagement.
                    </li>
                    <li className="bullet-list-item">
                      Market Trends: To understand job market trends and improve
                      our services.
                    </li>
                  </ul>
                </li>

                <li className="section-body">
                  <h3 className="section-title">
                    2.3. Security and Compliance
                  </h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Fraud Prevention: To detect and prevent fraudulent
                      activities and security breaches.
                    </li>
                    <li className="bullet-list-item">
                      Legal Compliance: To comply with legal obligations and
                      respond to regulatory requests.
                    </li>
                  </ul>
                </li>

                <li className="section-body">
                  <h3 className="section-title">
                    2.4. Marketing and Communication
                  </h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Promotional Materials: To send you updates, newsletters,
                      and promotional materials (you can opt-out at any time).
                    </li>
                    <li className="bullet-list-item">
                      User Feedback: To solicit feedback and improve our
                      services.
                    </li>
                  </ul>
                </li>
              </ol>
            </li>

            <li className="section-body">
              <h2 className="subsection-title">3. Sharing Your Information</h2>
              <p className="section-body">
                We may share your information with the following parties:
              </p>

              <ol className="sub-list">
                <li className="section-body">
                  <h3 className="section-title">3.1 Employers and Agents</h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Job Applications: We share your profile and application
                      details with employers and agents to facilitate job
                      placements.
                    </li>
                    <li className="bullet-list-item">
                      Profile Visibility: Your profile may be visible to
                      employers searching for candidates.
                    </li>
                  </ul>
                </li>

                <li className="section-body">
                  <h3 className="section-title">3.2. Service Providers</h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Third-Party Services: We share information with service
                      providers who assist us in operating our platform, such as
                      hosting, analytics, and payment processing.
                    </li>
                  </ul>
                </li>

                <li className="section-body">
                  <h3 className="section-title">
                    3.3. Legal and Regulatory Authorities
                  </h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Compliance: We may disclose information to legal
                      authorities if required by law or to protect our rights
                      and users.
                    </li>
                  </ul>
                </li>

                <li className="section-body">
                  <h3 className="section-title">3.4. Business Transfers</h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Mergers and Acquisitions: In the event of a merger,
                      acquisition, or asset sale, your information may be
                      transferred as part of the transaction.
                    </li>
                  </ul>
                </li>
              </ol>
            </li>

            <li className="section-body">
              <h2 className="subsection-title">4. Data Security</h2>
              <p className="section-body">
                We implement robust security measures to protect your
                information, including:
              </p>

              <ul className="bullet-list">
                <li className="bullet-list-item">
                  Encryption: We use encryption to protect sensitive data during
                  transmission.
                </li>
                <li className="bullet-list-item">
                  Access Controls: We restrict access to personal information to
                  authorized personnel only.
                </li>
                <li className="bullet-list-item">
                  Regular Audits: We conduct regular security audits and
                  assessments to identify and address vulnerabilities.
                </li>
              </ul>
            </li>

            <li className="section-body">
              <h2 className="subsection-title">5. Your Rights and Choices</h2>
              <p className="section-body">
                You have the following rights regarding your information:
              </p>

              <ol className="sub-list">
                <li>
                  <h3 className="section-title">5.1. Access and Correction</h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Access: You can access your personal information by
                      logging into your account.
                    </li>
                    <li className="bullet-list-item">
                      Correction: You can update or correct your information
                      through your account settings.
                    </li>
                  </ul>
                </li>

                <li className="section-body">
                  <h3 className="section-title">5.2. Deletion</h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Account Deletion: You can request the deletion of your
                      account and personal information by contacting us.
                    </li>
                  </ul>
                </li>

                <li className="section-body">
                  <h3 className="section-title">5.3. Opt-Out</h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Marketing Communications: You can opt-out of receiving
                      promotional communications by following the unsubscribe
                      instructions in the emails.
                    </li>
                  </ul>
                </li>

                <li className="section-body">
                  <h3 className="section-title">5.4. Data Portability</h3>
                  <ul className="bullet-list">
                    <li className="bullet-list-item">
                      Portability: You can request a copy of your personal
                      information in a structured, machine-readable format.
                    </li>
                  </ul>
                </li>
              </ol>
            </li>

            <li className="section-body">
              <h2 className="subsection-title">6. Third-Party Links</h2>
              <p className="section-body">
                Our platform may contain links to third-party websites. We are
                not responsible for the privacy practices or content of these
                websites. We encourage you to review the privacy policies of any
                third-party sites you visit.
              </p>
            </li>

            <li className="section-body">
              <h2 className="subsection-title">7. Changes to This Policy</h2>
              <p className="section-body">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated effective date. We
                encourage you to review this policy periodically to stay
                informed about how we protect your information.
              </p>
            </li>

            <li className="section-body">
              <h2 className="subsection-title">8. Contact Us</h2>
              <p className="section-body">
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact us at:
              </p>
              <p className="section-body">
                NXG Job Hub Email: info@nextgenhub.com.ng
              </p>
            </li>
          </ol>

          <p className="section-body">
            Thank you for trusting NXG Job Hub with your information. We are
            committed to ensuring your privacy and security while providing a
            seamless job search and hiring experience.
          </p>
        </div>
      </Container>
      {/* <Footer /> */}
    </section>
  );
};

export default PrivacyPolicy;
