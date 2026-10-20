import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import WorkerProfile from "./components/WorkerProfile";
import RecruiterProfile from "./components/RecruiterProfile";

export default function ProfilePage() {
  const { isWorker } = useContext(AppContext);

  return isWorker ? <WorkerProfile /> : <RecruiterProfile />;
}