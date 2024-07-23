import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Modal, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addFavorite } from '../redux/slices/usersSlice';

const HomeScreen = ({ navigation }) => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const { users, status, error } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddFavorite = (user) => {
    dispatch(addFavorite(user));
  };

  const handleUserPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  return (
     <View style={styles.container}>
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'failed' && <Text>Error: {error}</Text>}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItem} onPress={() => handleUserPress(item)}>
            <Text>{item.first_name} {item.last_name}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Go to Favorites" onPress={() => navigation.navigate('Favorites')} />
      {selectedUser && (
        <Modal
          transparent={true}
          visible={isModalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text>{selectedUser.first_name} {selectedUser.last_name}</Text>
              <Text>{selectedUser.email}</Text>
              <Image source={{ uri: selectedUser.avatar }} style={styles.avatar} />
              <TouchableOpacity onPress={handleCloseModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleAddFavorite(selectedUser)}>
                <Text style={styles.favoriteButton}>Add to Favorites</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  )
}

export default HomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  closeButton: {
    marginTop: 10,
    color: 'blue',
  },
  favoriteButton: {
    marginTop: 10,
    color: 'green',
  },
});
