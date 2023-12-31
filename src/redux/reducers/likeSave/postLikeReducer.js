const initialState = {
  data: null,
  errorMessage: '',
  isLoading: false,
  isError: false,
};

const postLikeReducer = (state = initialState, action) => {
  if (action.type === 'POST_LIKE_PENDING') {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === 'POST_LIKE_SUCCESS') {
    return {
      ...state,
      data: action.payload,
      isLoading: false,
      errorMessage: '',
      isError: false,
    };
  } else if (action.type === 'POST_LIKE_FAILED') {
    return {
      ...state,
      data: null,
      errorMessage: action.payload,
      isLoading: false,
      isError: true,
    };
  } else {
    return state;
  }
};

export default postLikeReducer;
