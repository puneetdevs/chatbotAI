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
import Banner from "../../assets/Banner-imagerealstate.png";
import increaseefficiency from "../../assets/realstate/Increase-efficiency.png";
import clienthandling from "../../assets/realstate/client-handling.png";
import costeffective from "../../assets/realstate/cost-effective.png";
import enhancedcustomerexperience from "../../assets/realstate/enhanced-customer-experience.png";
import FilterPotentialClients from "../../assets/realstate/Filter-Potential-Clients.png";
import ValuableInsights from "../../assets/realstate/valuable-insights.png";
import stafftimes from "../../assets/restaurent/save-time.png";
import ctaImg3 from "../../assets/vo-agents-ai-realstatet.png";
import ModalComponent from "../../components/Modal";
import logo1 from "../../assets/logo/CodeShastra logo.png";
import logo2 from "../../assets/logo/Cyzap logo.gif";
import logo3 from "../../assets/logo/Kompanions logo.png";
import logo4 from "../../assets/logo/Orion-eSolutions-logo.png";
import Accordion from "react-bootstrap/Accordion";
import { Helmet } from "react-helmet";
const realEstate = () => {
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
        <title>AI Voice Assistant for Real Estate for Lead Generation</title>
        {/* <title>My Page Title</title> */}
        <meta name="description" content="This is a description of my page" />
        <meta name="keywords" content="react, meta tags, seo" />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="My Page Title" />
        <meta
          property="og:description"
          content="This is a description of my page"
        />
        <meta property="og:image" content="https://example.com/image.jpg" />
        <meta property="og:url" content="https://example.com/my-page" />
        <meta name="twitter:title" content="My Page Title" />
        <meta
          name="twitter:description"
          content="This is a description of my page"
        />
        <meta name="twitter:image" content="https://example.com/image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <section className="banner_wrapper industries_banner relative industries_banner_restaurent">
        <div className="navbar_wrapper">
          <Navbar />
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 banner_content">
              <h2 className="text-5xl leading-11 font-bold text-purple-700 mb-4">
                AI Voice Assistant for Real Estate Businesses
              </h2>
              <p className="text-base  leading-6">
                Gather and close more deals with VoAgents. Our voice AI solution
                for real estate helps automate inbound and outbound calls,
                provide intelligent answers to client queries, and schedule
                meetings.
                <br />
                <br />
                Our AI-based voice agent for real estate can relieve the
                workload of human staff of holding initial-level client
                conversations, handling numerous clients at a larger scale, and
                generating increased leads.
              </p>
              <ModalComponent
                show={showModal}
                handleClose={handleCloseModal}
                labelData="Request Demo"
              />
            </div>
            <div className="col-md-6 flex justify-center items-center">
              <img
                src={Banner}
                alt="AI Voice Assistant for Real Estate"
                className="inner-banner"
              />
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
                  Key Challenges Faced by Real Estate Businesses
                </h2>
                <p className="mt-3 text-purple-700">
                  The real estate sector is filled with opportunities but holds
                  a few challenges, restricting professionals from staying
                  productive.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="white-box">
                <h3 className="text-lg font-bold text-zinc-800">
                  Generating Potential Leads
                </h3>
                <p className="mt-2 text-zinc-600">
                  Lead quality is more important than quantity. Many prospects
                  connect to just explore and are not ready to make the
                  purchase, leading to time and resource wastage.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="white-box">
                <h3 className="text-lg font-bold text-zinc-800">
                  Lead Nurturing
                </h3>
                <p className="mt-2 text-zinc-600">
                  Converting prospects into clients demands building trust and
                  engagement. Many agents fail to consistently communicate with
                  clients and deliver valuable information to engage leads.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="white-box">
                <h3 className="text-lg font-bold text-zinc-800">
                  Follow-up Strategy
                </h3>
                <p className="mt-2 text-zinc-600">
                  Qualified lead generation needs to implement a follow-up
                  approach. Many real estate agents fail to follow-up, leading
                  to poor client relationships and loss of potential leads.
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
                Why Choose VoAgents for Your Real Estate Needs?
              </h2>
              <p className="mb-5">
                VoAgents automates the lead generation process with great
                accuracy, increased efficiency, and fewer <br />
                chances of errors.
              </p>
            </div>
            <div className="col-md-10 offset-md-1">
              <div className="row">
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      <img
                        src={increaseefficiency}
                        alt="increaseefficiency"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Increase Efficiency</h4>
                    <p className="text-base font-medium leading-9">
                      AI-backed voice assistants can redirect complex client
                      queries to human staff, facilitating improved
                      interactions. With VoAgents, the staff can access
                      real-time suggestions on closing deals efficiently and
                      promptly, enhancing the team's efficiency.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={clienthandling}
                        alt="Improved Client Handling"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Improved Client Handling</h4>
                    <p className="text-base font-medium leading-9">
                      VoAgents have strong conversational capabilities that help
                      handle various calls at the same time and provide accurate
                      information to the clients. Our voice AI solution further
                      follows up with the clients, nurturing customer
                      relationships and helping your business focus more on
                      closing deals.
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={enhancedcustomerexperience}
                        alt="Enhanced Customer Experience"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Enhanced Customer Experience</h4>
                    <p className="text-base font-medium leading-9">
                      VoAgents can work 24/7, unlike human staff, delivering
                      quick and accurate responses to client inquiries. Our
                      AI-backed voice assistants book virtual tours for the
                      clients, ensuring they get detailed property views and
                      enhancing their overall experience.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={costeffective}
                        alt="Costeffective"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Cost-Effective</h4>
                    <p className="text-base font-medium leading-9">
                      Get your business's inbound and outbound calls handled
                      professionally with VoAgents. Integrating such a voice AI
                      solution into your real estate operations will minimize
                      the expenses associated with infrastructure and other
                      resources to perform repetitive chores.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={FilterPotentialClients}
                        alt="FilterPotentialClients"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Filter Potential Clients</h4>
                    <p className="text-base font-medium leading-9">
                      AI voice assistant for real estate helps screen clients
                      with high conversion rates as they handle a large volume
                      of calls daily. VoAgents can identify potential buyers,
                      book virtual tours, and transfer the interactions to human
                      agents, ensuring consistent follow-ups and lead nurturing.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      <img
                        src={ValuableInsights}
                        alt="ValuableInsights"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Valuable Insights</h4>
                    <p className="text-base font-medium leading-9">
                      Alongside handling multiple calls simultaneously, VoAgents
                      gather valuable insights and record call scripts. It helps
                      serve clients better and tailor your services for improved
                      client satisfaction.
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
                See How VoAgents Interacts With Customers Across Various Sectors
              </p>
            </div>
            <div className="col-12">
              <ul className="card_list flex flex-wrap gap-3.5 justify-start card_list_restaurent">
                <AudioCard
                  avatarSrc={Avatar}
                  title="Allen AI"
                  sector="Booking Meetings"
                  subtitle="Ideal for Scheduling Meetings in Real Estate
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
                  description="Understand the customer intent, schedule meetings, and automate follow-up tasks to gather feedback."
                  audioSrc={Audio1}
                />
                <AudioCard
                  avatarSrc={Avatar6}
                  title="Adam AI"
                  sector="Generating Leads in Real Estate
                  "
                  subtitle="Perfect for Lead Qualification"
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
                  description="Reach the potential clients, make them review the project details, and schedule the viewing meeting if interested"
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
                  description="Use AI voice agents to transform customer service by addressing queries, troubleshooting, and automating support operations.
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
                  Integrate VoAgents to Real Estate Operations
                </h2>
              </div>
              <div className="mb-4 w-11/12">
                <p className="text-base text-black">
                  VoAgents is an effective AI voice agent for real estate that
                  ensures improved productivity, reduced operational expenses,
                  and enhanced client interactions
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
                <img src={ctaImg3} className="" alt="ai 3d development" />
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
                    1. What do VoAgents usually do?
                  </Accordion.Header>
                  <Accordion.Body>
                    Our AI voice agent for real estate provides in-depth
                    real-time insights on lead sources, qualifications, and
                    scheduling patterns. VoAgents monitor lead satisfaction,
                    appointment conversion rates, and response times to enhance
                    lead conversions
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    2. How does an AI voice assistant for real estate work?
                  </Accordion.Header>
                  <Accordion.Body>
                    AI voice assistant for real estate to understand the
                    customer intent, schedule meetings, and automate follow-up
                    tasks to gather feedback. In addition, it reaches potential
                    clients, makes them review the project details, and
                    schedules the viewing meeting if interested.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    3. Can I tailor VoAgents to my real estate business needs?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes, VoAgents can be tailored to your specific use case,
                    eliminating the hassles of manually calling potential
                    clients, leaving a lot of time to invest in closing deals,
                    and boosting your real estate business.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    4. Can AI voice assistants take numerous calls?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes, voice assistants can take several calls simultaneously,
                    ensuring quick responses to client calls and without making
                    the clients wait.
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
export default realEstate;
