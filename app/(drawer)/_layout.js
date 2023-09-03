import { Drawer } from "expo-router/drawer";
export default function Layout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="city"
        options={{
          drawerLabel: "City",
          title: "City",
        }}
      ></Drawer.Screen>
    </Drawer>
  );
}
