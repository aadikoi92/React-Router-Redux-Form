import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';

//import property 'reducer' as formReducer, alias
import {reducer as formReducer} from 'redux-form'; 

const rootReducer = combineReducers({
 
  posts: PostsReducer,
  //key form all diff forms wired in diff components assume fR applied to state.'form' here
  form: formReducer
});

export default rootReducer;
