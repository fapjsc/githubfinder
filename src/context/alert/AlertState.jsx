import { useReducer } from 'react';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = {
    alert: null,
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const handleAlert = (msg, type) => {
    if (type === 'clearAlert') {
      //   setAlert(null);
      dispatch({ type: REMOVE_ALERT });
      return;
    }

    // setAlert({ msg, type });
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    });
  };
  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        handleAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
