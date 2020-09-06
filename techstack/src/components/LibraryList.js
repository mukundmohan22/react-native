import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import ListItem from './ListItem';

const LibraryList = (props) => {
  const renderItem = (library) => {
    return <ListItem library={library.item} />;
  };
  return (
    <FlatList
      data={props.libraries}
      keyExtractor={(library) => library.id.toString()}
      renderItem={renderItem}
    />
  );
};
const mapStateToProps = (state) => {
  return {libraries: state.libraries};
};

export default connect(mapStateToProps)(LibraryList);
