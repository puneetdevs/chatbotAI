import React from "react";
import { Link } from "react-router-dom";
import Footerlogo from "../../assets/logo/logo-flow.png";
import "../../index.css";
import ContactFormModal from "../../components/ContactFormModal";

const Footer = () => {
  return (
    <>
      <footer className="footer_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img src={Footerlogo} alt="Logo" className="img-fluid" />
              <p className="text-neutral-50 mt-3">
                VoAgents is an innovative AI voice assistant that can understand
                natural language voice commands. Leverage our solution to ensure
                no more calls in queue, easy scheduling of appointments, and
                automated inbound and outbound calls.{" "}
              </p>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-4">
                  <h4>Company</h4>
                  <ul>
                   
                    <li className="text-base font-medium leading-9">
                      <Link to="/privacy">Privacy Policy</Link>
                    </li>
                    <li className="text-base font-medium leading-9">
                      <Link to="/terms-of-service">Terms of Service</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h4>Sectors</h4>
                  <ul>
                    <li className="text-base font-medium leading-9">
                      <Link to="/real-estate">Real Estate</Link>
                    </li>
                    <li className="text-base font-medium leading-9">
                      <Link to="/healthcare">
                       Healthcare
                      </Link>
                    </li>
                    <li className="text-base font-medium leading-9">
                      <Link to="/recruitment">Recruitment</Link>
                    </li>
                    <li className="text-base font-medium leading-9">
                      <Link to="/restaurants">Restaurants</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h4>Support</h4>
                  <ul>
                    <li className="text-base font-medium leading-9">
                      <ContactFormModal/>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
