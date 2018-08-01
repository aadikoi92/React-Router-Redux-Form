import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

//field is react component auto wired to redux-form, reduxForm is a function helper similar to connect from 'react-redux'
//reduxForm allows our component to communicate with reducer and thus redux store

import { Field, reduxForm}  from 'redux-form'


//field component knows to how to with redux form but how to render, component props to show JSX rendering
// show some JSX..component is a prop,takes a function, earlier examples were like this.somefunction()
class PostsNew extends Component {
    //need to wire up the JSX we write below to the <Field />
    //the arguement 'field' has in it a bunch of event handlers & props so that <Field/> knows what to do upon input change
    //meta.error auto added to field. this props is to handle validation
    renderField(field){
        const { meta: { touched, error } } = field;
             
      const className = `form-group ${ touched && error ? 'has-danger' : ''}`;

     return (
        <div className = {className}>
        <label>{field.label}</label>
            <input
             className = "form-control"
             type = "text"
             {...field.input} //the 3 dots=>all diff props and this object be communicated as props to input, onChange={field.input.onChange}
            />
             <div className = "text-help"> 
              { touched ? error : ' ' }
             </div>                  
        </div>
     );  
    }


//bottom reduxForm like connect previous which was like mapStateToProps,additional properties. this.props available remeber :)

    onSubmit (values){
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render() {
       
        const { handleSubmit } = this.props;


        return(
           <form onSubmit = { handleSubmit (this.onSubmit.bind(this)) } >
               <Field
                  
                  label = "Title"
                  name="title"
                  component ={this.renderField} //just a reference to function not a call.
                
                />

                <Field
                   
                   label = "Categories"
                   name="categories"
                   component={this.renderField} 
                
                />

                <Field
                  
                  label = "Post Content"
                  name = "content"
                  component = {this.renderField}
                 
                />

                <button type = "submit" className="btn btn-primary"> Submit </button>
                <Link to ="/" className= "btn btn-danger"> Cancel </Link>

           </form>      
                  
        );
    }
}

//the function below automaticallly called at certain points during form's lifecycle
//mostly when user submits the form - has single argument 'values' = all the values user entered
//return an object communicate any error to redux form - empty erros redux assumes no error in form

function validate (values){
    const errors = {};
    
    //logic to validate inputs from 'values

    if (!values.title) {
        errors.title = "Enter a title";
    }
    
    if (!values.categories) {
        errors.categories = "Enter a category";
    }

    if (!values.content) {
        errors.content = "Enter a content";
    }
    
    
    //if errors has any properties redux form assumes form is invalid
    return errors;

}


//like mapstateto props in connect of react-redux, single argument with config options 
//form property is name of form, we can show multiple forms on screenn, string must be unique
//
export default reduxForm ({
    validate : validate,
    form:'PostsNewForm' //can think of as the name of the form
}) (
   connect(null, { createPost }) (PostsNew)
);