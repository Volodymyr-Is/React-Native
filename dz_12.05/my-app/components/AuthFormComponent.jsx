import React from 'react'
import { Button, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

export default function AuthFormComponent({ username, password, onUsernameChange, onPasswordChange, onRegister, onLogin }) {
   return (
      <View style={styles.container}>
        <Text style={{fontSize:20,marginBottom:10}}>Login or Register</Text>
        <TextInput placeholder='Username' 
          style={{borderWidth:1, marginBottom:10,padding:5}}
          value={username}
          onChangeText={onUsernameChange}
        />
        <TextInput placeholder='Password' 
          style={{borderWidth:1, marginBottom:10,padding:5}}
          value={password}
          onChangeText={onPasswordChange}
        />
        <Button title='Register' onPress={onRegister}/>
        <Button title='Login' onPress={onLogin}/>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
})