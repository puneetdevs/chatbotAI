import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Call from "../../assets/call.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import call from "../../services/call";
import ModalComponent from "../../components/Modal";
import "../index.css";

const CallAgent = ({ agentID, callMode }) => {
  const [show, setShow] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (value) => {
    if (!value.startsWith("+")) {
      setPhone("+" + value);
    } else {
      setPhone(value);
    }
  };

  useEffect(() => {
    const encodedPhoneNumber = localStorage.getItem("encodedPhoneNumber");
    if (encodedPhoneNumber) {
      const decodedPhoneNumber = decodeURIComponent(encodedPhoneNumber);
      setPhone(decodedPhoneNumber);
    }
  }, []);



  const handleSubmit = async () => {
    if (phone === "") {
      toast.error("Please enter Phone Number", {
        autoClose: 3000,
        position: "top-right",
      });
      return;
    }
    setIsCalling(true); //disable the button
    try {
      const payload = {
        agent_id: agentID,
        recipient_phone_number: phone,

      };
      const res = await call(payload, callMode);
      if (res?.status === 200) {
        toast.success("Agent is Calling", {
          autoClose: 3000,
          position: "top-right",
        });
        setShow(false);

        const encodedPhoneNumber = encodeURIComponent(phone);
        localStorage.setItem("encodedPhoneNumber", encodedPhoneNumber);
      }
    } catch (error) {
      toast.error("Call Not Connected", {
        autoClose: 3000,
        position: "top-right",
      });
    }
    finally {
      setIsCalling(false);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShow(true)}
        className="text-white py-2 px-6 font-medium rounded-full border-0 btn btn-primary flex items-center gap-2.5"
        style={{ backgroundColor: "#4c1d95" }}
      >
        Call Now
        <img src={Call} className="w-3.5" alt="call" />
      </Button>

      <ModalComponent
        handleClose={() => setShow(false)}
        ModalHeading="Call Agent"
        show={show}
        ModalBody={
          <>
            <Form className="flex callModal_body">
              <PhoneInput
                country="us"
                value={phone}
                onChange={handlePhoneChange}
                inputProps={{
                  autoFocus: true,
                  placeholder: "Search for a country...",
                }}
                enableSearch
              />
              <Button
                className="text-white py-2 font-medium border-0 btn btn-primary w-1/5 text-nowrap text-center rounded-r-lg"
                style={{
                  backgroundColor: "#4c1d95",
                  borderRadius: "0 8px 8px 0",
                }}
                onClick={handleSubmit}
                disabled={isCalling}
              >
                Call User
              </Button>
            </Form>
          </>
        }
      />
    </>
  );

};

export default CallAgent;
