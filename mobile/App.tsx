import "@/styles/global.css";

import { StatusBar } from "expo-status-bar";
import { Lesson } from "@/app/Lesson";

export default function App() {
  return (
    <>
      <Lesson />
      <StatusBar style="light" />
    </>
  );
}
