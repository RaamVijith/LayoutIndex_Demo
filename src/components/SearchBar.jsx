import {TextInput, StyleSheet } from 'react-native'

const SearchBar = ({placeholder, onChangeText, value}) => {
  return (
    <>
        <TextInput 
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          style={styles.searchBar}
          />
    </>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    searchBar:{
    width:"60%",
    height:45,
    backgroundColor:'#DFDFDF',
    marginHorizontal:"2%",
    marginVertical:"5%",  
    padding:10
  },
    
});