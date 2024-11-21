import { StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { View } from '@/components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Note</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <TextInput
        style={styles.input}
        placeholder="Enter title"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter subtitle"
        placeholderTextColor="#999"
      />
      <TextInput
        style={[styles.input, styles.bodyInput]}
        placeholder="Enter body"
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
  },
  bodyInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#157F1F',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
