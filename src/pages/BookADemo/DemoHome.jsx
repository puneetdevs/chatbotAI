import React, { useState, useEffect } from "react";
import "./index.css";
import Navbar from "../../Home/componenets/Navbar";
import Footer from "../../Home/componenets/Footer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import call from "../../services/call";

const DemoHome = () => {
  const [agents, setAgents] = useState({
    agentId: "",
    agentName: "",
    phoneNumber: "",
  });

  const handlePhoneChange = (value) => {
    if (!value.startsWith("+")) {
      setAgents((prevState) => ({
        ...prevState,
        phoneNumber: "+" + value,
      }));
    } else {
      setAgents((prevState) => ({
        ...prevState,
        phoneNumber: value,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgents({
      ...agents,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const payload = {
      agent_id: agents.agentId,
      recipient_phone_number: agents.phoneNumber,
      recipient_data: {
        username: agents.agentName,
      },
    };

    if ((agents.agentId || agents.phoneNumber || agents.agentName) === "") {
      toast.error("Please fill all the fields", {
        autoClose: 3000,
        position: "top-right",
      });
      return;
    }

    try {
      const res = await call(payload);
      if (res?.status === 200) {
        toast.success("Agent is Calling", {
          autoClose: 3000,
          position: "top-right",
        });
        setAgents({
          agentId: "",
          agentName: "",
          phoneNumber: "",
        });
      }
    } catch (error) {
      toast.error("Call Not Connected", {
        autoClose: 3000,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <section className="relative banner_wrapper py-0">
        <div className="navbar_wrapper" style={{ position: "static" }}>
          <Navbar />
        </div>
      </section>
      <section className="demoPage" style={{ background: "rgb(241, 238, 254" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div>
                <h2 className="mb-6 text-5xl font-bold leading-tight text-[#230c4c] mt-5 md:text-2x">
                  AI Voice Assistants:
                  <br />
                  Human-Like, <br />
                  Efficient, <br />
                  No Code Needed
                </h2>
                <p className="text-base font-medium leading-7 text-black ">
                  Create AI voice assistants to make outbound calls, answer
                  inbound
                  <br /> calls, and schedule appointments 24/7!
                </p>
              </div>
            </div>
            <div className="col-md-4 offset-md-1">
              <div className="demo-card">
                <h2 className="text-2xl" style={{ color: "white" }}>
                  Receive a phone call <br /> from VoAgents
                </h2>
                <select
                  className="font-control"
                  placeholder="Select Agent"
                  name="agentId"
                  aria-label="Default select example"
                  value={agents.agentId}
                  onChange={handleChange}
                >
                  <option value="">Select Agent</option>
                  <option value="3299fd06-7ffb-4c6a-a52c-1e71fb8c03f2">
                    Car Services: Book Service Appointment
                  </option>
                  <option value="7641f605-4d9c-4e73-b582-2b325b03e120">
                    Dental Clinic: Book Appointment
                  </option>
                  <option value="9d4a502e-7faf-4ac2-94fd-35c0e279a909">
                    Credit card Agent
                  </option>
                  <option value="a67cc204-6839-4a65-8865-42b410a05049">
                  Pizza Delivery Agent
                  </option>
                </select>

                <input
                  type="text"
                  className="font-control"
                  placeholder="Your Name"
                  name="agentName"
                  value={agents.agentName}
                  onChange={handleChange}
                />

                <PhoneInput
                  country="in"
                  value={agents.phoneNumber}
                  onChange={handlePhoneChange}
                  inputProps={{
                    autoFocus: true,
                    placeholder: "Your Phone Number",
                  }}
                  enableSearch
                />

                <button
                  className="btn custom-purple text-white p-2 rounded-lg mb-2 w-100"
                  onClick={handleSubmit}
                >
                  Let's Talk
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DemoHome;
