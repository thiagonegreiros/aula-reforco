import { Home } from "@/app/Home";
import { Lesson } from "@/app/Lesson";
import { Notes } from "@/app/Notes";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { Profile } from "@/app/Profile";

const Drawer = createDrawerNavigator();

export function DrawnRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="index"
      screenOptions={{
        title: "Cantinho da Geo",
        headerStyle: { backgroundColor: "#F29D52" },
        headerTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        name="index"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          drawerLabel: "Início",
        }}
      />
      <Drawer.Screen
        name="lesson"
        component={Lesson}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="book" color={color} size={size} />
          ),
          drawerLabel: "Lições Aplicadas",
        }}
      />
      <Drawer.Screen
        name="notes"
        component={Notes}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="file-text" color={color} size={size} />
          ),
          drawerLabel: "Recados",
        }}
      />
      <Drawer.Screen
        name="profile"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="settings" color={color} size={size} />
          ),
          drawerLabel: "Preferências",
        }}
      />
    </Drawer.Navigator>
  );
}
