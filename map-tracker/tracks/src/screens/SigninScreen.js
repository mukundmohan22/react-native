import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  return (
    <View style={styles.viewContainer}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        text="Don't have an account? Sign Up instead."
        routeName="Signup"
      />
    </View>
  );
};
SigninScreen.navigationOptions = {
  header: () => false,
};

export default SigninScreen;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 250,
  },
});
