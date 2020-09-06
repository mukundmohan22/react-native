import React, {useEffect, useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Header, Button, CardSection, Spinner} from './components/common';
import LoginForm from './components/LoginForm';
import {auth} from './components/firebase/firebase';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);

  const logout = () => {
    auth.signOut();
  };

  const renderContent = () => {
    switch (user) {
      case true:
        return (
          <CardSection>
            <Button onPress={logout}>Log Out</Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.spinnerContainer}>
            <Spinner />
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={{height: '100%'}}>
      <Header headerText="Authentication" />
      {renderContent()}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  spinnerContainer: {
    display: 'flex',
    height: 500,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
