import "@/styles/global.css";

import { StatusBar } from "expo-status-bar";
import { Notes } from "@/app/Notes";

export default function App() {
  return (
    <>
      <Notes />
      <StatusBar style="light" />
    </>
  );
}
