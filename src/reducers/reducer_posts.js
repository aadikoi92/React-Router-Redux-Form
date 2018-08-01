import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';


export default function (state = {} ,action) {
     
    switch(action.type) {

        case DELETE_POST:
        return _.omit(state, action.payload); //look at state object and if this has a key of post id just drop it

        
        case FETCH_POST:
      
     //  const post = action.payload.data; //es5
      //  const newState = { ...state};//es5
      //  newState[post.id] = post;
      //  return newState;
//we don't want to throw away the earlier gathered state, add to the state, below es6 version of above
        return { ...state, [action.payload.data.id]: action.payload.data };    
        
        case FETCH_POSTS:
        return _.mapKeys(action.payload.data, 'id')
        
        default:
        return state;
    }
}