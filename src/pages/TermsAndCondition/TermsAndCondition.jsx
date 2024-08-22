import React from 'react'
import Container from '../../components/Container/Container';
import Section from './Section'
import SubSection from './SubSection'
const TermsAndCondition = () => {
  return (
    <Container>
      <Section
        title="Terms and Conditions"
        subtitle="Introduction"
        body={`Welcome to NXG Job Hub! By accessing or using our platform, you agree to be bound by the following terms and conditions ("Terms"). Please read these Terms carefully before using our services. If you do not agree with any part of these Terms, you must not use our platform.`}
        definition="Definitions"
        bulletpoint={[
          '"Platform" refers to the NXG Job Hub website and any related services or applications.',
          '"User" refers to any individual or entity using the platform, including tech talent, agents, and employers.',
          '"Content" refers to any information, data, text, graphics, or other materials uploaded, downloaded, or appearing on the platform.'
        ]}
      />
      <h1>Use of the Platform</h1>
      <SubSection
        subheading="1. Eligibility"
        list={[
          'Users must be at least 18 years old to create an account and use our services.',
          'By using the platform, you represent and warrant that you have the right, authority, and capacity to enter into these Terms.',
        ]}
      />
      <SubSection
        subheading="2. Account Registration"
        list={[
          'Users must create an account to access certain features of the platform.',
          'Users agree to provide accurate and complete information during the registration process and to update such information as necessary.',
        ]}
      />
      <SubSection
        subheading="3. User Responsibilities"
        list={[
          'Users are responsible for maintaining the confidentiality of their account credentials.',
          'Users agree not to engage in any activity that interferes with or disrupts the platform.',
        ]}
      />
      <SubSection
        subheading="4. Prohibited Conduct"
        list={[
          'Users may not use the platform for any unlawful purpose or in violation of any applicable laws.',
          'Users are prohibited from posting or transmitting any content that is defamatory, obscene, abusive, or otherwise objectionable.',
        ]}
      />
      <h4>Job Matching and Communication</h4>
      <SubSection
        subheading="5. Efficient Job Matching"
        list={[
          'Our platform utilizes advanced algorithms to match tech talent with relevant job opportunities.',
          'Users acknowledge that job matching is based on the information provided and that NXG Job Hub does not guarantee job placement or hiring.',
        ]}
      />
      <SubSection
        subheading="6. Streamlined Communication"
        list={[
          'Users can communicate directly with other users through the platform’s communication tools.',
          'Users agree to use communication features responsibly and in accordance with these Terms.',
        ]}
      />
      <SubSection
        subheading="7. User Content"
        list={[
          'Users retain ownership of any content they post on the platform.',
          'By posting content, users grant NXG Job Hub a non-exclusive, royalty-free, worldwide license to use, reproduce, and display such content in connection with the platform.',
        ]}
      />
      <SubSection
        subheading="8. Intellectual Property Rights"
        list={[
          'All content, trademarks, and logos on the platform are the property of NXG Job Hub or its licensors and are protected by intellectual property laws.',
          'Users may not use any content from the platform without express permission from NXG Job Hub.',
        ]}
      />
      <h4>Privacy and Data Security</h4>
      <SubSection
        subheading="9. Privacy Policy"
        list={[
          'Users agree to the collection and use of personal information as described in our Privacy Policy.',
          'We are committed to protecting user data with robust security measures.',
        ]}
      />
      <SubSection
        subheading="10. Data Security"
        list={[
          'Users must report any unauthorized access or use of their account immediately.',
          'NXG Job Hub is not liable for any loss or damage arising from unauthorized access to user accounts.',
        ]}
      />
      <SubSection
        subheading="Limitation of Liability"
        list={[
          'NXG Job Hub provides the platform "as is" and "as available" without any warranties of any kind.',
          'NXG Job Hub is not liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from or related to the use of the platform.',
        ]}
      />
      <SubSection
        subheading="Termination"
        list={[
          'NXG Job Hub reserves the right to suspend or terminate a user’s access to the platform at any time, without notice, for any reason, including violation of these Terms.',
        ]}
      />
      <SubSection
        subheading="Changes to Terms"
        list={[
          'NXG Job Hub reserves the right to modify these Terms at any time. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of the revised Terms.',
        ]}
      />
      <SubSection
        subheading="Governing Law"
        list={[
          'These Terms are governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law principles.',
        ]}
      />
      <SubSection
        subheading="Contact Information"
        list={[
          <span key="0">
            For any questions or concerns regarding these Terms, please contact us at <a href="mailto:info@nxgjobhub.com">info@nxgjobhub.com</a>.
          </span>,
        ]}
        
        
      />
    </Container>
//     <Container>
//     <Section
//       title="Terms and Conditions"
//       subtitle="Introduction"
//       body={`Welcome to NXG Job Hub! By accessing or using our platform, you agree to be bound by the following terms and conditions ("Terms"). Please read these Terms carefully before using our services. If you do not agree with any part of these Terms, you must not use our platform.`}
//       definition="Definitions"
//       bulletpoint={[
//         '"Platform" refers to the NXG Job Hub website and any related services or applications.',
//         '"User" refers to any individual or entity using the platform, including tech talent, agents, and employers.',
//         '"Content" refers to any information, data, text, graphics, or other materials uploaded, downloaded, or appearing on the platform.'
//       ]}
//     />
//     <h1>Use of the Platform</h1>
//     <SubSection subheading="1. Eligibility"
//     list={['Users must be at least 18 years old to create an account and use our services.',
//       'By using the platform, you represent and warrant that you have the right, authority, and capacity to enter into these Terms.',]}/>
//       <SubSection subheading="2. Account Registeration"
//       list={["Users must create an account to access certain features of the platform.",
// "Users agree to provide accurate and complete information during the registration process and to update such information as necessary."]}
//       />
//       <SubSection subheading="3. User Responsibilities"
//       list={["Users are responsible for maintaining the confidentiality of their account credentials.",
// "Users agree not to engage in any activity that interferes with or disrupts the platform."]}/>
// <SubSection subheading="4. Prohibited Conduct"
// list={["Users may not use the platform for any unlawful purpose or in violation of any applicable laws.",
// "Users are prohibited from posting or transmitting any content that is defamatory, obscene, abusive, or otherwise objectionable."]}/>
// <h4>Job Matching and Communication</h4>
// <SubSection subheading="5. Efficient Job Matching"
// list={["Our platform utilizes advanced algorithms to match tech talent with relevant job opportunities.",
// "Users acknowledge that job matching is based on the information provided and that NXG Job Hub does not guarantee job placement or hiring."]}
// />
// <SubSection subheading="6. Streamlined Communication" 
// list={["Users can communicate directly with other users through the platform’s communication tools.",
// "Users agree to use communication features responsibly and in accordance with these Terms."]}
// />
// <SubSection subheading="7. User Content"
// list={["Users retain ownership of any content they post on the platform.",
// "By posting content, users grant NXG Job Hub a non-exclusive, royalty-free, worldwide license to use, reproduce, and display such content in connection with the platform."]}
// />
// <SubSection subheading = "8. Intellectual Property Rights"
// list={["All content, trademarks, and logos on the platform are the property of NXG Job Hub or its licensors and are protected by intellectual property laws.",
// "Users may not use any content from the platform without express permission from NXG Job Hub."]}
// />
// <h4>Privacy and Data Security</h4>
// <SubSection subheading="9. Privacy Policy" list={["Users agree to the collection and use of personal information as described in our Privacy Policy.",
// "We are committed to protecting user data with robust security measures."]}/>
// <SubSection subheading="10. Data Security"
// list={["Users must report any unauthorized access or use of their account immediately.",
// "NXG Job Hub is not liable for any loss or damage arising from unauthorized access to user accounts."]}/>
// <SubSection subheading="Limitation of Liability"
// list={["NXG Job Hub provides the platform 'as is' and 'as available' without any warranties of any kind.",
// "NXG Job Hub is not liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from or related to the use of the platform."]}/>
// <SubSection 
//   subheading="Termination" 
//   list={[
//     "NXG Job Hub reserves the right to suspend or terminate a user’s access to the platform at any time, without notice, for any reason, including violation of these Terms."
//   ]} 
// />
// <SubSection subheading="Changes to Terms"
// list={["NXG Job Hub reserves the right to modify these Terms at any time. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of the revised Terms."]}
// />
// <SubSection subheading="Governing Law"
// list={["These Terms are governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law principles."]}
// />
// <SubSection subheading="Contact Information"
// list={["For any questions or concerns regarding these Terms, please contact us at <a>info@nxgjobhub.com</a>."]}/>
//     </Container>

  )
}

export default TermsAndCondition