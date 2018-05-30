import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionTypes from '../store/actions';

class Persons extends Component {
    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onAddedPerson} />
                {this.props.prs.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.onRemovePerson(person.id)}/>
                ))}
            </div>
        );
    }
}
// access to state. this recieves state as an input passed in the function automatically by redux.
// it should return a js object where we map a slice of redux state to something we'll be able to access as a property in our container component
const mapStateToProps = state => {
  return {
    prs: state.persons
  };
};

// this you access to dispatch functions and being able to dispatch. recives the dispatch function as an input and returns an object where we map props to dispatch function executions.
const mapDispatchToProps = dispatch => {
  return {
    onAddedPerson: (name, age) => dispatch({type: actionTypes.ADD_PERSON, payload: {name: name, age: age}}),
    onRemovePerson: (id) => dispatch({type: actionTypes.REMOVE_PERSON, personId: id})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
