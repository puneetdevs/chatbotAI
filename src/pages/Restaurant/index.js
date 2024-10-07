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
import Clock from "../../assets/clock-icon.svg";
import Appointment from "../../assets/appointment.png";
import Filter from "../../assets/filter.png";
import Banner from "../../assets/Banner-image-restarurent.png";
import times from "../../assets/restaurent/time.png";
import roi from "../../assets/restaurent/roi.png";
import labor from "../../assets/restaurent/reduce-labor.png";
import customersevice from "../../assets/restaurent/chat-bot.png";
import odring from "../../assets/restaurent/order-food.png";
import stafftimes from "../../assets/restaurent/save-time.png";
import ctaImg2 from "../../assets/vo-agents-ai-restaurent.png";
import ModalComponent from "../../components/Modal";
import logo1 from "../../assets/logo/CodeShastra logo.png";
import logo2 from "../../assets/logo/Cyzap logo.gif";
import logo3 from "../../assets/logo/Kompanions logo.png";
import logo4 from "../../assets/logo/Orion-eSolutions-logo.png";
import Accordion from "react-bootstrap/Accordion";
import { Helmet } from 'react-helmet';
const restaurants = () => {
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
    <title>AI Voice Assistant for Restaurants Food Ordering System</title>
    </Helmet>
      <section className="banner_wrapper industries_banner relative industries_banner_restaurent">
        <div className="navbar_wrapper">
          <Navbar />
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 banner_content">
              <h2 className="text-5xl leading-11 font-bold text-purple-700 mb-4">
                Conversational AI Voice Assistant for Restaurant
              </h2>
              <p className="text-base  leading-6">
                VoAgents is a simple-to-use AI voice agent for restaurants that
                accepts multiple phone orders at once and processes them quickly
                and accurately. Our AI-powered voice assistant is easy to
                personalize, simplifying your restaurant to answer all your
                phone calls, including ones about operation hours, menus,
                locations, wait times, deliveries, policies, promotions,
                reservations, and more.
                <br />
                <br />
                Our AI voice assistant for restaurants is specifically designed
                to help eatery businesses save money, simplify operations,
                manage and service customer efficiency, and enhance customer
                experiences.
              </p>
              <ModalComponent
                show={showModal}
                handleClose={handleCloseModal}
                labelData="Request Demo"
              />
            </div>
            <div className="col-md-6 flex justify-center items-center">
              <img src={Banner} className="inner-banner" alt="AI Voice Assistant for Restaurants Food Ordering System"/>
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
                  Key Issues Faced by Restaurants
                </h2>
                <p className="mt-3 text-purple-700">
                  Whether you own a small food chain or are a business owner of
                  a well-established restaurant, you may face challenges that
                  limit access to your business growth.
                </p>
              </div>
            </div>

            <div className="col-md-3">
              <div className="white-box">
                <h3 className="text-lg font-bold text-zinc-800">
                  Increased Expenses
                </h3>
                <p className="mt-2 text-zinc-600">
                  There's an increase in expenditures and growth is limited as
                  the order volume rises.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="white-box">
                <h3 className="text-lg font-bold text-zinc-800">Lost Revenue</h3>
                <p className="mt-2 text-zinc-600">
                  Failing to serve customers on calls or in person during peak
                  hours.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="white-box">
                <h3 className="text-lg font-bold text-zinc-800">Growth Hassles</h3>
                <p className="mt-2 text-zinc-600">
                  Unable to handle the rise in demand for phone orders placed
                  off-site.
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
                Why Choose VoAgents for Your Restaurant?
              </h2>
              <p className="mb-5">
                Our voice AI helps restaurants address common concerns of this
                digital world. You can tailor <br />
                VoAgents to your specific restaurant requirements and automate
                customer interactions with ease.
              </p>
            </div>
            <div className="col-md-10 offset-md-1">
              <div className="row">
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      <img
                        src={times}
                        alt="Appointment"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Alleviates Wait Times</h4>
                    <p className="text-base font-medium leading-9">
                      No need to choose between answering the phone call or
                      serving the customer who's in front of you. VoAgents
                      answer every call on the first ring and can process
                      transactions quickly and without keeping callers waiting.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={roi}
                        alt="Appointment"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Increased ROI</h4>
                    <p className="text-base font-medium leading-9">
                      Get as much business as your kitchen can handle. Our Voice
                      AI can process multiple orders simultaneously. Experience
                      consistent, dynamic upselling that boosts revenue and
                      sales every time. 
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={labor}
                        alt="Appointment"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Reduced Labor Requirement</h4>
                    <p className="text-base font-medium leading-9">
                      Our Voice AI assistant helps manage the order-taking
                      process. Human personnel can concentrate more on
                      high-value tasks like attending to customers and meeting
                      their requirements, reducing the labor costs per order by
                      reducing the labor needs for order taking.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={customersevice}
                        alt="Appointment"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Excellent Customer Service</h4>
                    <p className="text-base font-medium leading-9">
                      Voice AI provides 24/7 customer assistance, providing
                      prompt and relevant answers to customer queries. VoAgents
                      makes order booking and table reservations hassle-free,
                      acting as a perfect solution to improving your customer
                      experience.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      {" "}
                      <img
                        src={odring}
                        alt="Appointment"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Accurate Ordering</h4>
                    <p className="text-base font-medium leading-9">
                      Collecting inaccurate information or misinterpreting the
                      orders can result in serving the wrong food items,
                      resulting in complaints from customers. With voice AI, the
                      need for manual labor is reduced and automatically
                      minimizes mistakes while placing food orders.
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="lead_cont_choose">
                    <div className="why-choose-icons">
                      <img
                        src={stafftimes}
                        alt="Appointment"
                        className="w-14 display m-auto"
                      />
                    </div>
                    <h4>Saves Staff Time</h4>
                    <p className="text-base font-medium leading-9">
                      Cut down on the time and expenses associated with staff
                      hiring, training, and onboarding process. VoAgents, an
                      AI-backed voice assistant acts as a staff member that
                      automates the repetitive tasks of order-taking, increasing
                      the overall productivity.
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
                  sector="Perfect for Restaurants"
                  subtitle="Take Pizza Order"
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
                  description="Handle Piza shop inbound calls, Ask what pizza you want, and get it delivered to your doorstep, takeout, or pickup."
                  audioSrc={Audio1}
                />
                <AudioCard
                  avatarSrc={Avatar6}
                  title="Adam AI"
                  sector="Restaurant table booking"
                  subtitle="Book tables at restaurants in your area"
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
                  description=" Book table at restaurant, ask for number of people, and time for booking."
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
                  description="Use AI voice agents to transform customer service by addressing queries, troubleshooting, and automating support operations."
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
                  Explore VoAgents for Your Unique Restaurant Needs
                </h2>
              </div>
              <div className="mb-4 w-11/12">
                <p className="text-base text-black">
                  VoAgents is the new-gen AI voice agent for restaurants that
                  automates the calling and order-taking process while enhancing
                  efficient customer service.
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
                <img src={ctaImg2} className="" alt="ai 3d development" />
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
                    1. How do AI Voice Ordering Systems Benefit Restaurants?
                  </Accordion.Header>
                  <Accordion.Body>
                    AI voice ordering systems benefit restaurant businesses in
                    numerous ways. It enhances order accuracy, reduces wait
                    times, and boosts customer convenience. In addition, voice
                    AI simplifies the ordering process. Thus, increasing
                    efficiency and customer satisfaction.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    2. Where can I integrate VoAgents into my restaurant
                    business?
                  </Accordion.Header>
                  <Accordion.Body>
                    You can integrate VoAgents into several key touchpoints of
                    your restaurant businesses. For example, incorporate it in
                    the order-taking process, inbound and outbound calling for
                    reservations, or customer service systems. It will help
                    simplify multiple restaurant operations and enhance the
                    customer dining experience simultaneously.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    3. Is VoAgents capable of handling multiple calls
                    simultaneously?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes. VoAgents can take large numbers of calls at the same
                    time, eliminating the need to put customers on hold.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    4. What technology do AI voice assistants use?
                  </Accordion.Header>
                  <Accordion.Body>
                    AI voice assistants utilize special algorithms such as
                    natural language processing and machine learning models to
                    understand speech, learn from patterns, and generate spoken
                    responses back to the users.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    5. Is VoAgents affordable?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes, VoAgents comes at an affordable price. For detailed
                    pricing, contact us at
                    <Link to="/real-estate">contact@voagents.ai.</Link>
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
export default restaurants;
