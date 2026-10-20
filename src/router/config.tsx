import type { RouteObject } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/home/page";
import MyJobsPage from "@/pages/my-jobs/page";
import WalletPage from "@/pages/wallet/page";
import ProfilePage from "@/pages/profile/page";
import PostJobPage from "@/pages/post-job/page";
import LiveBidsPage from "@/pages/live-bids/page";
import RecruiterJobsPage from "@/pages/recruiter-jobs/page";
import WorkerProfilePage from "@/pages/worker-profile/page";
import RecruiterProfilePage from "@/pages/recruiter-profile/page";
import LandingPage from "@/pages/landing/page";
import LoginPage from "@/pages/auth/login/page";
import SignupPage from "@/pages/auth/signup/page";
import WorkerSetupPage from "@/pages/auth/setup/worker/page";
import RecruiterSetupPage from "@/pages/auth/setup/recruiter/page";
import ForgotPasswordPage from "@/pages/auth/forgot-password/page";
import AboutPage from "@/pages/about/page";
import BlogPage from "@/pages/blog/page";
import BlogPostPage from "@/pages/blog/PostPage";

const routes: RouteObject[] = [
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/blog/:id",
    element: <BlogPostPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/signup",
    element: <SignupPage />,
  },
  {
    path: "/auth/setup/worker",
    element: <WorkerSetupPage />,
  },
  {
    path: "/auth/setup/recruiter",
    element: <RecruiterSetupPage />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/my-jobs",
    element: <MyJobsPage />,
  },
  {
    path: "/wallet",
    element: <WalletPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/post-job",
    element: <PostJobPage />,
  },
  {
    path: "/live-bids",
    element: <LiveBidsPage />,
  },
  {
    path: "/recruiter-jobs",
    element: <RecruiterJobsPage />,
  },
  {
    path: "/worker/:id",
    element: <WorkerProfilePage />,
  },
  {
    path: "/recruiter/:id",
    element: <RecruiterProfilePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
