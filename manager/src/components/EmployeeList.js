/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {emplyeeFetch} from '../actions/EmployeeActions';
import {CardSection} from './common';
import {Actions} from 'react-native-router-flux';

const EmployeeList = (props) => {
  useEffect(() => {
    props.emplyeeFetch();
  }, []);

  const onRowPress = (employee) => {
    Actions.employeeEdit({employee: employee});
  };

  return (
    <FlatList
      data={props.employees}
      keyExtractor={(emp) => emp.uid}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => onRowPress(item)}>
          <CardSection>
            <Text style={styles.text}>{item.name}</Text>
          </CardSection>
        </TouchableOpacity>
      )}
    />
  );
};

const mapStateToProps = (state) => ({
  employees: state.employees,
});

const mapDispatchToProps = {
  emplyeeFetch,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    paddingLeft: 15,
  },
});
