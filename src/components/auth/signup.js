import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {

    renderInput(field){
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return(
            <div className={className}>
                <input {...field.input} type={field.type} className="form-control" />
                
                <div className="text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    handleFormSubmit({ email, password}){
        // console.log('Lets signup the user', email, password);
        this.props.signupUser({email, password});
    }
 
    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    render(){
    const { handleSubmit } = this.props
    
        return(

            <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                {this.renderAlert()}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field name="email" component={this.renderInput} type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field name="password" component={this.renderInput} type="password" />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Re-type Password</label>
                    <Field name="passwordConfirm" component={this.renderInput} type="password" />
                </div>
                
                <button action="submit" className="btn btn-primary">Sign up</button>
            </form>
        )
    }
}

function validate(values){
    const errors = {};

    if(!values.email){
        errors.email = "Enter an email";
    }

    if(!values.password){
        errors.password = "Enter a password";
    }

    if(!values.passwordConfirm){
        errors.passwordConfirm = "Re-type the password";
    }

    if(values.password !== values.passwordConfirm){
        errors.password = "Passwords must match";
        errors.passwordConfirm = "Passwords must match";
    }

    return errors;
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error };
}

let InitializeFromStateForm = reduxForm({
    validate,
    form: 'signup',
    enableReinitialize : true
})(Signup);

InitializeFromStateForm = connect(mapStateToProps, actions)(InitializeFromStateForm);

export default InitializeFromStateForm;