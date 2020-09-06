import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Albums</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 5,
    marginTop: 60,
    padding: 25,
    backgroundColor: '#F8F8F8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    elevation:
  },
  textStyle: {
    fontSize: 20,
  },
});
