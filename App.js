import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { config } from "@gluestack-ui/config" // Optional if you want to use default theme
import { SafeAreaProvider } from "react-native-safe-area-context";
// import Header from "./src/components/layout/Header";
// import RecipesContainer from "./src/components/containers/RecipesContainer";
// import CustomTabView from "./src/components/tabs/tabs";
import AppStack from "./src/components/stacks/AppStack";

export default function App() {
  return (
    <SafeAreaProvider >
    <GluestackUIProvider config={config}>
      <StatusBar style="auto" />
      {/* <Header /> */}
      {/* <CustomTabView /> */}
      <AppStack />
    </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
