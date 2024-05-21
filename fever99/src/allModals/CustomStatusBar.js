// import React from 'react';
// import { View, StatusBar, StyleSheet, Platform, Dimensions } from 'react-native';

// const CustomStatusBar = ({ hidden }) => {
//   React.useEffect(() => {
//     StatusBar.setBarStyle('light-content', true);
//   }, []);

//   return (
//     <View style={styles.statusBarContainer}>
//       <StatusBar
//         translucent
//         backgroundColor="transparent"
//         hidden={hidden}
//       />
//       <View style={styles.statusBarBackground} />
//     </View>
//   );
// };

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
// const WIDTH = Dimensions.get('window').width * 0.97;

// const styles = StyleSheet.create({
//   statusBarContainer: {
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//     alignItems: 'center',
//   },
//   statusBarBackground: {
//     height: STATUSBAR_HEIGHT,
//     width: WIDTH,
//     backgroundColor: 'blue',
//     borderRadius: 15,
//     marginTop: Platform.OS === 'ios' ? 0 : STATUSBAR_HEIGHT,
//   },
// });

// export default CustomStatusBar;



import React from 'react';
import { View, StatusBar, StyleSheet, Platform, Dimensions } from 'react-native';

const RoundedStatusBar = () => (
  <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#1263AC"
        barStyle="light-content"
        hidden={false}
      />
  </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const WIDTH = Dimensions.get('window').width * 0.97;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : STATUSBAR_HEIGHT,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    width: WIDTH,
    backgroundColor: 'blue',
    borderRadius: 15,
    overflow: 'hidden',
  },
});

export default RoundedStatusBar;
