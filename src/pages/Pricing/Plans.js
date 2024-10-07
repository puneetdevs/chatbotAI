import StripePricingTable from "./StripePricingTable";

const Plans = () => {
  return (
    <>
      <div className="text-center">
        <h5 className="text-xl font-semibold text-purple">PLANS & PRICING</h5>
        <div>
          <div>
            <h2 className="text-3xl text-dark font-bold my-3 md:text-4xl">
              Plans that best suit your business requirements
            </h2>
          </div>
        </div>
      </div>
      {/* <div className="sm:grid sm2:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 md:mt-10">
        {PlansDescription.map(
          ({ id, planType, planPrice, planBenefits, isPopular }) => (
            <PlanCard
              key={id}
              planType={planType}
              planPrice={planPrice}
              planBenefits={planBenefits}
              isPopular={isPopular}
            />
          )
        )} 
      </div>*/}
       <StripePricingTable />
    </>
  );
};

export default Plans;
