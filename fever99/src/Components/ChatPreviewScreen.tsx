// import React from 'react';
// import { View, Image, Text, Button } from 'react-native';

// const PreviewScreen = ({ route, navigation }) => {
//   const { file, onSend } = route.params;

//   if (!file || !file.uri || !file.type) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>File preview not available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       {file.type.startsWith('image/') ? (
//         <Image source={{ uri: file.uri }} style={{ width: 300, height: 300 }} />
//       ) : (
//         <Text>File preview not available</Text>
//       )}
//       <Button title="Send" onPress={() => onSend(file)} />
//     </View>
//   );
// };

// export default PreviewScreen;





import React, { useState } from 'react';
import { View, Image, Text, Button, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';

const ChatPreviewScreen = ({ route, navigation }) => {
  const { file, onSend } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPress = async () => {
    setIsLoading(true);
    await onSend(file);
    setIsLoading(false);
  };

  if (!file || !file.uri || !file.type) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>File preview not available</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {file.type.startsWith('image/') ? (
        <Image source={{ uri: file.uri }} style={{ width: 300, height: 300 }} />
      ) : file.type === 'application/pdf' ? (
        <Text>{file.name}</Text>
      ) : (
        <Text>File preview not available</Text>
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        // <Button title="Send" onPress={handleSendPress} /> 
          <TouchableOpacity style={styles.button} onPress={handleSendPress}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  filePreview: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    marginTop:'20%'
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatPreviewScreen;
