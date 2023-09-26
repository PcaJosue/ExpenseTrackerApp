import { Pressable, StyleSheet, View } from "react-native"
import  {Ionicons} from '@expo/vector-icons'

function IconButton({icon, size, color, onPress}){
    return(
        <Pressable onPress={onPress} style={({pressed})=> pressed && styles.presses }>
            <View style={styles.buttonContainer}>
                <Ionicons name={icon} size={size} color={color}/>
            </View>
        </Pressable>
    )
}

export default IconButton

const styles= StyleSheet.create({
    buttonContainer:{
        borderRadius:24,
        padding:8,
        margin:8
    },
    presses:{
        opacity:0.75
    }
})