import {INFO} from '../actions/const';
const initialState = {};

module.exports = function(state = initialState, action) {
  switch(action.type) {
    case INFO: {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
};
