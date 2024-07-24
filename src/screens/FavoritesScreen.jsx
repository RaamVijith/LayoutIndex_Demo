import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/slices/usersSlice";
import ListItems from "../components/ListItems";
import SearchBar from "../components/SearchBar";
import CustomButton from "../components/CustomButton";

const FavoriteScreen = () => {
  const favoriteUsers = useSelector((state) => state.users.favoriteUsers);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (userId) => {
    dispatch(removeFavorite(userId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="User Id"
          //  onChangeText={setSearch}
          //  value={search}
        />
        <CustomButton title="Search" />
      </View>

      <Text style={styles.titleText}> FAVOURITE USERS</Text>

      <ListItems
        text="REMOVE"
        data={favoriteUsers}
        handleAction={handleRemoveFavorite}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  removeButton: {
    color: "red",
  },
  titleText: {
    fontSize: 18,
    margin: 15,
    fontWeight: "500",
  },
  searchContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    height: "10%",
    paddingHorizontal: "2%",
  },
});
