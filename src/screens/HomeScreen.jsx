import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, Image, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addFavorite } from "../redux/slices/usersSlice";
import CustomButton from "../components/CustomButton";
import SearchBar from "../components/SearchBar";
import ListItems from "../components/ListItems";
import NetInfo from "@react-native-community/netinfo";

const HomeScreen = ({ navigation }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        dispatch(fetchUsers());
      } else {
        dispatch(loadUsersFromStorage());
      }
    });
  }, [dispatch]);

  const handleAddFavorite = (user) => {
    try {
      dispatch(addFavorite(user));
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleUserPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleSearch = () => {
    const user = users.find((u) => u.id.toString() === search);
    setSearchResult(user);
    if (user) {
      handleUserPress(user);
    } else {
      alert("User not found");
    }
  };

  return (
    <View style={styles.container}>
      {status === "loading" && <Text>Loading...</Text>}
      {status === "failed" && <Text>Error: {error}</Text>}

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="User Id"
          onChangeText={setSearch}
          value={search}
        />
        <CustomButton onPress={handleSearch} title="Search" />
      </View>

      <Text style={styles.titleText}> AVAILABLE USERS</Text>

      <ListItems
        text="ADD"
        data={users}
        handlePopup={handleUserPress}
        handleAction={handleAddFavorite}
      />

      {selectedUser && (
        <Modal
          transparent={true}
          visible={isModalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={styles.modalInsideContainer}>
                <Image
                  source={{ uri: selectedUser.avatar }}
                  style={styles.avatar}
                />
                <View style={styles.modalInsideContainerText}>
                  <Text>First Name</Text>
                  <Text>Last Name</Text>
                  <Text>Email</Text>
                </View>
                <View style={styles.modalInsideContainerText}>
                  <Text>{selectedUser.first_name}</Text>
                  <Text>{selectedUser.last_name}</Text>
                  <Text>{selectedUser.email}</Text>
                </View>
              </View>

              <CustomButton title="Close" onPress={handleCloseModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    height: "10%",
    paddingHorizontal: "2%",
  },
  titleText: {
    fontSize: 18,
    margin: 15,
    fontWeight: "500",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContainer: {
    width: "90%",
    paddingTop: 40,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderBottomEndRadius: 20,
    alignItems: "center",
  },
  modalInsideContainer: {
    flexDirection: "row",
    gap: 15,
  },
  modalInsideContainerText: {
    gap: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  closeButton: {
    marginTop: 10,
    color: "blue",
  },
  favoriteButton: {
    marginTop: 10,
    color: "green",
  },

  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    elevation: 5,
    shadowColor: "black",
    borderRadius: 5,
  },
});
