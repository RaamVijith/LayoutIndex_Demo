import { Pressable, Text,  StyleSheet} from "react-native"

const CustomButton = ({onPress, title}) => {
  return (
    <>
        <Pressable onPress={onPress} style={styles.Button}>
          <Text style={styles.text}>{title}</Text>
        </Pressable>
    </>
  )
}

export default CustomButton;

const styles = StyleSheet.create({
Button:{
   backgroundColor:'#3A86A8',
   marginHorizontal:"2%",
   marginVertical:"5%",
   width:120,
   height:45,
   alignItems:"center",
   justifyContent:'center',
   borderBottomEndRadius:20
  },
text:{
    color:'#ffffff'
}

});
