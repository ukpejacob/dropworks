import { useContext } from "react";
import WorkerFeed from "./components/WorkerFeed";
import RecruiterHome from "./components/RecruiterHome";
import { AppContext } from "@/context/AppContext";

export default function Home() {
  const { mode } = useContext(AppContext);
  return mode === "worker" ? <WorkerFeed /> : <RecruiterHome />;
}
