import { Home } from "@/app/Home";
import { Lesson } from "@/app/Lesson";
import { Notes } from "@/app/Notes";
import {
  DrawerItem,
  DrawerNavigationProp,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Profile } from "@/app/Profile";
import { Schedule } from "@/app/Schedule";
import { TouchableOpacity } from "react-native-gesture-handler";

import LogoSvg from "@/assets/logo.svg";
import { View } from "react-native";
import { useAuth } from "@/hooks/useAuth";

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
  const { signOut } = useAuth();

  return (
    <>
      <Drawer.Navigator
        initialRouteName="home"
        screenOptions={{
          headerStyle: { backgroundColor: "#a3a3a3" },
          headerTintColor: "#fff",
          headerTitle: () => (
            <View style={{ marginLeft: 40 }}>
              <LogoSvg style={{ alignSelf: "center" }} />
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => signOut()}
              style={{ marginRight: 20 }}
            >
              <FontAwesome name="sign-out" color="#ffffff" size={20} />
            </TouchableOpacity>
          ),
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
      {/* <DrawerItem
        label="SignOut"
        onPress={() => console.log("teste")}
        icon={({ color, size }) => (
          <Feather name="settings" color={color} size={size} />
        )}
      /> */}
    </>
  );
}
