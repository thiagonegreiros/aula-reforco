import "@/styles/global.css";

import { StatusBar } from "expo-status-bar";
import Routes from "@/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Routes />
      <StatusBar style="light" backgroundColor="transparent" translucent />
    </GestureHandlerRootView>
  );
}
