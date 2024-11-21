import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { initializeDatabase, getNotes } from './database';

export default function TabOneScreen() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    initializeDatabase();
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    getNotes((fetchedNotes) => {
      setNotes(fetchedNotes);
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.noteItem}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text style={styles.noteContent}>{item.content}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  list: {
    flexGrow: 1,
  },
  noteItem: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
