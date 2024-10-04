import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import MoreScreen from "../screens/MoreScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return ( // Added return here
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Index"
          component={IndexScreen}
          options={{
            title: 'Movie App',
            headerStyle: {
              backgroundColor: '#2e3e50', // Added missing `#` for color
            },
            headerTitleStyle: {
              color: "#fff",
            },
          }}
        />
        <Stack.Screen name="More" component={MoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
