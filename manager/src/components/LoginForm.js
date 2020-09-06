import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, loginUser} from '../actions';
import {Button, Card, CardSection, Input, Spinner} from './common';

const LoginForm = (props) => {
  const onEmailChange = (text) => {
    props.emailChanged(text);
  };
  const onPasswordChange = (text) => {
    props.passwordChanged(text);
  };

  const onButtonPress = () => {
    const {email, password} = props;
    props.loginUser({email, password});
  };

  return (
    <View style={styles.container}>
      <Card>
        <CardSection>
          <Input
            label="Email"
            value={props.email}
            placeholder="Enter your email"
            onChangeText={onEmailChange}
          />
        </CardSection>
        <CardSection>
          <Input
            value={props.password}
            onChangeText={onPasswordChange}
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={true}
          />
        </CardSection>
        {props.error ? <Text style={styles.error}>{props.error}</Text> : null}
        <CardSection>
          {props.loading ? (
            <Spinner />
          ) : (
            <Button onPress={onButtonPress}>Login</Button>
          )}
        </CardSection>
      </Card>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
  };
};

const mapDispatchToProps = {
  emailChanged,
  passwordChanged,
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

const styles = StyleSheet.create({
  container: {
    // marginTop: 40,
  },
  error: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    padding: 10,
  },
});
