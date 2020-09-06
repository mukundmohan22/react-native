import React from 'react';
import {employeeUpdate, employeeCreate} from '../actions';
import {Card, CardSection, Button} from './common';
import {connect} from 'react-redux';
import EmployeeForm from './EmployeeForm';

const EmployeeCreate = (props) => {
  const {name, phone, shift} = props;
  const onButtonPress = () => {
    props.employeeCreate({name, phone, shift});
  };
  console.log('Employee ', props.employee);
  return (
    <Card>
      <EmployeeForm {...props} />
      <CardSection>
        <Button onPress={onButtonPress}>Create</Button>
      </CardSection>
    </Card>
  );
};

const mapStateToProps = (state) => {
  const {name, phone, shift} = state.employeeForm;
  return {name, phone, shift};
};

const mapDispatchToProps = {
  employeeUpdate,
  employeeCreate,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeCreate);
