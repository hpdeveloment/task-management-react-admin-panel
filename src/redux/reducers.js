const initialState = {
  todoListData: [],
};

const doDoListReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TODO_LIST_DATA':
        return { ...state, todoListData: action.payload };
      default:
        return state;
    }
  };
  
  export default doDoListReducer;
  
