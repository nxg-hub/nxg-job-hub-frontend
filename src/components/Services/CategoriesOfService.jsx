import React from "react";
import ServiceCard from "./ServiceCard";
import cm from "../../static/images/cm.png";
import cs from "../../static/images/cs.png";
import dc from "../../static/images/dc.png";
import ec from "../../static/images/ec.png";
import ih from "../../static/images/ih.png";
import jm from "../../static/images/jm.png";
import jp from "../../static/images/jp.png";
import pb from "../../static/images/pb.png";
import ai from "../../static/images/ai.png";

const CategoriesOfService = () => {
  return (
    <section className="w-[80%] m-auto">
      <div className="w-[80%] m-auto mt-10 border-b-4 h-[50px] md:h-[100px] md:w-[40%] md:ml-[1%] mb-11">
        <h2 className="sm:text-xl md:text-3xl font-extrabold underline">
          For Talent
        </h2>
      </div>
      <div className="md:flex justify-between">
        <ServiceCard
          img={pb}
          title="Profile Building"
          content="Create a compelling profile that showcases your abilities and attracts potential employers. Highlight your skills, projects, and achievements to stand out in the competitive job market."
          extraContent1={`Comprehensive Profiles: Build a detailed profile to present your qualifications effectively.`}
          extraContent2={`Project Portfolio: Showcase your past projects and contributions.`}
          extraContent3={`Skill Validation: Get your skills validated through our platform.`}
        />
        <ServiceCard
          img={jm}
          title="Job Matching"
          content="Our platform provides personalized job recommendations based on your skills, experience, and career preferences. Our advanced matching algorithms ensure that you find opportunities that align with your professional goals."
          extraContent1={`Skill-Based Matching: Discover job openings that fit your technical expertise.  `}
          extraContent2={`Experience Alignment: Find roles that match your career level and growth aspirations.`}
          extraContent3={`Preference Filtering: Customize job searches based on location, salary, and more.`}
        />
        <ServiceCard
          img={dc}
          title="Direct Communication"
          content="Engage with employers and agents directly through our built-in messaging system. Receive interview invitations, feedback, and updates in real-time."
          extraContent1={`Messaging System: Communicate with employers and agents effortlessly.  `}
          extraContent2={` Interview Scheduling: Coordinate interview times and follow-ups directly on the platform.`}
          extraContent3={`Real-Time Notifications: Stay updated with instant alerts and messages.`}
        />
      </div>
      <div className="w-[80%] m-auto mt-10 border-b-4 h-[50px] md:h-[100px] md:w-[40%] md:ml-[1%] mb-11">
        <h2 className="sm:text-xl md:text-3xl font-extrabold underline">
          For Service Provider
        </h2>
      </div>
      <div className="md:flex justify-between">
        <ServiceCard
          img={cm}
          title="Service Management"
          content="Manage your services efficiently, showcase your offerings, and keep track of client requests seamlessly."
          extraContent1={`Service Listings: Clearly display all the services you provide, including pricing and availability.`}
          extraContent2={`Booking Management: Accept and manage client bookings easily.`}
          extraContent3={`Real-Time Updates: Update your service status, availability, and ongoing jobs in real-time.`}
        />

        <ServiceCard
          img={ec}
          title="Client Coordination"
          content="Keep in touch with clients from service inquiries to completion, ensuring smooth and reliable service delivery."
          extraContent1={`Request Handling: Respond promptly to client service requests.`}
          extraContent2={`Scheduling Support: Arrange appointments and coordinate schedules efficiently.`}
          extraContent3={`Feedback Collection: Collect reviews and feedback to improve your services.`}
        />

        <ServiceCard
          img={ai}
          title="Payments & Transactions"
          content="Easily manage payments, invoices, and service fees, ensuring transparency and convenience for both you and your clients."
          extraContent1={`Multiple Payment Options: Accept payments online, via bank transfer, or in-person.`}
          extraContent2={`Invoice Management: Generate invoices for every completed service.`}
          extraContent3={`Transaction Tracking: Keep a record of all payments and pending dues.`}
        />
      </div>
      <div className="w-[80%] m-auto mt-10 border-b-4 h-[50px] md:h-[100px] md:w-[40%] md:ml-[1%] mb-11">
        <h2 className="sm:text-xl md:text-3xl font-extrabold underline">
          For Employer
        </h2>
      </div>
      <div className="md:flex justify-between">
        <ServiceCard
          img={cs}
          title="Candidate Search"
          content="Identify and connect with top tech talent using our powerful search tools. Filter candidates based on skills, experience, and other relevant criteria."
          extraContent1={`Advanced Search Filters: Find candidates that meet your specific requirements.  `}
          extraContent2={` Skill Match Scores: Assess candidate suitability with skill match scores.`}
          extraContent3={`Direct Contact: Reach out to potential hires directly through the platform.`}
        />
        <ServiceCard
          img={jp}
          title="Job Posting"
          content="Post job openings and reach a targeted audience of qualified tech professionals. Customize job listings to attract the right candidates"
          extraContent1={`Customizable Listings: Create detailed job postings with specific requirements.  `}
          extraContent2={`Targeted Reach: Ensure your job listings reach the most relevant candidates.`}
          extraContent3={`Application Tracking: Track applications and manage candidate progress.`}
        />
        <ServiceCard
          img={ih}
          title="Interview and Hiring"
          content=" Streamline your interview process with tools designed to schedule, conduct, and evaluate candidate interviews, ensuring a smooth hiring workflow."
          extraContent1={`Interview Scheduling: Coordinate interview times with candidates.      `}
          extraContent2={`Evaluation Tools: Use evaluation templates to assess candidates consistently.`}
          extraContent3={`Offer Management: Manage job offers and candidate responses.`}
        />
      </div>
    </section>
  );
};

export default CategoriesOfService;
