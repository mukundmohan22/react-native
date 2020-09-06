import React from 'react';
import {StyleSheet, Text, Picker} from 'react-native';
import {CardSection, Input} from './common';

const EmployeeForm = (props) => {
  return (
    <>
      <CardSection>
        <Input
          value={props.name}
          label="Name"
          placeholder="Employee's Name"
          onChangeText={(value) => props.employeeUpdate({prop: 'name', value})}
        />
      </CardSection>
      <CardSection>
        <Input
          value={props.phone}
          label="Phone"
          placeholder="Employee's Phone Number"
          onChangeText={(value) => props.employeeUpdate({prop: 'phone', value})}
        />
      </CardSection>
      <CardSection style={styles.pickerContainer}>
        <Text style={styles.pickerTextLabel}>Shift</Text>
        <Picker
          selectedValue={props.shift}
          onValueChange={(value) =>
            props.employeeUpdate({prop: 'shift', value})
          }>
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
      </CardSection>
    </>
  );
};

export default EmployeeForm;

const styles = StyleSheet.create({
  pickerContainer: {flexDirection: 'column'},
  pickerTextLabel: {
    fontSize: 18,
    paddingLeft: 20,
  },
});
