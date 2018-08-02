import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  AppRegistry,
  ImagePickerIOS,
  Alert,
  Keyboard,
  NavigatorIO,
} from 'react-native';
import Button from './Button';
import Container from './Container';
import TopContainer from './TopContainer';
import { ImagePicker, Permissions } from 'expo';
import axios from 'axios';
import { withNavigation } from 'react-navigation';

const defaultState = {
  postText: '',
  postPicture: null,
  locationText: '',
};

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postText: '',
      postPicture: null,
      locationText: '',
    };
  }

  async componentWillMount() {
    Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  // Message to user when post is successfully posted
  showAlert = () => {
    Alert.alert(
      'Posted!',
      'Awesome!',
      [{ text: ':)', onPress: () => console.log('Challenge Posted') }],
      { cancelable: false }
    );
  };

  // Message to user when post fails
  showFailAlert = () => {
    Alert.alert(
      'Failed To Add!',
      'Error!',
      [
        {
          text: 'Please Try Again',
          onPress: () => console.log('Challenge Error'),
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    const { navigate } = this.props;
    let { postPicture } = this.state;
    return (
      <View>
        <Container>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            {postPicture && (
              <Image
                source={{ uri: postPicture }}
                style={{
                  height: 250,
                  width: 250,
                }}
              />
            )}
          </View>
        </Container>
        <Container>
          <TextInput
            name="postText"
            value={this.state.postText}
            onChangeText={postText => this.setState({ postText })}
            placeholder="What would you like to add to map"
            style={styles.textStyle}
          />
        </Container>
        <Container>
          <TextInput
            name="locationText"
            value={this.state.locationText}
            onChangeText={locationText => this.setState({ locationText })}
            placeholder="Where are you?"
            style={styles.textStyle}
          />
        </Container>
        <Container>
          <Button onPress={this.pickImage}>Image</Button>
        </Container>
        <Container>
          <Button
            onPress={() =>
              console.log(this.props.navigation.navigate('Render'))
            }
          >
            Add AR Location
          </Button>
        </Container>
        <Container>
          <Button>Add To Map</Button>
        </Container>
      </View>
    );
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({ postPicture: result.uri });
    }
    console.log(this.state);
  };
}

const styles = {
  background: {
    backgroundColor: '#32324e',
  },
  container: {
    color: 'red',
  },
  textStyle: {
    height: 30,
    width: '100%',
    flex: 2,
    fontSize: 18,
  },
  imageStyle: {
    height: 200,
    flex: 1,
    width: 200,
  },
};

export default withNavigation(InputForm);
