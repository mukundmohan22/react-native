import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';

const Input = ({label, value, onChangeText, placeholder, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};
Input.defaultProps = {
  secureTextEntry: false,
};

export {Input};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  input: {
    color: '#000',
    paddingHorizontal: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
});
