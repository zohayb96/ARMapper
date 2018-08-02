import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';

export default class MapToView extends React.Component {
  render() {
    return (
      <MapView
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitude: 40.712775,
          longitude: -74.005973,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}
