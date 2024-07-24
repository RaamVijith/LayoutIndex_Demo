import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const ListItems = ({ data, handlePopup, handleAction, text }) => {
  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listContainer}>
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => handlePopup && handlePopup(item)}
            >
              <View>
                <Text style={styles.subTitle}>ID</Text>
                <Text style={styles.subTitle}>Name</Text>
              </View>
              <View>
                <Text>{item.id}</Text>
                <Text>{item.first_name}</Text>
              </View>
            </TouchableOpacity>

            {text === "ADD" ? (
              <TouchableOpacity
                style={styles.actionContainer}
                onPress={() => handleAction && handleAction(item)}
              >
                <Text style={{ color: "green" }}>ADD</Text>
              </TouchableOpacity>
            ) : text === "REMOVE" ? (
              <TouchableOpacity
                style={styles.actionContainerRemove}
                onPress={() => handleAction && handleAction(item.id)}
              >
                <Text style={{ color: "red" }}>Remove</Text>
              </TouchableOpacity>
            ) : (
              <Text>Default Text</Text>
            )}
          </View>
        )}
      />
    </>
  );
};

export default ListItems;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 7,
    marginHorizontal: 15,
    marginVertical: 10,
    elevation: 5,
    shadowColor: "black",
    borderRadius: 5,
  },
  userItem: {
    padding: 10,
    marginVertical: 5,
    marginLeft: 10,
    flexDirection: "row",
    gap: 25,
    width: "80%",
  },
  subTitle: {
    fontWeight: "600",
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    marginRight: 30,
    borderLeftWidth: 0.3,
    borderColor: "lightgray",
  },
  actionContainerRemove: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderLeftWidth: 0.3,
    borderColor: "lightgray",
  },
  actionContainerText: {
    color: "green",
    fontWeight: "600",
  },
});
