import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import { Meteor } from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';

import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app

class App extends Component {

    handleSubmit(event) {

    event.preventDefault();

 

    // Find the text field via the React ref

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

 

    Tasks.insert({

      text,

      createdAt: new Date(), // current time

      owner: Meteor.userId(),           // _id of logged in user

      username: Meteor.user().username,  // username of logged in user

    });

 

    // Clear form

    ReactDOM.findDOMNode(this.refs.textInput).value = '';

  }


  renderTasks() {

    return this.props.tasks.map((task) => (

      <Task key={task._id} task={task} />

      ));
  }


  render() {

    return (

      <div className="container">

      <header>

      <AccountsUIWrapper />

      <h1>Labores del hogar</h1>

      { this.props.currentUser ?
      <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >

      <input

      type="text"

      ref="textInput"

      placeholder="Añadir tarea"

      />

      </form> : ''

          }
      </header>

    <ul>

      {this.renderTasks()}

      </ul>

      </div>

      );

  }

}

export default withTracker(() => {

  return {
   tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
   currentUser: Meteor.user(),
  };

})(App);


