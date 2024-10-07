import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const LoggedIn = ({ onUseremail, onUserId }) => {
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      onUseremail(user?.emailAddresses?.[0]?.emailAddress); // Pass email to parent component
      onUserId(user.id); // Pass userId to parent component
    }
  }, [isSignedIn, user, onUseremail, onUserId]);

  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }

  // If not signed in, you might want to handle that scenario explicitly
  if (!isSignedIn) {
    return <div>Not signed in</div>;
  }

  // Render null if everything is handled above
  return null;
};

export default LoggedIn;
