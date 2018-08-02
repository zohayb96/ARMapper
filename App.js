import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Header from './components/Header';
import Home from './components/Home';
import { createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store, { getMe } from './app/store';
import axios from 'axios';
// Navigation Screens
import AddToMap from './components/AddToMap';
import MapToView from './components/MapView';
import Render from './components/Render';
import InputForm from './components/InputForm';

const RootNavigator = createStackNavigator(
  {
    Main: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        header: null,
        title: `Home`,
      }),
    },
    AddToMap: {
      screen: AddToMap,
      navigationOptions: ({ navigation }) => ({
        title: `AddToMap`,
      }),
    },
    MapToView: {
      screen: MapToView,
      navigationOptions: ({ navigation }) => ({
        title: `MapToView`,
      }),
    },
    Render: {
      screen: Render,
      navigationOptions: ({ navigation }) => ({
        title: `Render`,
      }),
    },
    InputForm: {
      screen: InputForm,
      navigationOptions: ({ navigation }) => ({
        title: `InputForm`,
      }),
    },
  },
  {
    initialRouteName: `Main`,
  }
);

export default class App extends React.Component {
  componentDidMount() {
    try {
      store.dispatch(getMe()).then(() => {
        // this.props.history.push('/home');
        console.log(this.state);
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
