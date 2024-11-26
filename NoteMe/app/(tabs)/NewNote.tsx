import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { View } from '@/components/Themed';
import { initializeDatabase, getNotes } from '../database';
import { useRouter } from 'expo-router';
import { addNote } from '../database'

export default function NewNoteScreen() {
  // State to manage input fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter()

  // Function to handle saving the note
  const handleSave = () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert('Error', 'Title and body cannot be empty!');
      return;
    }

    // Save the note to the database
    addNote(title, subtitle, body);

    // Reset input fields
    setTitle('');
    setSubtitle('');
    setBody('');

    // Confirm save to the user
    Alert.alert('Success', 'Note saved successfully!', [
          { text: 'OK', onPress: () => router.push('/') }, // Navigate to index.tsx
        ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Note</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <TextInput
        style={styles.input}
        placeholder="Enter title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle} // Update the state on text change
      />
      <TextInput
        style={styles.input}
        placeholder="Enter subtitle"
        placeholderTextColor="#999"
        value={subtitle}
        onChangeText={setSubtitle} // Update the state on text change
      />
      <TextInput
        style={[styles.input, styles.bodyInput]}
        placeholder="Enter body"
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
        value={body}
        onChangeText={setBody} // Update the state on text change
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed to align items at the top
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
