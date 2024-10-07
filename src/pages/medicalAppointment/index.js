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
import Banner from "../../assets/Banner-healthcare.png";
import AccessPatientJourneyAnalytics from "../../assets/healthcare/Access-Patient-Journey-Analytics.png";
import ScheduleAppointmentswithEase from "../../assets/healthcare/Schedule-Appointments-with-Ease.png";
import ProcessClaimsandInsuranceVerification from "../../assets/healthcare/Process-Claims-and-Insurance-Verification.png";
import PrescriptionManagement from "../../assets/healthcare/Prescription-Management.png";
import QuickGrowth from "../../assets/healthcare/Quick-Growth.png";
import PatientEducation from "../../assets/healthcare/Patient-Education.png";


import ctaImg4 from "../../assets/vo-agents-ai-heathcare.png";
import ModalComponent from "../../components/Modal";
import logo1 from "../../assets/logo/CodeShastra logo.png";
import logo2 from "../../assets/logo/Cyzap logo.gif";
import logo3 from "../../assets/logo/Kompanions logo.png";
import logo4 from "../../assets/logo/Orion-eSolutions-logo.png";
import Accordion from "react-bootstrap/Accordion";
const MedicalAppointmentView = () => {
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
        <title>AI Voice Assistant for Healthcare | 24/7 Patient Support</title>
      
    </Helmet>
      <section className="banner_wrapper industries_banner relative industries_banner_restaurent">
        <div className="navbar_wrapper">
          <Navbar />
        </div>
        <div className="container">
        <div className="row align-items-center">
            <div className="col-md-6 banner_content">
              <h2 className="text-5xl leading-11 font-bold text-purple-700 mb-4">
              AI Voice Assistant for Healthcare Providers
              </h2>
              <p className="text-base  leading-6">
              Automate healthcare operations, improve patient engagement, and enhance sales efforts with VoAgents. Our AI voice assistant for healthcare answers patient calls 24/7, delivering exact answers and prompt calls. It can schedule patient appointments and make appointment reminder calls, reducing the strain on human staff.


                <br />
                <br />
                Leverage voice to automate your patient appointment scheduling process and provide patients the self-service convenience they expect. 
              </p>
              <ModalComponent
                show={showModal}
                handleClose={handleCloseModal}
                labelData="Request Demo"
              />
            </div>
            <div className="col-md-6 flex justify-center items-center">
              <img src={Banner} className="inner-banner" alt="AI Voice Assistant for Healthcare | 24/7 Patient Support"/>
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
                Key Challenges Faced by Healthcare Businesses
                </h2>
                <p className="mt-3 text-purple-700">
                Overbooked schedules result in patient frustration, long wait times, overburdened staff, and poor quality care. 
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="white-box">
                <h3 className="text-lg font-bold text-zinc-800">
                Inconvenient Scheduling Platforms
                </h3>
                <p className="mt-2 text-zinc-600">
                Patients find scheduling appointments on-call more convenient. However, the staff is usually inaccessible on the call which makes appointment scheduling challenging for patients
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="white-box">
                <h3 className="text-lg font-bold text-zinc-800">Patient No-Shows and Cancellations
</h3>
                <p className="mt-2 text-zinc-600">
                Patients cancel appointments last minute or miss appointments. It leads to a loss of revenue, time wastage, and delayed patient care.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="white-box">
                <h3 className="text-lg font-bold text-zinc-800">Staff and Resource<br/> Availability</h3>
                <p className="mt-2 text-zinc-600">
                Healthcare staff fail to provide timely solutions to all the patients because of increased patient traffic. It reduces organizational efficiency, increases patient frustration, and adverse patient experiences. 


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
               Why Choose VoAgents for Healthcare?
              </h2>
              <p className="mb-5">
              VoAgents execute appointment scheduling, send reminders, and manage medications <br/>and patient check-ins. 
              </p>
            </div>
            <div className="col-md-10 offset-md-1">
              <div className="row">
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      <img
                        src={ScheduleAppointmentswithEase}
                        alt="Schedule Appointments with Ease"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Schedule Appointments with Ease</h4>
                    <p className="text-base font-medium leading-9">
                    Integrate directly with Calendly for appointment setup, saving time and reducing manual efforts, ensuring that your patients get timely assistance.

                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={ProcessClaimsandInsuranceVerification}
                        alt="Process Claims and Insurance Verification"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Process Claims and Insurance Verification
</h4>
                    <p className="text-base font-medium leading-9">
                    VoAgents can help patients verify their insurance coverage, process claims, and answer common concerns related to insurance, improving patient satisfaction and reducing wait times. 

                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={PrescriptionManagement}
                        alt="Prescription Management"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Prescription Management</h4>
                    <p className="text-base font-medium leading-9">
                    An AI voice assistant can help manage prescriptions in healthcare by enabling patients to track deliveries and renew prescriptions. It sends reminders for medications and guides with the medication's benefits and potential side effects. 


                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={AccessPatientJourneyAnalytics}
                        alt="Access Patient Journey Analytics"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Access Patient Journey Analytics</h4>
                    <p className="text-base font-medium leading-9">
                    AI voice assistants gather complete data regarding patient behavior, regularity of appointments, and major health-related visits to help in better operational or clinical decisions. 

                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={QuickGrowth}
                        alt="Quick Growth"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Quick Growth</h4>
                    <p className="text-base font-medium leading-9">
                    Our AI-based voice agent is designed to scale the number of calls to increase the patient volume served and build a strong rapport as a healthcare service provider.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      <img
                        src={PatientEducation}
                        alt="Patient Education"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Patient Education</h4>
                    <p className="text-base font-medium leading-9">
                    
Voice assistants in healthcare help provide personalized services to patients, remind them about their medications, and assist thoroughly regarding medical procedures. 

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
              Various Examples of Our AI Voice Assistant in Healthcare
              </p>
            </div>
            <div className="col-12">
              <ul className="card_list flex flex-wrap gap-3.5 justify-start card_list_restaurent">
                <AudioCard
                  avatarSrc={Avatar}
                  title="Allen AI"
                  sector="Perfect for Dental Offices"
                  subtitle="Scheduling Appointments
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
                  description="Understand the patient’s health concerns and needs and then book appointments per the available slot."
                  audioSrc={Audio1}
                />
                <AudioCard
                  avatarSrc={Avatar6}
                  title="Adam AI"
                  sector="Automate Staff Interviews

                  "
                  subtitle="Perfect for Screening Candidates
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
                  description="Automate the candidate interviewing for staff recruitment and simplify the onboarding process with VoAgents."
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
                  description="Use AI voice agents to address patient queries like operation hours and time slot availability and automate support operations.
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
                Automate and Maximize Appointment Scheduling With VoAgents

                </h2>
              </div>
              <div className="mb-4 w-11/12">
                <p className="text-base text-black">
                Our AI voice agent for healthcare provides 24/7 customer support to the patients, from booking appointments to managing prescriptions, and more. 
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
                <img src={ctaImg4} className="" alt="ai 3d development" />
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
                    1. Can you mention a few use cases of AI voice assistants in healthcare?

                  </Accordion.Header>
                  <Accordion.Body>
                  Common use cases of AI voice assistants in healthcare include medication reminders, appointment bookings, patient education, data analytics, and patient support. 

                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                  2. What are the benefits of integrating an AI voice agent in healthcare facilities?
                  </Accordion.Header>
                  <Accordion.Body>
                  Integrating an AI voice agent in healthcare facilities helps reduce administrative burdens, improve communication between patients and service providers, and enhance remote patient monitoring.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                  3. Can voice AI systems understand medical terms?


                  </Accordion.Header>
                  <Accordion.Body>
                  AI-backed voice agents leverage natural language processing and machine learning algorithms to continually improve their capability of understanding medical terminologies and enhance service accuracy with time.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                  4. What can I expect by integrating VoAgents into my healthcare services?

                  </Accordion.Header>
                  <Accordion.Body>
                  VoAgents will help handle remote patient monitoring, automate telehealth appointment scheduling, and provide virtual consultations. Thus, ensuring you deliver the best possible patient care. 
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
export default MedicalAppointmentView;
