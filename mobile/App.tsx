import "@/styles/global.css";

import { StatusBar } from "expo-status-bar";
import Routes from "@/routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthContextProvider } from "@/contexts/AuthContext";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
      <StatusBar style="light" backgroundColor="transparent" translucent />
    </GestureHandlerRootView>
  );
}
