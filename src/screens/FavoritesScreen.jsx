import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../redux/slices/usersSlice';

const FavoriteScreen = ({ navigation }) => {
  const favoriteUsers = useSelector(state => state.users.favoriteUsers);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (userId) => {
    dispatch(removeFavorite(userId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{item.first_name} {item.last_name}</Text>
            <TouchableOpacity onPress={() => handleRemoveFavorite(item.id)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

export default FavoriteScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeButton: {
    color: 'red',
  },
});