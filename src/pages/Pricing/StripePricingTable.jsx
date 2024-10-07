import React, { useEffect } from "react";
import { STRIPE_PUBLISHABLE_KEY, STRIPE_TABLE_ID } from "../../utils/constants";
const StripePricingTable = () => {
  return (
    <stripe-pricing-table pricing-table-id={STRIPE_TABLE_ID}
      publishable-key={STRIPE_PUBLISHABLE_KEY}>
    </stripe-pricing-table>
  );
};

export default StripePricingTable;