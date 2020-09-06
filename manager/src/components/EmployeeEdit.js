/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  employeeUpdate,
  employeeEdit,
  employeeDelete,
} from '../actions/EmployeeActions';
import {Card, CardSection, Button, Confirm} from './common';
import EmployeeForm from './EmployeeForm';
import {connect} from 'react-redux';
import _ from 'lodash';
import Communications from 'react-native-communications';

const EmployeeEdit = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    _.each(props.employee, (value, prop) => {
      props.employeeUpdate({prop, value});
    });
  }, []);
  const onButtonPress = () => {
    const {name, phone, shift, uid} = props;
    props.employeeEdit({name, phone, shift, uid});
  };
  const onPressText = () => {
    const {phone, shift} = props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  };
  const onAccept = () => {
    setModalVisible(false);
    props.employeeDelete(props.uid);
  };
  return (
    <Card>
      <EmployeeForm {...props} />
      <CardSection>
        <Button onPress={onButtonPress}>Save Changes</Button>
      </CardSection>
      <CardSection>
        <Button onPress={onPressText}>Text Schedule</Button>
      </CardSection>
      <CardSection>
        <Button onPress={() => setModalVisible(true)}>Fire Employee</Button>
      </CardSection>
      <Confirm
        visible={modalVisible}
        onAccept={onAccept}
        onDecline={() => setModalVisible(false)}>
        <> Are you sure you want to delete this?</>
      </Confirm>
    </Card>
  );
};

const mapStateToProps = (state) => {
  const {name, phone, shift, uid} = state.employeeForm;
  return {name, phone, shift, uid};
};

const mapDispatchToProps = {
  employeeUpdate,
  employeeEdit,
  employeeDelete,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeEdit);
