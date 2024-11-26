import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { initializeDatabase, getNotes, searchNotes } from '../database';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useNavigation } from 'expo-router';

export default function TabOneScreen() {
  const [noteList, setNoteList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const navigation = useNavigation();


  useEffect(() => {
    const setup = async () => {
      try {
        await initializeDatabase();
        await fetchNoteList();
      } catch (error) {
        console.error('Error during setup:', error);
      } finally {
        setLoading(false);
      }
    };
    setup();
  }, []);

  const unsubscribe = navigation.addListener('focus', () => {
    fetchNoteList(); // Refresh notes when the screen is focused
  });


  const fetchNoteList = async () => {
    try {
      const fetchedNotes = await getNotes();
      setNoteList(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSearchTextChange = async (query) => {
    setSearchText(query);
    if (query.trim() === '') {
      fetchNoteList();
    } else {
      const searchResults = await searchNotes(query);
      setNoteList(searchResults);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleString(); // Format as a readable date and time
  };

  const renderNoteItem = ({ item }) => (
    <TouchableOpacity style={styles.noteItem}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text style={styles.noteTimestamp}>Created: {formatTimestamp(item.created)}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Notes"
        value={searchText}
        onChangeText={handleSearchTextChange}
      />
      {noteList.length === 0 ? (
        <Text style={styles.noNotesText}>No notes available</Text>
      ) : (
        <FlatList
          data={noteList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderNoteItem}
        />
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/NewNote')}
      >
        <MaterialCommunityIcons name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteItem: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
    width: '90%',
    alignSelf: 'center',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  noteTimestamp: {
    marginTop: 4,
    fontSize: 12,
    color: '#777',
  },
  noNotesText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
