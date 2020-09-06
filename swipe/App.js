import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Deck from "./src/Deck";
import { Card, Button } from "react-native-elements";
import { DATA, DATA_1 } from "./src/DATA";

export default function App() {
  const [cardData, setCardData] = useState(DATA);
  const renderCard = (item) => {
    return (
      <Card key={item.id}>
        <Card.Image
          style={{ height: 500 }}
          source={{ uri: item.uri }}
        ></Card.Image>
        <Card.Title>{item.text}</Card.Title>
        <Text style={{ marginBottom: 10 }}>
          I can Custimize the Card Further
        </Text>
        <Button
          icon={{ name: "code", color: "white" }}
          backgroundColor="#03A9F4"
          title="View Now!"
        />
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>No More Cards</Card.Title>
        <Text style={{ marginBottom: 10 }}>There is no more content</Text>
        <Button
          onPress={() => setCardData(DATA_1)}
          icon={{ name: "code", color: "white" }}
          backgroundColor="#03A9F4"
          title="Get More!"
        />
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Deck
        data={cardData}
        renderCard={renderCard}
        renderNoMoreCards={renderNoMoreCards}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
