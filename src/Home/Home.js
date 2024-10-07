import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import VoiceAgent from "./componenets/VoiceAgent";
import Navbar from "./componenets/Navbar";
import "./index.css";
import { Helmet } from "react-helmet";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";

const Home = () => {
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState("1");
  const [active, setActive] = useState(true);
  const { isLoaded, isSignedIn } = useAuth();
  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn]);

  const assistant = "42be7e8a-58f0-42bf-a811-85c67f7652de";
  const navigate = useNavigate();
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

        //       setShow1(id.target.attributes.id.value);
        //       setShow(true);
        //       setActive(true);
        //     }
        //   } else {
        //     setShow1(id.target.attributes.id.value);
        //     setShow(!show);
        //     setActive(true);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>
          new VoAgents: Your Personal AI Voice Assistant | AI Voice Agent
        </title>
      </Helmet>
      <section className="banner_wrapper relative">
        <div className="navbar_wrapper">
          <Navbar />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 banner_content">
              <h2 className="text-5xl leading-11 font-bold text-purple-700 mb-2 text-br">
                AI Voice Assistants:
                <br />
                Human-Like, Efficient, and Affordable
              </h2>
              <p className="text-base font-medium leading-9 text-br">
                AI voice assistants to make outbound calls, answer inbound
                <br /> calls, and schedule appointments 24/7!
              </p>
              <div className="logSign">
                {!isSignedIn ? (
                  <>
                    <SignInButton
                      afterSignInUrl={"/dashboard"}
                      redirectUrl={"/dashboard"}
                    >
                      <button
                        type="button"
                        className="btn btn btn-lg  button-with-margin"
                      >
                        Log-In
                      </button>
                    </SignInButton>
                    <SignUpButton
                      afterSignUpUrl={"/dashboard"}
                      redirectUrl={"/dashboard"}
                    >
                      <button
                        type="button"
                        className="btn btn btn-lg  button-with-margin"
                      >
                        Sign-Up
                      </button>
                    </SignUpButton>
                  </>
                ) : null}
              </div>
            </div>

            <div className="col-md-6 flex justify-center items-center">
              <VoiceAgent agentId={assistant} />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-20 useCases">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <button className="text-base group inline-flex cursor-pointer items-center justify-center gap-4  uppercase  text-[#230c4c] mx-auto">
              Use cases
            </button>
          </div>
          <div className="mt-2 mb-3 text-center">
            <h2 className="mb-2 text-5xl font-bold leading-11 text-[#230c4c] ">
              Solutions for everything
            </h2>
            <div className="mx-auto w-full sm:w-3/5">
              <p className="text-base font-medium leading-7 text-black ">
                Automate inbound and outbound calls and maximize customer
                support impact in real estate, healthcare, financial services,
                logistics, and other business niches.
              </p>
            </div>
          </div>

          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Inbound calls">
              <div className="flex gap-3">
                <div className="card-body w-3/12 flex">
                  <li className="card  w-full card_shadow p-3">
                    <div className="flex flex-wrap">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-2">
                          <img src={realstate} className="img-40" alt="realesate"/>
                          <h4 className="text-base font-bold">Real Estate</h4>
                        </div>

                        <div className="dropdown">
                          <button
                            className=" dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="w-full mb-2 text-black">
                        Set up meetings for property viewings and address
                        customer queries regarding property legalities,
                        transactions, and paperwork.
                      </p>
                    </div>
                  </li>
                </div>
                <div className="card-body w-3/12 flex">
                  <li className="card  card_shadow p-3 w-full">
                    <div className="flex flex-wrap">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-2">
                          <img src={tele} className="img-40" alt="Telehealth Services"/>
                          <h4 className="text-base font-bold">
                            Telehealth Services
                          </h4>
                        </div>

                        <div className="dropdown">
                          <button
                            className=" dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="mb-2 text-black">
                        Schedule appointments and provide quick responses to
                        patient's common queries without human intervention
                      </p>
                    </div>
                  </li>
                </div>
                <div className="card-body w-3/12 flex">
                  <li className="card  card_shadow p-3 w-full">
                    <div className="flex flex-wrap">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-2">
                          <img src={restaurent} className="img-40" alt="Restaurants"/>
                          <h4 className="text-base font-bold">Restaurants</h4>
                        </div>

                        <div className="dropdown">
                          <button
                            className=" dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="mb-2 text-black">
                        Voice Assistants meet all the needs, from table
                        reservations to inquiring about menus and beyond.
                      </p>
                    </div>
                  </li>
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <div className="card-body w-3/12 flex">
                  <li className="card  w-full card_shadow p-3">
                    <div className="flex flex-wrap">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-2">
                          <img src={banking} className="img-40" alt="Banking and Finance"/>

                          <h4 className="text-base font-bold">
                            Banking and Finance
                          </h4>
                        </div>

                        <div className="dropdown">
                          <button
                            className=" dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="w-full mb-2 text-black">
                        Helps handle legal claims and provides support on
                        negotiation and debt collection.
                      </p>
                    </div>
                  </li>
                </div>
                <div className="card-body w-3/12 flex">
                  <li className="card  card_shadow p-3 w-full">
                    <div className="flex flex-wrap">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-2">
                          <img src={restaurent} className="img-40" alt="Recruitment"/>
                          <h4 className="text-base font-bold">Recruitment</h4>
                        </div>

                        <div className="dropdown">
                          <button
                            className=" dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="mb-2 text-black">
                        Assist in sourcing and screening candidates, increasing
                        hiring rates, and automating follow-ups with the
                        candidates.
                      </p>
                    </div>
                  </li>
                </div>
                <div className="card-body w-3/12 flex">
                  <li className="card  card_shadow p-3 w-full">
                    <div className="flex flex-wrap">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-2">
                          <img src={callcenter} className="img-40" alt="Call Centers"/>
                          <h4 className="text-base font-bold">Call Centers</h4>
                        </div>

                        <div className="dropdown">
                          <button
                            className=" dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="mb-2 text-black">
                        Automates handling huge call volumes and mitigates calls
                        during peak times.
                      </p>
                    </div>
                  </li>
                </div>
              </div>
            </Tab>
            <Tab eventKey="profile" title="Outbound calls">
              <div className="flex gap-3">
                <div className="card-body w-3/12 flex">
                  <li className="card  w-full card_shadow p-3">
                    <div className="flex flex-wrap">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-2">
                          <img src={survey} className="img-40" />
                          <h4 className="text-base font-bold">
                            Surveys and Feedback Gathering
                          </h4>
                        </div>

                        <div className="dropdown">
                          <button
                            className=" dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="w-full mb-2 text-black">
                        Collect customer insights to meet customer preferences
                        and satisfaction
                      </p>
                    </div>
                  </li>
                </div>
                <div className="card-body w-3/12 flex">
                  <li className="card  card_shadow p-3 w-full">
                    <div className="flex flex-wrap">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-2">
                          <img src={leads} className="img-40" />
                          <h4 className="text-base font-bold">
                            Qualifying Leads
                          </h4>
                        </div>

                        <div className="dropdown">
                          <button
                            className=" dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="mb-2 text-black">
                        Screen potential clients and execute interactions.
                      </p>
                    </div>
                  </li>
                </div>
                <div className="card-body w-3/12 flex">
                  <li className="card  card_shadow p-3 w-full">
                    <div className="flex flex-wrap">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-2">
                          <img src={Financ} className="img-40" />
                          <h4 className="text-base font-bold">
                            Finance Services
                          </h4>
                        </div>

                        <div className="dropdown">
                          <button
                            className=" dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="mb-2 text-black">
                        Negotiate repayments and collect the debt
                      </p>
                    </div>
                  </li>
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <div className="card-body w-3/12 flex">
                  <li className="card  card_shadow p-3 w-full">
                    <div className="flex flex-wrap">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-2">
                          <img src={Recruitment1} className="img-40" />
                          <h4 className="text-base font-bold">Recruitment</h4>
                        </div>

                        <div className="dropdown">
                          <button
                            className=" dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="mb-2 text-black">
                        Reduce workload and fasten the hiring process
                      </p>
                    </div>
                  </li>
                </div>
                <div className="card-body w-3/12 flex">
                  <li className="card  card_shadow p-3 w-full">
                    <div className="flex flex-wrap">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-2">
                          <img src={healthcare} className="img-40" />
                          <h4 className="text-base font-bold">
                            Healthcare Check-ins
                          </h4>
                        </div>

                        <div className="dropdown">
                          <button
                            className=" dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="mb-2 text-black">
                        Schedule appointments and monitor patient health
                      </p>
                    </div>
                  </li>
                </div>
                <div className="card-body w-3/12 flex">
                  <li className="card  card_shadow p-3 w-full">
                    <div className="flex flex-wrap">
                      <div className="flex items-center justify-between w-full mb-3">
                        <div className="flex items-center gap-2">
                          <img src={Food} className="img-40" />
                          <h4 className="text-base font-bold">Food Delivery</h4>
                        </div>

                        <div className="dropdown">
                          <button
                            className=" dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <p className="mb-2 text-black">
                        Share updates regarding food order status and delivery
                        timelines
                      </p>
                    </div>
                  </li>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </section> */}

      {/* CTA section
      <section className="bg-purple-200 overflow-visible mt-30 cta_wrapper">
        <div className="container mx-auto">
          <div className="flex items-center pt-10 pb-12 justify-between">
            <div className="w-3/5 pl-11 cta_cnt">
              <div className="mb-4">
                <h2 className="mb-2 text-4xl font-bold leading-11 text-[#230c4c]">
                  Looking to Automate Your Business Processes?
                </h2>
              </div>
              <div className="mb-4 w-11/12">
                <p className="text-base text-black">
                  VoAgents is a simple, scalable, and reliable AI voice
                  assistant that is easy to customize based on your unique
                  business needs. It is capable of handling several inbound and
                  outbound calls simultaneously.
                </p>
              </div>

              <ContactFormModal/>
            </div>

            <div className="relative top-[49px]">
              <div className="img-cta-button">
                <img                                  
                  src={ctaImg}
                  className=""
                  alt="ai 3d development" 
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className=" services_wrapper " id="sector">
        <div className="container">
          <div className="row">
            <div className="mb-5 text-center col-12 pt-20 ">
              <h2 className="mb-2 text-5xl font-bold leading-11 text-[#230c4c]">
                Sectors
              </h2>
              <p className="text-base font-medium leading-7 text-black">
                See How VoAgents Interacts With Customers Across Various Sectors
              </p>
            </div>
            <div className="col-12">
              <ul className="card_list flex flex-wrap gap-3.5 justify-start">
                <AudioCard
                  avatarSrc={Avatar}
                  title="Alexander"
                  sector="Perfect for Dental Offices"
                  subtitle="Scheduling Appointments"
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
                  description=" Identify the intentions and availability of your customers, schedule meetings, and automate follow-up tasks depending on the conversations."
                  audioSrc={Audio1}
                />
                <AudioCard
                  avatarSrc={Avatar2}
                  title="Amelia"
                  sector="Personal Conversations"
                  subtitle="Perfect for AI powered conversations"
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
                  description="   You can play pranks on your friends by inviting them to 'Who Wants To Be A Millionaire?' or chat with your new AI friend using voice assistants. "
                  audioSrc={Audio2}
                />
                <AudioCard
                  avatarSrc={Avatar3}
                  title="Eva"
                  sector="Customer Support"
                  subtitle="Perfect for Customer Support application"
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
                  description="Use AI voice agents to transform customer service by addressing queries, troubleshooting, and automating supporting operations."
                  audioSrc={Audio3}
                />
                <AudioCard
                  avatarSrc={Avatar4}
                  title="James"
                  sector="Interviews"
                  subtitle="Perfect for screening candidates"
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
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      ></path>
                    </svg>
                  }
                  description=" Automate the first interview, candidate screening, and onboarding with the assistance of AI voice agents. "
                  audioSrc={Audio4}
                />
                <AudioCard
                  avatarSrc={Avatar5}
                  title="Mia"
                  sector="Banking and Loan EMI"
                  subtitle="Perfect for EMI reminders and loan approval"
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
                  description="Automate client communications for loan and insurance needs, such as defaulter management and EMI collections."
                  audioSrc={Audio5}
                />
                <AudioCard
                  avatarSrc={Avatar6}
                  title="Samuel"
                  sector="Lead Generation"
                  subtitle="Perfect for qualify leads"
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
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                      ></path>
                    </svg>
                  }
                  description="Utilize AI voice assistants to qualify leads, effectively determining their level of interest and intent to optimize the sales funnel."
                  audioSrc={Audio6}
                />
                <AudioCard
                  avatarSrc={Avatar}
                  title="Sophia"
                  sector="Perfect for Dental Offices"
                  subtitle="Scheduling Appointments"
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
                  description="Recognize the customer intent, then plan meetings, appointments, and follow-up tasks based on your conversations."
                  audioSrc={Audio1}
                />
                <AudioCard
                  avatarSrc={Avatar2}
                  title="William"
                  sector="Personal Conversations"
                  subtitle="Perfect for AI powered conversations"
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
                  description="You may play pranks on your friends by inviting them to 'Who Wants To Be A Millionaire?' or you can chat with your new AI bestie."
                  audioSrc={Audio2}
                />
              </ul>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="client-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="mb-5 text-5xl font-bold leading-11 text-[#230c4c]">
                VoAgents in Action Across Multiple Verticals
              </h2>
            </div>
          </div>
          <Carousel>
            <Carousel.Item>
              <Carousel.Caption>
                <section>
                  <div className="mx-auto w-full px-5 pb-14 mobile_padding">
                    <div className="relative mx-auto flex flex-col items-center gap-20 flex-control">
                      <div className="grid w-full  gap-8 grid-cols-2">
                        <div className="relative sky bg-hx aspect-square h-auto w-full overflow-hidden rounded-lg border border-tan-500 px-5 py-5 img_slider">
                          <div>
                            <div className="video-gif">
                              <img src={viedo55} />
                            </div>
                            <div className="voice-clip-message">
                              <Link
                                to="/real-estate"
                                className="voice-assistant-button"
                              >
                                <img src={micIcon} />
                              </Link>
                            </div>
                            <p>
                              <a href="#"></a>
                            </p>
                          </div>
                          <div className="absolute bottom-8 flex w-full">
                            <Link
                              to="/real-estate"
                              className="text-base font-bold group inline-flex cursor-pointer items-center justify-center gap-4 rounded-full  uppercase  transition-colors delay-75 h-14 border px-8 py-2.5 bg-[#7c3aed] text-white border-[#7c3aed] hover:border-[#230c4c] hover:bg-[#230c4c] active:border-[#230c4c] active:bg-[#230c4c] mx-auto"
                              data-dd-action-name="Try demo"
                              data-action="Try demo"
                            >
                              Try demo
                            </Link>
                          </div>
                        </div>
                        <div className="flex h-full flex-col justify-between gap-12 p-4 w-full rounded-lg bg-purple-200">
                          <div className="relative flex h-full flex-col justify-between gap-12 p-4 flex-control">
                            <div className="flex w-full flex-col gap-6 text-left text-left">
                              <div className="flex items-center gap-4  uppercase font-medium text-base text-[#230c4c]">
                                REAL ESTATE
                              </div>
                              <h5 className="font-sans  text-4xl  font-normal ">
                                <span className="inline-block align-top decoration-inherit text-balance  font-bold text-[#230c4c]">
                                  AI Voice Agents for Improved Client Engagement
                                </span>
                              </h5>
                              <p className=" text-base text-black w-4/5 ">
                                Handle multiple inquiries simultaneously,
                                minimize wait times for clients, and provide
                                prompt responses with VoAgents. Built with
                                advanced capabilities, VoAgents can automate
                                workflows, reduce manual workloads, and ensure
                                improved business efficiency.
                              </p>
                            </div>
                            <div className="flex flex-col flex-wrap items-start gap-4 w-fit shrink-0 ">
                              <Link
                                className=" text-base font-bold group inline-flex cursor-pointer items-center justify-center gap-4 rounded-full  uppercase  transition-colors delay-75 h-14 border px-8 py-2.5 bg-[#7c3aed] text-white border-[#7c3aed] hover:border-[#230c4c] hover:bg-[#230c4c] active:border-[#230c4c] active:bg-[#230c4c]"
                                data-dd-action-name=""
                                data-action=""
                                to="/real-estate"
                              >
                                Learn more
                                <span className="relative overflow-hidden shrink-0"></span>
                              </Link>
                            </div>
                            <div className="absolute svg-dots">
                              <svg
                                width="110"
                                height="162"
                                viewBox="0 0 110 162"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="3"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption>
                <section>
                  <div className="mx-auto w-full px-5 pb-14 pt-0 mobile_padding">
                    <div className="relative mx-auto flex flex-col items-center gap-20 flex-control">
                      <div className="grid w-full  gap-8 grid-cols-2">
                        <div className="relative sky bg-hx aspect-square h-auto w-full overflow-hidden rounded-lg border border-tan-500 px-5 py-5 img_slider">
                          <div>
                            <div className="video-gif">
                              <img src={viedo3} />
                            </div>
                            <div className="voice-clip-message">
                              <Link
                                to="/recruitment"
                                className="voice-assistant-button"
                              >
                                <img src={micIcon} />
                              </Link>
                            </div>
                            <p>
                              <a href="#"></a>
                            </p>
                          </div>
                          <div className="absolute bottom-8 flex w-full">
                            <Link
                              to="/recruitment"
                              className="text-base font-bold group inline-flex cursor-pointer items-center justify-center gap-4 rounded-full  uppercase  transition-colors delay-75 h-14 border px-8 py-2.5 bg-[#7c3aed] text-white border-[#7c3aed] hover:border-[#230c4c] hover:bg-[#230c4c] active:border-[#230c4c] active:bg-[#230c4c] mx-auto"
                              data-dd-action-name="Try demo"
                              data-action="Try demo"
                            >
                              Try demo
                            </Link>
                          </div>
                        </div>
                        <div className="flex h-full flex-col justify-between gap-12 p-4 w-full rounded-lg bg-purple-200">
                          <div className="relative flex h-full flex-col justify-between gap-12 p-4">
                            <div className="flex w-full flex-col gap-6 text-left">
                              <div className="flex items-center gap-4  uppercase font-medium text-base text-[#230c4c]">
                                Recruitment
                              </div>
                              <h5 className="font-sans  text-4xl  font-normal ">
                                <span className="inline-block align-top decoration-inherit text-balance font-bold text-[#230c4c]">
                                  Simplify Recruitment and Candidate Experience
                                  With AI
                                </span>
                              </h5>
                              <p className=" text-base text-black w-4/5 ">
                                Alleviate the burden on the recruitment
                                workforce and expedite the hiring process.
                                VoAgents save the time of HR to execute mundane
                                tasks and deflect their focus to more productive
                                tasks like candidate engagement and employee
                                retention.
                              </p>
                            </div>
                            <div className="flex  flex-col flex-wrap items-start gap-4 w-fit shrink-0 ">
                              <Link
                                className="text-base font-bold group inline-flex cursor-pointer items-center justify-center gap-4 rounded-full  uppercase  transition-colors delay-75 h-14 border px-8 py-2.5 bg-[#7c3aed] text-white border-[#7c3aed] hover:border-[#230c4c] hover:bg-[#230c4c] active:border-[#230c4c] active:bg-[#230c4c]"
                                data-dd-action-name=""
                                data-action=""
                                to="/recruitment"
                              >
                                Learn more
                                <span className="relative overflow-hidden shrink-0"></span>
                              </Link>
                            </div>
                            <div className="absolute svg-dots">
                              <svg
                                width="110"
                                height="162"
                                viewBox="0 0 110 162"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="3"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption>
                <section>
                  <div className="mx-auto w-full px-5 pb-14 pt-0 mobile_padding">
                    <div className="relative mx-auto flex flex-col items-center gap-20 flex-control">
                      <div className="grid w-full  gap-8 grid-cols-2">
                        <div className="relative sky bg-hx aspect-square h-auto w-full overflow-hidden rounded-lg border border-tan-500 px-5 py-5 img_slider">
                          <div>
                            <div className="video-gif">
                              <img src={viedo2} />
                            </div>
                            <div className="voice-clip-message">
                              <Link
                                to="/medical-appointments"
                                className="voice-assistant-button"
                              >
                                <img src={micIcon} />
                              </Link>
                            </div>
                            <p>
                              <a href="#"></a>
                            </p>
                          </div>
                          <div className="absolute bottom-8 flex w-full">
                            <Link
                              to="/medical-appointments"
                              className="text-base font-bold group inline-flex cursor-pointer items-center justify-center gap-4 rounded-full  uppercase  transition-colors delay-75 h-14 border px-8 py-2.5 bg-[#7c3aed] text-white border-[#7c3aed] hover:border-[#230c4c] hover:bg-[#230c4c] active:border-[#230c4c] active:bg-[#230c4c] mx-auto"
                              data-dd-action-name="Try demo"
                              data-action="Try demo"
                            >
                              Try demo
                            </Link>
                          </div>
                        </div>
                        <div className="flex h-full flex-col justify-between gap-12 p-4 w-full rounded-lg bg-purple-200">
                          <div className="relative flex h-full flex-col justify-between gap-12 p-4 flex-control">
                            <div className="flex w-full flex-col gap-6 text-left">
                              <div className="flex items-center gap-4  uppercase font-medium text-base text-[#230c4c]">
                                Healthcare
                              </div>
                              <h5 className="font-sans  text-4xl  font-normal ">
                                <span className="inline-block align-top decoration-inherit text-balance  font-bold text-[#230c4c]">
                                  Optimize Administrative Efficiency and Patient
                                  Communication
                                </span>
                              </h5>
                              <p className=" text-base text-black w-4/5 ">
                                Integrate VoAgents into your healthcare business
                                to ease appointment bookings for patients and
                                simplify the process of answering patient
                                queries. Expect accurate real-time data capture,
                                no-show rates, and improved adherence to
                                appointments scheduled.
                              </p>
                            </div>
                            <div className="flex flex-col flex-wrap items-start gap-4 w-fit shrink-0 ">
                              <Link
                                className=" text-base font-bold group inline-flex cursor-pointer items-center justify-center gap-4 rounded-full  uppercase  transition-colors delay-75 h-14 border px-8 py-2.5 bg-[#7c3aed] text-white border-[#7c3aed] hover:border-[#230c4c] hover:bg-[#230c4c] active:border-[#230c4c] active:bg-[#230c4c]"
                                data-dd-action-name=""
                                data-action=""
                                to="/medical-appointments"
                              >
                                Learn more
                                <span className="relative overflow-hidden shrink-0"></span>
                              </Link>
                            </div>
                            <div className="absolute svg-dots">
                              <svg
                                width="110"
                                height="162"
                                viewBox="0 0 110 162"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="3"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <Carousel.Caption>
                <section>
                  <div className="mx-auto w-full px-5 py-0 mobile_padding">
                    <div className="relative mx-auto flex flex-col items-center gap-20 flex-control">
                      <div className="grid w-full  gap-8 grid-cols-2">
                        <div className="relative sky bg-hx aspect-square h-auto w-full overflow-hidden rounded-lg border border-tan-500 px-5 py-5 img_slider">
                          <div>
                            <div className="video-gif">
                              <img src={viedo4} />
                            </div>
                            <div className="voice-clip-message">
                              <Link
                                to="/restaurants"
                                className="voice-assistant-button"
                              >
                                <img src={micIcon} />
                              </Link>
                            </div>
                            <p>
                              <a href="#"></a>
                            </p>
                          </div>
                          <div className="absolute bottom-8 flex w-full">
                            <Link
                              to="/restaurants"
                              className="text-base font-bold group inline-flex cursor-pointer items-center justify-center gap-4 rounded-full  uppercase  transition-colors delay-75 h-14 border px-8 py-2.5 bg-[#7c3aed] text-white border-[#7c3aed] hover:border-[#230c4c] hover:bg-[#230c4c] active:border-[#230c4c] active:bg-[#230c4c] mx-auto"
                              data-dd-action-name="Try demo"
                              data-action="Try demo"
                            >
                              Try demo
                            </Link>
                          </div>
                        </div>
                        <div className="flex h-full flex-col justify-between gap-12 p-4 w-full rounded-lg bg-purple-200">
                          <div className="relative flex h-full flex-col justify-between gap-12 p-4 flex-control">
                            <div className="flex w-full flex-col gap-6 text-left">
                              <div className="flex items-center gap-4  uppercase font-medium text-base text-[#230c4c]">
                                Restaurants
                              </div>
                              <h5 className="font-sans  text-4xl  font-normal ">
                                <span className="inline-block align-top decoration-inherit text-balance font-bold text-[#230c4c]">
                                  Enhance Restaurant Operations and Dining
                                  Experiences
                                </span>
                              </h5>
                              <p className=" text-base text-black w-4/5 ">
                                Maximize sales and free up staff time with
                                VoAgents. It can take orders simultaneously even
                                during peak hours, increasing the orders and
                                raising the value of your restaurant. Eliminate
                                the constant need to hire and train staff to
                                answer phone calls.
                              </p>
                            </div>
                            <div className="flex flex-col flex-wrap items-start gap-4 w-fit shrink-0 ">
                              <Link
                                className="text-base font-bold group inline-flex cursor-pointer items-center justify-center gap-4 rounded-full  uppercase  transition-colors delay-75 h-14 border px-8 py-2.5 bg-[#7c3aed] text-white border-[#7c3aed] hover:border-[#230c4c] hover:bg-[#230c4c] active:border-[#230c4c] active:bg-[#230c4c]"
                                data-dd-action-name=""
                                data-action=""
                                to="/restaurants"
                              >
                                Learn more
                                <span className="relative overflow-hidden shrink-0"></span>
                              </Link>
                            </div>
                            <div className="absolute svg-dots">
                              <svg
                                width="110"
                                height="162"
                                viewBox="0 0 110 162"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="3"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="3"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="29"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="55"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="81"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="107"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="133"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="3"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="29"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="55"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="81"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                                <circle
                                  cx="107"
                                  cy="159"
                                  r="3"
                                  fill="currentColor"
                                ></circle>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </section> */}
      {/* <section className="faq_wrapper" id="faq">
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
                    1. What information do you require to build a custom AI Voice Agent for my business?
                  </Accordion.Header>
                  <Accordion.Body>
                  We need in-depth details of your respective business processes, customer interaction scenarios, preferred voice features, integration necessities, 
                  and any specific capabilities you want to be integrated into the agent.


                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                  2. Is VoAgents.AI capable of understanding complex documents?

                  </Accordion.Header>
                  <Accordion.Body>
                  Yes, VoAgents.AI is prepared on huge amounts of datasets with the capability to understand complex language structures, facilitating easy processing of data provided by users in their respective niches. 
             </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                  3. Do VoAgents Work Across the Globe?



                  </Accordion.Header>
                  <Accordion.Body>
                  Yes, VoAgents can make inbound and outbound calls in different parts of the world. You can contact the team at contact@voagents.ai for region confirmation.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                  4. What types of documents can VoAgents.AI process?

                  </Accordion.Header>
                  <Accordion.Body>
                  VoAgents.AI can process varying documents, including reports, emails, technical guides, articles, and more. Also, it can handle data in diverse formats such as docs, plain text, images, and PDFs.

                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                  4. What types of documents can VoAgents.AI process?

                  </Accordion.Header>
                  <Accordion.Body>
                  VoAgents.AI can process varying documents, including reports, emails, technical guides, articles, and more. Also, it can handle data in diverse formats such as docs, plain text, images, and PDFs.

                  </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                  5. Can I customize the AI agent with my company’s data?

                  </Accordion.Header>
                  <Accordion.Body>
                  VoAgents.AI can be fine-tuned into a custom language model by gathering insights from previous companies' conversational data. You can contact our team to inquire more in detail regarding customization.

                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="6">
                  <Accordion.Header>
                  6. What are the benefits of using VoAgents.AI?


                  </Accordion.Header>
                  <Accordion.Body>
                  A few benefits include 24/7 availability, quick response times, improved customer satisfaction, affordability, and the ability to handle multiple calls simultaneously. 


                  </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="7">
                  <Accordion.Header>
                  7. What systems can VoAgents integrate with?

                  </Accordion.Header>
                  <Accordion.Body>
                  Our AI Voice Agents support integration with a wide range of systems including CRM platforms, payment gateways, call center software, and various third-party APIs.


                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="8">
                  <Accordion.Header>
                  8. What happens if your AI Voice Agent faces an issue it cannot handle?


                  </Accordion.Header>
                  <Accordion.Body>
                  In such a scenario, the VoAgent can seamlessly transfer the call to a human representative. They can better assist in resolving customer issues efficiently.


                  </Accordion.Body>
                </Accordion.Item>
                
              </Accordion>
            </div>
          </div>
        </div>
      </section> */}
      {/* <section className="clients_wrapper">
        <div className="container">
          <div className="bg-white dark:bg-zinc-900 pb-20">
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
      </section> */}

      {/* <Footer /> */}
    </>
  );
};

export default Home;
