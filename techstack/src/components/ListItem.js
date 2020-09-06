import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation,
} from 'react-native';
import {CardSection} from './common';
import {connect} from 'react-redux';
import * as actions from '../actions';

const ListItem = (props) => {
  const {library, expanded} = props;
  const {titleStyle} = styles;

  useEffect(() => {
    LayoutAnimation.spring();
  }, [expanded]);

  const renderDescription = () => {
    if (expanded) {
      return (
        <CardSection>
          <Text style={styles.descStyle}>{library.description}</Text>
        </CardSection>
      );
    }
  };
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => props.selectLibrary(library.id)}>
        <View>
          <CardSection>
            <Text style={titleStyle}>{library.title}</Text>
          </CardSection>
          {renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    padding: 10,
  },
  selectedCard: {
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
  },
  descStyle: {
    paddingHorizontal: 15,
    fontSize: 16,
  },
});

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;
  return {expanded};
};

export default connect(mapStateToProps, actions)(ListItem);
