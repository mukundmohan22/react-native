import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Modal} from 'react-native';
import {CardSection} from './CardSection';
import {Button} from './Button';

const Confirm = ({children, onAccept, onDecline, visible}) => {
  const {containerStyle, textStyle, cardSectionStyle} = styles;
  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={() => {}}
      visible={visible}>
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>{children}</Text>
        </CardSection>
        <CardSection>
          <Button onPress={onAccept}>Yes</Button>
          <Button onPress={onDecline}>No</Button>
        </CardSection>
      </View>
    </Modal>
  );
};

export {Confirm};

const styles = StyleSheet.create({
  cardSectionStyle: {
    justifyContent: 'center',
    // marginHorizontal: 15,
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
});
