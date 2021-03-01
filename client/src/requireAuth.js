/* eslint-disable import/no-anonymous-default-export */

import React, { Component } from 'react';
import { connect } from 'react-redux';

// Higher Order Component

export default (ChildComponent) =>  {
    
    // component
    class ComposedComponent extends Component {

        componentDidMount() {
            this.isAuthenticated();
        }

        componentDidUpdate() {
            this.isAuthenticated();
        }

        
        //is out users authenticated

        isAuthenticated = () => {
            if(!this.props.auth) {
                // redirect our user back to home page
                this.props.history.push('/')
            }
        }
        

        render(){
            return <ChildComponent {...this.props}/>
            
        }
    }

    const mapStateToProps = (state) => {
        return {
            auth: state.auth.authenticated
        }
    } 
    return connect(mapStateToProps, null)(ComposedComponent);

}

