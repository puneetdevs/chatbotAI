import { useAuth, useUser } from '@clerk/clerk-react';
const permissions = {
  sharebotsCount: 2, // Number of Sharebots to create
  savedSharebotsCount: 2, // Number of Sharebots to create
  shareBotFileSize: 25, // size of sharebot filesize
  isWhiteLabelShareBot: true, // label under sharebot chat

  messageCredit: 9000,
  knowledgeBaseCount: 1500,
  LLMType: 'GPT-3.5' // GPT-4
}
const useUserAuth = () => {

  const { getToken, signOut } = useAuth();
  const { isSignedIn, user, isLoaded } = useUser();


  return { isSignedIn, user, isLoaded, getToken, signOut, permissions };
};

export default useUserAuth;
