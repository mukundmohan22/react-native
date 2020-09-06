import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import {auth} from './firebase/firebase';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onButtonPress = () => {
    setError('');
    setLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        onLoginSuccess();
      })
      .catch(() => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            onLoginSuccess();
          })
          .catch(() => {
            onLoginFail();
          });
      });
  };

  const onLoginSuccess = () => {
    setError('');
    setLoading(false);
    setEmail('');
    setPassword('');
  };
  const onLoginFail = () => {
    setError('Authentication Failed.');
    setLoading(false);
  };
  return (
    <Card>
      <CardSection>
        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
      </CardSection>
      <CardSection>
        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </CardSection>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <CardSection>
        {!loading ? (
          <Button onPress={onButtonPress}>Log in</Button>
        ) : (
          <Spinner />
        )}
      </CardSection>
    </Card>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  error: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    padding: 10,
  },
});
