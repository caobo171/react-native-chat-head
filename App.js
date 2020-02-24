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


import PushNotification from 'react-native-push-notification';


import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import BackgroundTask from 'react-native-background-task'
const {initialize, checkPermission, requestPermission} = NativeModules.RNChatHead;
BackgroundTask.define(()=>{
  console.log('Hello from a background task');
  initialize("https://data-gcdn.basecdn.net/avatar/sys1/95/24/6d/1e/40/414db186f7224645e8d79848ae872ad6/1.longkim_1.jpg");
  BackgroundTask.finish()
})

// PushNotification.configure({
//   onRegister:(token)=>{
    
//   },
//   onNotification:(noti)=>{
//     console.log('tadat')
//     alert('ALLLOOOO ');
//     //initialize("https://data-gcdn.basecdn.net/avatar/sys1/95/24/6d/1e/40/414db186f7224645e8d79848ae872ad6/1.longkim_1.jpg")
//   },
//   popInitialNotification:true,
//   requestPermissions:true
// })


// PushNotification.localNotificationSchedule({
//   message: "My Notification Message", // (required)
//   date: new Date(Date.now() + 5 * 1000) ,
//   repeatType:'minute'
// })

const showToast = text => ToastAndroid.show(text, 1000)


const App = () => {
  const onRequestPermission = () => requestPermission().then(() => showToast("Permission received")).catch(() => showToast("Failed to get permission"))
  const onInit = () => initialize("https://data-gcdn.basecdn.net/avatar/sys1/95/24/6d/1e/40/414db186f7224645e8d79848ae872ad6/1.longkim_1.jpg")
  useEffect(()=>{
    console.log(NativeModules.RNChatHead);
  })


  useEffect(()=>{
    BackgroundTask.schedule({
      period: 5, // Aim to run every 30 mins - more conservative on battery
    })
  },[])
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
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