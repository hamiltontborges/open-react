export const initialState = {
  id: '',
  avatar: '',
  email: '',
  fullname: '',
  course: '',
  favorites: [],
}

export const UserReducer = (state, action) => {
  switch(action.type) {
    case 'setId': 
      return { ...state, id: action.payload.id};
    case 'setAvatar': 
      return { ...state, avatar: action.payload.avatar};
    case 'setEmail': 
      return { ...state, email: action.payload.email};
    case 'setFullname': 
      return { ...state, fullname: action.payload.fullname};
    case 'setCourse': 
      return { ...state, course: action.payload.course};
    default:
      return state;
  }
}