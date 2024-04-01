import { NavigationContainer } from "@react-navigation/native";
import { DrawnRoutes } from "./drawn.routes";
import { AuthRoutes } from "./auth.routes";
import { ToastProvider } from "@/components/Toast";
import { useAuth } from "@/hooks/useAuth";

export default function Routes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      <ToastProvider position="top">
        {user.id ? <DrawnRoutes /> : <AuthRoutes />}
      </ToastProvider>
    </NavigationContainer>
  );
}
