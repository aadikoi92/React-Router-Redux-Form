import React , { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class PostsIndex extends Component {
    
    //react lifecycle method: function auto called by react after shown in dom
    
    componentDidMount() {
        this.props.fetchPosts();

    }
    
    renderPosts() {
     return  _.map(this.props.posts, post => {
          return (
              <li className="list-group-item" key={post.id}>
               <Link to={`/posts/${post.id}`}>
                 {post.title}
               </Link>  
              </li>
          );
      });
    }
    
    
    render(){
        
        return (
         
         <div>
            <div className="text-xs-right">
              <Link className="btn btn-primary" to="/posts/new">
                Add a post
              </Link>  
            </div>

         <h3>Posts</h3>
            <ul className="list-group">
             {this.renderPosts()}
            </ul>   
         </div>
           
        );
    }
}


function mapStateToProps(state) {
    return { posts: state.posts }
}

export default connect ( mapStateToProps, {fetchPosts: fetchPosts} ) (PostsIndex) ;



//here was a shortcut way to wire up action creators and component
//earlier projects data were available with map stateToProps()
//we direct fetchPosts wired up with postsindex
//this.props.fetchPosts still available :)
//mapStateToProps and dispachToProps useful sometimes when you want a separate function
