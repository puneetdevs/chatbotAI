import React, { useEffect } from "react";
import { useAuth, RedirectToSignIn, } from "@clerk/clerk-react";
import PageLoader from "./PageLoader";

const ProtectedRoute = (props) => {
    const { isLoaded, isSignedIn } = useAuth();

    useEffect(() => {
        if (!isSignedIn && !isLoaded)
            <RedirectToSignIn />
    }, [isSignedIn, isLoaded]);


    if (!isLoaded) return <PageLoader />

    return (
        <React.Fragment>
            {
                isSignedIn ? props.children : <RedirectToSignIn />
            }
        </React.Fragment>
    );
}

export default ProtectedRoute;