import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { LoginForm } from './components/LoginForm';
import { Header, Spinner } from './components/common';

class App extends Component {
  state = {
    loggedIn: null
  };
  componentWillMount() {
    const firebase = require('firebase');

    firebase.initializeApp({
      apiKey: 'AIzaSyCpDlsdd0MQmoheo0uXTmvC4TYgFm2hzpU',
      authDomain: 'authentication-88102.firebaseapp.com',
      databaseURL: 'https://authentication-88102.firebaseio.com',
      projectId: 'authentication-88102',
      storageBucket: 'authentication-88102.appspot.com',
      messagingSenderId: '752827389996'
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderForm() {
    const firebase = require('firebase');

    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.buttonStyle}>
            <Button onPress={() => firebase.auth().signOut()} title="Logout" />
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }
  render() {
    return (
      <View>
        <Header headerText="Project 2" />
        <View>{this.renderForm()}</View>
      </View>
    );
  }
}

const styles = {
  buttonStyle: {
    backgroundColor: '#512DA8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  }
};
export default App;
