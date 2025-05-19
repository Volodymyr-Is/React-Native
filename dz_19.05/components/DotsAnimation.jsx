import React, { useEffect } from 'react'
import { View, StyleSheet} from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated'

export default function DotsAnimation(props)
{
    const Dot = ({ delay }) => {
        const translateY = useSharedValue(0)

        useEffect(() => {
            const animate = () => {
            translateY.value = withDelay(delay, withSequence(withTiming(-10, { duration: 200 }), withTiming(0, { duration: 200 })))}

            const interval = setInterval(() => {
                animate()
            }, 1000)

            return () => clearInterval(interval)
        }, [])

        const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ translateY: translateY.value }],
        }))

        return <Animated.View style={[styles.dot, animatedStyle]} />
    }

    return(
        <View style={styles.container}>
            <Dot delay={0} />
            <Dot delay={200} />
            <Dot delay={400} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 50,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'blue',
    marginHorizontal: 5,
  },
})