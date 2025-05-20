import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import DragExample from './components/DragAnimation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SwipeCardExample from './components/SwipeCardExample ';
import PinchZoomExample from './components/PinchZoomExample';

export default function App() {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{flex:1}}>
        {/* <DragExample/> */}
        {/* <SwipeCardExample/> */}
        <PinchZoomExample/>
      </GestureHandlerRootView>
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
});
