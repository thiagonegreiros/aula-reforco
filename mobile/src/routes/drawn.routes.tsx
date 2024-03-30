import { Home } from "@/app/Home";
import { Lesson } from "@/app/Lesson";
import { Notes } from "@/app/Notes";
import {
  DrawerNavigationProp,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { Profile } from "@/app/Profile";
import { Schedule } from "@/app/Schedule";

type AppRoutes = {
  home: undefined;
  lesson: undefined;
  notes: undefined;
  schedule: undefined;
  profile: undefined;
};

export type AppNavigatorRoutesProps = DrawerNavigationProp<AppRoutes>;

const Drawer = createDrawerNavigator<AppRoutes>();

export function DrawnRoutes() {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{
        title: "Cantinho da Geo",
        headerStyle: { backgroundColor: "#fed7aa" },
        headerTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        name="home"
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
        name="schedule"
        component={Schedule}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="calendar" color={color} size={size} />
          ),
          drawerLabel: "Agendamento",
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
