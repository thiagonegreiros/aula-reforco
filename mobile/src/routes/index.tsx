import { NavigationContainer } from "@react-navigation/native";
import { DrawnRoutes } from "./drawn.routes";
import { AuthRoutes } from "./auth.routes";
import { ToastProvider } from "@/components/Toast";

export default function Routes() {
  return (
    <NavigationContainer>
      <ToastProvider position="top">
        <AuthRoutes />
      </ToastProvider>
    </NavigationContainer>
  );
}
