import Navbar from "../../Home/componenets/Navbar";
import Plans from "./Plans";
import Faq from "./Faq";
import HomeFooter from "../../Home/componenets/HomeFooter/HomeFooter";
import { Container } from "../../Home/componenets/ui/Container";
const PricingPage = () => {
  return (
    <>
      <Navbar />
      <div className="hero2 px-3 pb-6 md:p-10">
        <Plans />
      </div>
      <Container>
        <Faq />
        <HomeFooter />
      </Container>
    </>
  );
};

export default PricingPage;
