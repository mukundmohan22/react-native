import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <Text style={styles.header}>Account Screen</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};
AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <FontAwesome name="gear" size={20} color="black" />,
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,

    alignItems: "center",
  },
  header: {
    fontSize: 24,
  },
});
