import React, { lazy } from "react";
import Layout from "./Layout";
import Loadable from "./Loadable";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import CreateAgent from "../MyAgents/CreateAgent.jsx";
import AgentDetails from "../MyAgents/CreateComponents/AgentDetails.jsx";
import PromptBuilder from "../MyAgents/CreateComponents/PromptBuilder.jsx";
import AdvancedSettings from "../MyAgents/CreateComponents/AdvancedSettings.jsx";
import EditAgent from "../MyAgents/EditAgent.jsx";
import AgentExecution from "../MyAgents/AgentExecution";
import DemoHome from "../pages/BookADemo/DemoHome.jsx";
import AgentBatches from "../AgentBatches";
import CallLogs from "../CallLogs";

const Dashboard = Loadable(lazy(() => import("../Dashboard")));
const AIChat = Loadable(lazy(() => import("../AIChat")));
const Single = Loadable(lazy(() => import("../Single")));
const Multiple = Loadable(lazy(() => import("../Multiple")));
const ShareBot = Loadable(lazy(() => import("../Sharebot")));
const ShareBotChat = Loadable(lazy(() => import("../Sharebot/ShareBotChat")));
const Agent = Loadable(lazy(() => import("../MyAgents/Agent.jsx")));
const VoiceLibrary = Loadable(lazy(() => import("../VoiceLibrary/")));
const AgentExecutions = Loadable(lazy(() => import("../AgentExecutions")));
const Home = Loadable(lazy(() => import("../Home/Home")));
const Pricing = Loadable(lazy(() => import("../pages/Pricing/PricingPage.js")));
const AboutUs = Loadable(lazy(() => import("../pages/aboutUs/index")));
const Privacy = Loadable(lazy(() => import("../pages/privacy/index")));
const TermsServices = Loadable(
  lazy(() => import("../pages/termsService/index"))
);
const MedicalAppointmentView = Loadable(
  lazy(() => import("../pages/medicalAppointment/index.js"))
);
const HrRecruitmentView = Loadable(
  lazy(() => import("../pages/hrRecruitment/index.js"))
);
const RealEstateView = Loadable(lazy(() => import("../pages/realEstate")));
const RestaurantView = Loadable(lazy(() => import("../pages/Restaurant")));

const Router = [
  // {
  //   path: '', element: <Home />, exact: true,
  // },
  // {
  //   path: '/pricing', element: <Pricing />, exact: true,
  // },
  // {
  //   path: '/healthcare', element: <MedicalAppointmentView />, exact: true,
  // },
  // {
  //   path: '/recruitment', element: <HrRecruitmentView />, exact: true,
  // },
  // {
  //   path: '/real-estate', element: <RealEstateView />, exact: true,
  // },
  // {
  //   path: '/restaurants', element: <RestaurantView />, exact: true,
  // },
  // {
  //   path: '/aboutus', element: <AboutUs />, exact: true,
  // },
  // {
  //   path: '/privacy', element: <Privacy />, exact: true,
  // },

  {
    path: "/demo",
    element: <DemoHome />,
    exact: true,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    exact: true,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/chat/:conversation_id?", exact: true, element: <AIChat /> },
      { path: "/single", exact: true, element: <Single /> },
      {
        path: "/multiple/:document_id?/:conversation_id?",
        exact: true,
        element: <Multiple />,
      },
      { path: "/sharebot", exact: true, element: <ShareBot /> },
      { path: "/agents", exact: true, element: <Agent /> },
      {
        path: "/agent/executions/:decodedRunID",
        exact: true,
        element: <AgentExecution />,
      },
      { path: "/agents/create", exact: true, element: <CreateAgent /> },
      {
        path: "/agents/create/AgentDetails",
        exact: true,
        element: <AgentDetails />,
      },
      {
        path: "/agents/create/PromptBuild",
        exact: true,
        element: <PromptBuilder />,
      },
      {
        path: "/agents/create/AdvancedSettings",
        exact: true,
        element: <AdvancedSettings />,
      },
      { path: "/agents/:agentID", exact: true, element: <EditAgent /> },
      { path: "/VoiceLibrary/", exact: true, element: <VoiceLibrary /> },
      {
        path: "/agentexecutions/:agentIdNew?",
        exact: true,
        element: <AgentExecutions />,
      },
      { path: "/batches", exact: true, element: <AgentBatches /> },
      { path: "/call-logs", exact: true, element: <CallLogs /> },
      { path: "", element: <Navigate to="/dashboard" /> },
    ],
  },
  { path: "/share/chat/:id", exact: true, element: <ShareBotChat /> },
  { path: "*", element: <Navigate to="/dashboard" /> },
];

export default Router;
