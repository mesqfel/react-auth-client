import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {

    renderInput(field){
        return(
            <div>
                <input {...field.input} type={field.type} className="form-control" />
            </div>
        );
    }

    handleFormSubmit({ email, password}){
        this.props.signinUser({email, password});
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
                
                <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
        )
    }
}

function mapStateToProps(state){
    return { errorMessage: state.auth.error };
}


let InitializeFromStateForm = reduxForm({
    form: 'signin',
    enableReinitialize : true
})(Signin);

InitializeFromStateForm = connect(mapStateToProps, actions)(InitializeFromStateForm);

export default InitializeFromStateForm;