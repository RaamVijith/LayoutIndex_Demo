import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import AntDesign from "@expo/vector-icons/AntDesign";

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="User Information"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3A86A8",
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen
          name="User Information"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <AntDesign
                name="star"
                size={24}
                color="yellow"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("Favorites")}
              />
            ),
          })}
        />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
