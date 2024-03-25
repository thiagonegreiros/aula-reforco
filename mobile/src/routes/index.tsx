import { NavigationContainer } from "@react-navigation/native";
import { DrawnRoutes } from "./drawn.routes";

export default function Routes() {
  return (
    <NavigationContainer>
      <DrawnRoutes />
    </NavigationContainer>
  );
}
