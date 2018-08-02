import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Button from './Button';
import Container from './Container';
import { StackNavigator } from 'react-navigation';

const Home = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.postButtonStyle}
      onPress={() => navigation.navigate(`AddToMap`)}
    >
      <Text style={styles.textStyle}>Add To Map</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.mapButtonStyle}
      onPress={() => navigation.navigate(`MapToView`)}
    >
      <Text style={styles.textStyle}>View Map</Text>
    </TouchableOpacity>
    <Text style={styles.rightsText}>All Rights Reserved</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: '#32324e',
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: 24,
    justifyContent: 'flex-start',
  },
  rightsText: {
    color: 'white',
    fontSize: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  postButtonStyle: {
    // alignSelf: 'stretch',
    backgroundColor: '#191938',
    marginLeft: 5,
    marginRight: 5,
    width: 200,
    height: 50,
    alignItems: `center`,
    justifyContent: `center`,
    marginBottom: 20,
  },
  thumbnailStyle: {
    height: 300,
    width: 300,
  },
  mapButtonStyle: {
    backgroundColor: '#c10000',
    marginLeft: 5,
    marginRight: 5,
    width: 200,
    height: 50,
    alignItems: `center`,
    justifyContent: `center`,
  },
});

export default Home;
