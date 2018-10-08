import React from 'react';
import { View } from 'react-native';

const CardSection = props => <View style={styles.containerStyles}>{props.children}</View>;

const styles = {
  containerStyles: {
    borderWidth: 1,
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
