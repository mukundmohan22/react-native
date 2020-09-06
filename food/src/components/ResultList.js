import React from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import ResultsDetails from "./ResultsDetails"
import { withNavigation } from "react-navigation"


const ResutlsList = ({ title, results, navigation }) => {
  if (!results.length) {
    return null;
  }
  return (
    <View style={style.container}>
      <Text style={style.title}>{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={results}
        keyExtractor={result => {
          return result.id
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('ResultsShow', { id: item.id })}>
              <ResultsDetails result={item} />
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
const style = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 5
  },
  container: {
    marginBottom: 10
  }
});
export default withNavigation(ResutlsList);