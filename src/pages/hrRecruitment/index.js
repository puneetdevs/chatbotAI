import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Home/componenets/Navbar";
import Footer from "../../Home/componenets/Footer";
import AudioCard from "../../Home/componenets/AudioCard";
import Avatar from "../../assets/girl-avatar-1.png";
import Avatar2 from "../../assets/boy-avatar1.png";
import Audio1 from "../../assets/audio/scheduling.mp3";
import Audio2 from "../../assets/audio/personal.mp3";
import Avatar6 from "../../assets/boy-avatar2.png";
import Audio3 from "../../assets/audio/customer_support.mp3";
import Banner from "../../assets/AIVoiceAssistantforRecruitment.png";
import CandidateScreening from "../../assets/hr/Candidate-Screening.png";
import EffortlessInterviewScheduling from "../../assets/hr/Effortless-Interview-Scheduling.png";
import QuickGrowth from "../../assets/healthcare/Quick-Growth.png";
import OnboardingSupport from "../../assets/hr/Onboarding-Support.png";
import ValuableInsights from "../../assets/hr/Valuable-Insights.png";
import ImprovedPerformanceManagement from "../../assets/hr/Improved-Performance-Management.png";



import ctaImg5 from "../../assets/vo-agents-ai-hr.png";
import ModalComponent from "../../components/Modal";
import logo1 from "../../assets/logo/CodeShastra logo.png";
import logo2 from "../../assets/logo/Cyzap logo.gif";
import logo3 from "../../assets/logo/Kompanions logo.png";
import logo4 from "../../assets/logo/Orion-eSolutions-logo.png";
import Accordion from "react-bootstrap/Accordion";
import { Helmet } from 'react-helmet';
const hrRecruitment = () => {
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState("1");
  const [active, setActive] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const assistant = "42be7e8a-58f0-42bf-a811-85c67f7652de";

  const handleClick = (id) => {
    const element = document.getElementById(id.target.attributes.id.value);
    if (element) {
      if (
        show === true &&
        show1 !== id.target.attributes.id.value &&
        show1 !== element.id
      ) {
        setShow1(false);
        setShow1(null);
        setActive(false);

        setShow1(id.target.attributes.id.value);
        setShow(true);
        setActive(true);
      }
    } else {
      setShow1(id.target.attributes.id.value);
      setShow(!show);
      setActive(true);
    }
  };
  const restaurantAssistantId = "caa808c0-dfd6-4824-bd95-5100672f5e0e";

  
  return (
  
    <div>
      <Helmet>
        <title>AI Voice Assistant for Recruitment | 24/7 Hiring by VoAgents</title>
      
    </Helmet>
      <section className="banner_wrapper industries_banner relative industries_banner_restaurent">
    
        <div className="navbar_wrapper">
          <Navbar />
        </div>
        <div className="container">
        <div className="row align-items-center">
            <div className="col-md-6 banner_content">
              <h2 className="text-5xl leading-11 font-bold text-purple-700 mb-4">
              AI Voice Assistant for Recruitment
              </h2>
              <p className="text-base  leading-6">
              Simplify various aspects of the hiring process, providing efficiency and enhancing the candidate experience with VoAgents. Our AI voice assistant for recruitment responds to general questions, recommendations, and complaints and schedules interviews with potential candidates.


                <br />
                <br />
                VoAgents pre-screen candidates based on the job description and prerequisites. It sends notifications to eligible candidates after compiling the conversation's insights.
              </p>
              <ModalComponent
                show={showModal}
                handleClose={handleCloseModal}
                labelData="Request Demo"
              />
            </div>
            <div className="col-md-6 flex justify-center items-center">
            <img src={Banner} className="inner-banner" alt="AI Voice Assistant for Recruitment | 24/7 Hiring by VoAgents"/>
            </div>
          </div>
        </div>
      </section>

      <section className="key-issues">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3">
              <div className="white-box white-box-purple">
                <h2 className="font-bold text-purple-800">
                Key Challenges Faced by Recruitment Professionals
                </h2>
                <p className="mt-3 text-purple-700">
                The recruitment industry is huge with the scope of achieving success but with this, there come several challenges posing restrictions for the hiring staff to work efficiently. 

                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="white-box">
                <h3 className="text-lg font-bold text-zinc-800">
                Training Costs

                </h3>
                <p className="mt-2 text-zinc-600">
                Hiring new staff and providing additional training adds to expenses. This develops a financial burden on the company as well as on the hired candidate. 
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="white-box">
                <h3 className="text-lg font-bold text-zinc-800">Missed Communications
</h3>
                <p className="mt-2 text-zinc-600">
                With busy schedules, many recruiters fail to quickly respond to the candidate's calls, leading to poor communication or losing the candidate's interest in the job
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="white-box">
                <h3 className="text-lg font-bold text-zinc-800">Fail to Reach Potential Candidates
</h3>
                <p className="mt-2 text-zinc-600">
                Human staff with heavy workloads fail to find the right fit for the job. They end up searching the pool of less qualified talent and reaching limited prospects.  


                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="whychoose">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2
                className="text-5xl leading-11 font-bold mb-4"
                style={{ color: "#230C4C" }}
              >
              Why Choose VoAgents for Efficient Recruitment?
              </h2>
              <p className="mb-5">
              VoAgents is a tailor-made AI voice assistant for recruitment to customize your use cases according to <br/>unique business needs. 
              </p>
            </div>
            <div className="col-md-10 offset-md-1">
              <div className="row">
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      <img
                        src={CandidateScreening}
                        alt="Candidate Screening"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Candidate Screening</h4>
                    <p className="text-base font-medium leading-9">
                    The AI voice agent conducts the initial screening of several candidates by asking qualification questions. It saves the recruiter’s time by eliminating unqualified applicants early on and listing the potential candidates for further rounds.

                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={EffortlessInterviewScheduling}
                        alt="Effortless Interview Scheduling"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Effortless Interview Scheduling
</h4>
                    <p className="text-base font-medium leading-9">
                    AI voice assistants can be easily integrated into the calendar, ensuring consistent scheduling of interviews. It frees up the time of recruitment professionals and simplifies the scheduling process accordingly. 


                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={OnboardingSupport}
                        alt="Onboarding Support & Automated Follow-Ups"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Onboarding Support & Automated Follow-Ups
</h4>
                    <p className="text-base font-medium leading-9">
                    AI voice agents ensure automated follow-ups with candidates who need assistance to move to the next steps, ensuring candidate engagement and reduced drop-offs. VoAgents facilitates smooth onboarding for new employees and ensures access to vital data.


                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={ValuableInsights}
                        alt="Offers Valuable Insights"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Offers Valuable Insights
</h4>
                    <p className="text-base font-medium leading-9">
                    AI voice agents for recruitment reduce the burden of talent acquisition staff by organizing documents and other data and continuously gathering feedback from prospects. It helps staff stay productive and ensure better candidate experiences. 


                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={QuickGrowth}
                        alt="Alleviates Recruitment Biasing"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Alleviates Recruitment Biasing</h4>
                    <p className="text-base font-medium leading-9">
                    AI voice assistants ensure fair interactions with candidates. It eliminates bias by asking the same questions from each candidate and assessing equally. Thus, improving overall recruitment efficiency. 
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      <img
                        src={ImprovedPerformanceManagement}
                        alt="Improved Performance Management"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Improved Performance Management</h4>
                    <p className="text-base font-medium leading-9">
                    
                    Well-programmed voice assistants can measure several performance metrics. Such technology can help strategize for performance improvement. Thus, helping the staff to achieve goals precisely.

                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" services_wrapper " id="sector">
        <div className="container">
          <div className="row">
            <div className="mb-5 text-center col-12 pt-10 ">
              <h2 className="mb-2 text-5xl font-bold leading-11 text-[#230c4c]">
                Examples
              </h2>
              <p className="text-base font-medium leading-7 text-black">
              Different examples of Our AI Voice Assistant in Recruitment
              </p>
            </div>
            <div className="col-12">
              <ul className="card_list flex flex-wrap gap-3.5 justify-start card_list_restaurent">
                <AudioCard
                  avatarSrc={Avatar}
                  title="Allen AI"
                  sector="Scheduling Interviews"
                  subtitle="Ideal for Conducting Candidate Interviews

                  "
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="rgba(73, 80, 87, 1)"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      ></path>
                    </svg>
                  }
                  description="Assess the candidate profile, schedule interviews, and automate follow-up to gather or share feedback."
                  audioSrc={Audio1}
                />
                <AudioCard
                  avatarSrc={Avatar6}
                  title="Adam AI"
                  sector="Reaching Potential Candidates

                  "
                  subtitle="Perfect for Finding Ideal Candidates
                  "
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="rgba(73, 80, 87, 1)"
                      aria-hidden="true"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                      ></path>
                    </svg>
                  }
                  description="Reach the potential candidates, make them understand the job description, and schedule the interviews"
                  audioSrc={Audio2}
                />
                <AudioCard
                  avatarSrc={Avatar2}
                  title="Eva"
                  sector="Customer Support"
                  subtitle="Perfect for Customer Service"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="rgba(73, 80, 87, 1)"
                      aria-hidden="true"
                    >
                      {" "}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
                      ></path>
                    </svg>
                  }
                  description="Use AI voice agents to transform service by addressing candidate queries and automating support operations.Use AI voice agents to address patient queries like operation hours and time slot availability and automate support operations.
                  "
                  audioSrc={Audio3}
                />
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-purple-200-lights overflow-visible mt-30 cta_wrapper cta_wrapper_module">
        <div className="container mx-auto">
          <div className="flex items-center  justify-between">
            <div className="w-3/5 pl-11 cta_cnt">
              <div className="mb-4">
                <h2 className="mb-2 text-4xl font-bold leading-11 text-[#230c4c]">
                Gear Up Your Recruitment Efforts With VoAgents

                </h2>
              </div>
              <div className="mb-4 w-11/12">
                <p className="text-base text-black">
                Book a demo to see how our AI voice agent for recruitment helps you attract top talent and speed up the hiring process. 

                </p>
              </div>

              <ModalComponent
                show={showModal}
                handleClose={handleCloseModal}
                labelData="Get a Free Quote"
              />
            </div>

            <div className="relative top-[34px]">
              <div className="img-cta-button img-cta-button-ind">
                <img src={ctaImg5} className="" alt="ai 3d development" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq_wrapper" id="faq">
        <div className="container">
          <div className="row">
            <div className="text-center col-12 marginBottom5">
              <h2 className="text-5xl leading-11 font-bold mb-9 text-[#230c4c]">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="custom-accordian">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {" "}
                    1. How do AI voice assistants help in recruitment?
                  </Accordion.Header>
                  <Accordion.Body>
                  AI voice assistants answer the candidate queries regarding vacancies and job descriptions while scheduling interviews with the professionals with the ideal candidates. Thus, increasing promptness, operational efficiency, and candidate satisfaction. 

                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                  2. How can VoAgents benefit the recruitment specialists?

                  </Accordion.Header>
                  <Accordion.Body>
                  VoAgents is an AI voice agent for recruitment organizations that helps simplify scheduling interviews with calendar integrations. It automates interactions keeping candidates engaged during the hiring process, ensuring reduced drop-off rates and positive candidate experiences                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                  3. Can I customize VoAgents to my recruitment needs?


                  </Accordion.Header>
                  <Accordion.Body>
                  Yes, you can customize VoAgents according to specific use cases of recruitment. It will help minimize the hassles associated with reaching candidates via manual calls and automate most of the recruitment process. 

                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                  4. Is it true that AI voice agents will replace human recruiters

                  </Accordion.Header>
                  <Accordion.Body>
                  No, the role of an AI voice assistant in recruitment is to simplify the hiring process. They are not designed to replace human staff completely. Human skills and talent are vital to understanding behavior and candidate responses to make better hiring decisions. 
                  </Accordion.Body>
                </Accordion.Item>
                
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <section className="clients_wrapper">
        <div className="container">
          <div className="bg-white dark:bg-zinc-900 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-5xl leading-11 font-bold mb-9 text-[#230c4c]">
                Helping Teams Everywhere
              </h2>
              <div className="flex flex-wrap justify-center items-center space-x-8 client-section">
                <img src={logo1} />
                <img src={logo2} />
                <img src={logo3} />
                <img src={logo4} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default hrRecruitment;
