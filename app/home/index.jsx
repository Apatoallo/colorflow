import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { getRandomPastelColors } from '../utils/helpers';

export default function HomeScreen() {
  const text = "Hello There";
  const animatedValues = useRef(text.split('').map(() => new Animated.Value(0))).current;

  const [bubbles, setBubbles] = useState([]);
  const [currentColor, setCurrentColor] = useState(getRandomPastelColors(1)[0]);
  const [nextColor, setNextColor] = useState(getRandomPastelColors(1)[0]);

  const currentOpacity = useRef(new Animated.Value(1)).current;
  const nextOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateText = () => {
      const animations = animatedValues.map((animatedValue, index) => {
        return Animated.timing(animatedValue, {
          toValue: 1,
          duration: 100,
          delay: index * 100,
          useNativeDriver: true,
        });
      });

      Animated.stagger(50, animations).start(() => {
        setTimeout(() => {
          animatedValues.forEach((value) => value.setValue(0));
          animateText();
        }, 2000);
      });
    };

    animateText();
  }, [animatedValues]);

  const handlePress = (event) => {
    const { pageX, pageY } = event.nativeEvent;

    const newBubble = {
      id: Date.now(),
      x: pageX,
      y: pageY,
      scale: new Animated.Value(0),
      opacity: new Animated.Value(1),
    };

    Animated.parallel([
      Animated.timing(newBubble.scale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(newBubble.opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setBubbles((bubbles) => bubbles.filter((bubble) => bubble.id !== newBubble.id));
    });

    setBubbles((bubbles) => [...bubbles, newBubble]);

    const newColor = getRandomPastelColors(1)[0];
    setNextColor(newColor);

    Animated.parallel([
      Animated.timing(currentOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(nextOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setCurrentColor(newColor);
      currentOpacity.setValue(1);
      nextOpacity.setValue(0);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: currentColor, opacity: currentOpacity }]} />
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: nextColor, opacity: nextOpacity }]} />

        {bubbles.map((bubble) => (
          <Animated.View
            key={bubble.id}
            style={[
              styles.bubble,
              {
                top: bubble.y - 50,
                left: bubble.x - 50,
                opacity: bubble.opacity,
                transform: [{ scale: bubble.scale }],
              },
            ]}
          />
        ))}

        <View style={styles.textContainer}>
          {text.split('').map((letter, index) => (
            <Animated.Text
              key={`${letter}-${index}`}
              style={[
                styles.helloText,
                { opacity: animatedValues[index] },
              ]}
            >
              {letter}
            </Animated.Text>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  textContainer: {
    flexDirection: 'row',
    zIndex: 1,
  },
  helloText: {
    fontSize: 60,
    color: 'white',
    fontFamily: 'DancingScript',
  },
});
