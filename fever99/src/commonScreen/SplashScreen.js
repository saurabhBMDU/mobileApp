import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    // Start the animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 5 }
    ).start();

    // Navigate to the Root component after 5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Root');
    }, 5000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          source={require('../../assets/images/Logo34.png')}
          style={styles.image}
          resizeMode='contain'
        />
      </Animated.View>
      {/* <Animated.Text style={{ ...styles.text, opacity: fadeAnim }}>
        fever99.com
      </Animated.Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width:300, // Adjust the width and height as needed
    height:250,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SplashScreen;
