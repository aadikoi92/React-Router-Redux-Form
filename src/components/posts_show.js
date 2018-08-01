import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
    
    componentDidMount() {
       
        const { id } = this.props.match.params //piece of state  id we care about, match provided by RR
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;
        
        if(!post) {
            return <div>Loading</div>
        }

        return (
            <div>
                <Link to ="/">Back To Index </Link>
                <button
                className="btn btn-danger pull-xs-right"
                onClick = {this.onDeleteClick.bind(this)}
                >
                  Delete This Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
                
            </div>    
        );
    }
}

//own props props object going to the component above when rerender, first arg app state
//above component this.props === ownprops in the component
//return only a single post instead of list
//why? large apps common to create mtoS functions in diff file

function mapStateToProps ({ posts }, ownProps) {
    return { post:posts[ownProps.match.params.id]  };
}

export default connect(mapStateToProps, { fetchPost, deletePost}) (PostsShow);