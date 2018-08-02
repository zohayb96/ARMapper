import { createStore, applyMiddleware } from 'redux';
// import axios from 'axios';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const initialState = {
  user: {},
};

// Action Type to get logged in user from the server
const GET_USER = 'GET_USER';

const gotMe = user => ({
  type: GET_USER,
  user,
});

export const getMe = () => dispatch => {
  return axios
    .get('/auth/me')
    .then(res => res.data)
    .then(user => dispatch(gotMe(user)))
    .catch(console.error.bind(console));
};

export const login = formData => {
  return async dispatch => {
    try {
      const response = await axios.put('/auth/login', formData);
      dispatch(gotMe(user));
    } catch (err) {
      console.log(err);
    }
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};

export default createStore(
  reducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
