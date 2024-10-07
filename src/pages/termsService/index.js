import React from "react";
import "../../index.css";
import Navbar from "../../Home/componenets/Navbar";
import Footer from "../../Home/componenets/Footer";

const TermsServices = () => {
  return (
    <>
      <div className="banner_wrapper inner_banner relative">
        <div className="navbar_wrapper">
          <Navbar />
        </div>
      </div>
      <section className="privacy_wrapper">
        <div className="container ">
        <h1 className="mb-5 text-5xl font-bold leading-11 text-[#230c4c]">Terms of Service</h1>
          <h2 className="text-[#230c4c]">Acceptance of Terms</h2>
          <p className="text-base font-medium leading-7 text-black ">
            VoAgents (“us”, “we”, or “our”) operates{" "}
            <a href="https://voagents.ai">https://voagents.ai</a> (hereinafter
            referred to as “Service”). The terms and conditions mentioned apply
            to access any Service of VoAgents. Kindly read this Agreement
            carefully. You agree to be tied to this Agreement by accessing our
            Service in any way. You agree that you have read and understood the
            Terms of Services in this Agreement. You may not access our Service
            if you disagree with its terms and conditions.
          </p>
          <p className="text-base font-medium leading-7 text-black ">
            You agree that we can make changes to this Agreement anytime without
            any prior notice. We will update the changes on this page along with
            the date when the terms of service were revised. You can visit the
            "Terms of Use" page on the website at any time to view a current
            copy of this agreement.
          </p>
          <p className="text-base font-medium leading-7 text-black ">
            You can visit https://voagents.ai/privacy to find out the terms and
            conditions of the company's privacy policy. These are hereby
            incorporated to manage your access to and use of our Service.
          </p>
          <h2 className="text-[#230c4c]">Termination of Agreement</h2>
          <p className="text-base font-medium leading-7 text-black ">
            The company has the right to limit, suspend, or terminate the
            agreement and discontinue all access you have to the website or
            content anytime without any prior notice.{" "}
          </p>
          <p className="text-base font-medium leading-7 text-black ">
            Either party has the right to terminate the Agreement if the other
            party commits any material breach. Given that the breach is fixed by
            the relevant party within the given time.
          </p>
          <h2 className="text-[#230c4c]">Effects of Termination: </h2>
          <p className="text-base font-medium leading-7 text-black ">
            a.) each party has to return and make no continuous usage of data or
            material belonging to the other respective party;
          </p>
          <p className="text-base font-medium leading-7 text-black ">
            b.) the Parties shall not be prejudiced or have any rights that have
            arisen up to the date of termination, including the entitlement to
            damages for any Service Order breach that occurred on or before the
            termination date;{" "}
          </p>
          <p className="text-base font-medium leading-7 text-black ">
            c.) the company may not be entitled to return any charges paid by
            the Customers if there is no breach or damage caused in case of
            termination of Service order Parties may not be dismissed or eased
            of any claim of any sort against the other under the Service Order,
            regardless of any termination or suspension.
          </p>
          <h2 className="text-[#230c4c]">Fees and Payments</h2>
          <p className="text-base font-medium leading-7 text-black ">
            You may pay a fee to the Company for Services granted and liability
            to use the Company product granted to you by the Company under the
            Terms of Service. The Fees you pay to the Company are exclusive of
            any taxes and you shall be entitled to pay all the taxes under the
            Applicable Laws in addition to the Fees to use Company Services.{" "}
          </p>
          <p className="text-base font-medium leading-7 text-black ">
            For the following reasons, the Company may suspend the Customer's
            access to the Services:{" "}
          </p>
          <p className="text-base font-medium leading-7 text-black ">(i) late or non-payment of Fees; </p>
          <p className="text-base font-medium leading-7 text-black ">(ii) Customer’s breach of clause (Acceptable Use of Services); </p>
          <p className="text-base font-medium leading-7 text-black ">
            (iii) in case, suspension is essential for the Company to avoid or
            address any harm or incident to the customers. The Company shall
            inform the Customer of suspension and issues resulting in the
            suspension.
          </p>
          <h2 className="text-[#230c4c]">Confidentiality</h2>
          <p className="text-base font-medium leading-7 text-black ">
            The information received via the Website is not entitled to be
            confidential and the information shall not be deemed to be
            confidential by the Company. You grant the Company the right to
            utilize any information or materials you send freely. This license
            is unrestricted and irreversible.
          </p>
          <p className="text-base font-medium leading-7 text-black ">
            You also provide consent to the Company to use any concepts, ideas,
            or techniques you share with the Company for any purpose. However,
            it will not be entitled to be released or publicized under your
            name.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default TermsServices;
