import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useCountdown } from './hooks/useCountdown';
import { Button } from 'react-native-web';

export default function App() {
  const { secondsLeft, isActive, start, pause, reset } = useCountdown(30);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Time Left: {secondsLeft} с</Text>
      <Text>Status: {isActive ? 'Active' : 'Paused'}</Text>

      <Button title="Start" onPress={start} />
      <Button title="Pause" onPress={pause} />
      <Button title="Reset" onPress={reset} />
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
    gap: 5
  },
});
