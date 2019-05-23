import { combineReducers } from 'redux';
const transcriptReducer = (state = { transcript: `You're file is being transcribed` }, action) => {
  switch (action.type) {
    case 'SET_TRANSCRIPT':

      return { transcript: action.payload }

    default:
      console.log(state)
      return state;


  }
};

const formReducer = (state = {
  podbean: {
    piece: '',
    title: '',
    description: '',
  },
  wordpress: {
    title: '',
    blog: '',
    tags: '',
    categories: '',
  }
}, action) => {
  switch (action.type) {
    case 'SET_PODBEAN':
      console.log('in reducer', action.payload)
      return {
        ...state,
        podbean: {
          ...state.podbean,
          piece: action.payload.piece,
          title: action.payload.title,
          description: action.payload.description
        }
      };
    case 'SET_WORDPRESS':
      return {
        ...state,
        wordpress: {
          ...state.wordpress,
          title: action.payload.title,
          blog: action.payload.blog,
          tags: action.payload.tags,
          categories: action.payload.categories,
        }
      };
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
const editReducer = combineReducers({
  transcriptReducer,
  formReducer


})
export default editReducer;