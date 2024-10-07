import React, { Suspense } from "react";
import PageLoader from "./PageLoader";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
