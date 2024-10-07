import React from "react";
import "../../index.css";
import Navbar from "../../Home/componenets/Navbar";
import VapiComponent from "../../Home/componenets/Callout/Callout";
import Footer from "../../Home/componenets/Footer";

const AboutUs = () => {
    return (
        <>
        <section className="banner_wrapper relative">
        <div className="navbar_wrapper">
          <Navbar />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center banner_content">
              {/* <a href="" className="banner_btn">
                Are you an agency seeking a white-label solution? Learn more.
              </a> */}
              <h2 className="text-4xl leading-11 font-medium text-purple-700 mb-2">
                AI Voice Assistants:
                <br />
                Human-Like, Efficient, No Code Needed
              </h2>
              <p className="text-base font-medium leading-9">
                Create AI voice assistants to make outbound calls, answer
                inbound
                <br /> calls, and schedule appointments 24/7!
              </p>
              {/* <img
                src="https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2F1a3c84454236f952546f01b263468144.cdn.bubble.io%2Ff1704816732428x525677825818885700%2Fhero-image.webp"
                alt="banner-img"
                className="w-3/4 table m-auto"
              /> */}

              <VapiComponent></VapiComponent>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
      </>
    )
}

export default AboutUs;