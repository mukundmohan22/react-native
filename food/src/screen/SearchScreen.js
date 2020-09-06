import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native"
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults"
import ResutlsList from "../components/ResultList";

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [serachApi, results, errorMsg] = useResults();

  const filterResultsByPrice = (price) => {
    return results.filter(result => {
      return result.price === price;
    })
  }
  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => serachApi(term)} />
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      <ScrollView>
        <ResutlsList 
          results={filterResultsByPrice('$')} title='Cost Effective' />
        <ResutlsList
          results={filterResultsByPrice('$$')} title='Bit Pricier' />
        <ResutlsList 
          results={filterResultsByPrice('$$$')} title='Big Spender' />
        <ResutlsList 
          results={filterResultsByPrice('$$$$')} title='Mega Big Spender' />
      </ScrollView>
    </>
  )

}
const styles = StyleSheet.create({});
export default SearchScreen;