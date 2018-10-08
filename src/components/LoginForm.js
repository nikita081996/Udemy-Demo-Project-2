import React, { Component } from 'react';
import { Text, View, Keyboard } from 'react-native';
// import { firebase } from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });
    const firebase = require('firebase');

    Keyboard.dismiss();
    //  this.renderButton();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFailed.bind(this));
      });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  onLoginFailed() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>Log in</Button>;
  }
  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
          />
        </CardSection>
        <CardSection>
          <Input
            label="Password"
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
          />
        </CardSection>
        <CardSection>
          <View style={styles.errorTextStyle}>
            <Text style={styles.textStyle}>{this.state.error}</Text>
          </View>
        </CardSection>
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    flex: 1,
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 20,
    color: 'red'
  }
};
export { LoginForm };
