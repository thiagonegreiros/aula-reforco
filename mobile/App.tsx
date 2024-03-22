import "@/styles/global.css";

import { StatusBar } from "expo-status-bar";
import Routes from "@/routes";

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar style="light" />
    </>
  );
}
