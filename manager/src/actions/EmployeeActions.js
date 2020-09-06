import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_FECTCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_DELETE_SUCCESS,
} from './types';

import {auth, db} from '../firebase/firebase';
import {Actions} from 'react-native-router-flux';
// import firebase from 'firebase';

export const employeeUpdate = ({prop, value}) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: {prop, value},
  };
};

export const employeeCreate = ({name, phone, shift}) => {
  return (dispatch) => {
    const {currentUser} = auth;
    db.collection('users')
      .doc(currentUser.uid)
      .collection('employees')
      .add({
        name,
        phone,
        shift,
      })
      .then(() => {
        dispatch({type: EMPLOYEE_CREATE});
        Actions.pop();
      });
  };
};

export const emplyeeFetch = () => {
  const {currentUser} = auth;

  return (dispatch) => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('employees')
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {...doc.data(), uid: doc.id};
        });
        dispatch({type: EMPLOYEE_FECTCH_SUCCESS, payload: data});
      });
  };
};

export const employeeEdit = ({name, phone, shift, uid}) => {
  const {currentUser} = auth;
  return (dispatch) => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('employees')
      .doc(uid)
      .update({name, phone, shift})
      .then(() => {
        dispatch({type: EMPLOYEE_SAVE_SUCCESS});
        Actions.pop();
      });
  };
};

export const employeeDelete = (uid) => {
  const {currentUser} = auth;
  return (dispatch) => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('employees')
      .doc(uid)
      .delete()
      .then(() => {
        dispatch({type: EMPLOYEE_DELETE_SUCCESS});
        Actions.pop();
      });
  };
};
