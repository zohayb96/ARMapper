import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import React from 'react';
import Expo, { Permissions } from 'expo';
import { StyleSheet, Text, View } from 'react-native';

export default class Render extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    Permissions.askAsync(Permissions.CAMERA);
    return (
      <Expo.GLView
        ref={ref => (this._glView = ref)}
        style={{ flex: 1 }}
        onContextCreate={this._onGLContextCreate}
      />
    );
  }
  _onGLContextCreate = async gl => {
    const arSession = await this._glView.startARSessionAsync();
    // Graphics
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    // Initialize lighting…
    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);
    // scene.background = ExpoTHREE.createARBackgroundTexture(arSession, renderer);

    // Three.js
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: '#FF0000',
      specular: 0x555555,
      shininess: 100,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;
    // Loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.03;
      cube.rotation.y += 0.02;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    animate();
  };
}
