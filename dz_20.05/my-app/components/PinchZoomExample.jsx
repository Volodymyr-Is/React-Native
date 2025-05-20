import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const PinchZoomExample = () => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onChange((event) => {
      scale.value = event.scale; 
    })
    .onFinalize(() => {
      scale.value = Math.max(1, Math.min(scale.value, 3)); 
    });

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      translateX.value = event.translationX / scale.value; 
      translateY.value = event.translationY / scale.value;
    })
    .onFinalize(() => {
      translateX.value = 0; 
      translateY.value = 0;
    });

    const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = withTiming(1);
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    });

  const composedGesture = Gesture.Simultaneous(
    Gesture.Race(doubleTapGesture, Gesture.Simultaneous(pinchGesture, panGesture))
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={composedGesture}>
        <Animated.Image
          source={{ uri: 'https://yt3.googleusercontent.com/KVjptxDSWT7rjVfGax2TgTNVAYgplgo1z_fwaV3MFjPpcmNVZC0TIgQV030BPJ0ybCP3_Fz-2w=s900-c-k-c0x00ffffff-no-rj' }} 
          style={[styles.image, animatedStyle]}
        />
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});

export default PinchZoomExample;