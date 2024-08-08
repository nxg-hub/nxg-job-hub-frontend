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
          For Tech Talent
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
          For Agent
        </h2>
      </div>
      <div className="md:flex justify-between">
        <ServiceCard
          img={cm}
          title="Candidate Management"
          content="Efficiently manage your pool of candidates with tools that streamline tracking, updating, and presenting tech talent to potential employers."
          extraContent1={`Talent Pool Management: Keep track of your candidates' profiles and job applications.`}
          extraContent2={` Candidate Matching: Match candidates to suitable job openings with precision.`}
          extraContent3={`Profile Updates: Update candidate profiles and status in real-time.`}
        />
        <ServiceCard
          img={ec}
          title="Employer Coordination"
          content=" Facilitate interactions between candidates and employers, from initial introductions to final negotiations."
          extraContent1={`Employer Engagement: Coordinate with employers to present the best candidates.`}
          extraContent2={`Negotiation Support: Assist in salary and contract negotiations.`}
          extraContent3={`Feedback Loop: Collect and relay feedback between candidates and employers.`}
        />
        <ServiceCard
          img={ai}
          title="Analytics and Insights"
          content="Access analytics to track candidate performance, job market trends, and success rates, helping you refine your strategies and make data-driven decisions."
          extraContent1={`Performance Metrics: Analyse candidate success rates and job fit.    `}
          extraContent2={`Market Trends: Stay informed about the latest trends in the tech job market.`}
          extraContent3={`Insight Reports: Generate reports to guide your candidate placement strategies.`}
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
