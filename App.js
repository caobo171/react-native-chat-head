/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  ToastAndroid,
  DeviceEventEmitter,
  NativeModules
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const showToast = text => ToastAndroid.show(text, 1000)

const {initialize, checkPermission, requestPermission} = NativeModules.RNChatHead;
const App = () => {
  const onRequestPermission = () => requestPermission().then(() => showToast("Permission received")).catch(() => showToast("Failed to get permission"))
  const onCheckPermissoin = () => checkPermission().then((value) => showToast(`Permission: ${value ? 'Yes' : 'No'}`)).catch(() => showToast("Failed to check"))
  const onInit = () => initialize().then(() => showToast("Init")).catch(() => showToast("Failed init"));
  useEffect(()=>{
    console.log(NativeModules.RNChatHead);
  })
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          height:200,
          width:100,
          backgroundColor: "red"
        }}
      ></View>
      <SafeAreaView >
        <ScrollView
        
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          <View style={{ padding: 30 }}>
            <Text>Check Permission</Text>
            <Button style={styles.button} title="Check" onPress={()=>{}} />
            <Text>Ger Permission</Text>
            <Button style={styles.button} title="Get Permission" onPress={onRequestPermission} />
            <Text>Initialize Bubble Manage</Text>
            <Button style={styles.button} title="Initialize" onPress={onInit} />
            <Text>Add the bubble</Text>
            <Button style={styles.button} title="Add Bubble" onPress={()=>{}} />
            <Text>Remove the bubble</Text>
            <Button style={styles.button} title="Hide Bubble" onPress={()=>{}} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'transparent',
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  button: {
    margin: 30
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;