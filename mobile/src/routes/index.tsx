import { NavigationContainer } from "@react-navigation/native";
import { DrawnRoutes } from "./drawn.routes";
import { AuthRoutes } from "./auth.routes";
import { ToastProvider } from "@/components/Toast";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/Loading";

export default function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      <ToastProvider position="top">
        {user.id ? <DrawnRoutes /> : <AuthRoutes />}
      </ToastProvider>
    </NavigationContainer>
  );
}
