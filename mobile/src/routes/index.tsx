import { NavigationContainer } from "@react-navigation/native";
import { DrawnRoutes } from "./drawn.routes";
import { AuthRoutes } from "./auth.routes";

export default function Routes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  );
}
