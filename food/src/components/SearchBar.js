import React from "react";
import { View, TextInput, StyleSheet } from "react-native"
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.backgroudStyle}>
      <Feather name="search" style={styles.iconStyle} color="black" />
      <TextInput
        value={term}
        autoCapitalize="none"
        autoCorrect={false}
        onEndEditing={onTermSubmit}
        style={styles.inputStyle}
        onChangeText={onTermChange}
        placeholder="Search" />
    </View>
  )

}
const styles = StyleSheet.create({
  backgroudStyle: {
    marginTop: 10,
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row'
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    marginBottom: 10
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15
  }
});
export default SearchBar;