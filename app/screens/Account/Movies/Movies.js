import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../../utils/firebase";
import firebase from "firebase/app";

export default function Movies(props) {
    const { navigation } = props
    const [user, setUser] = useState(null);
 
    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) =>{
            console.log(userInfo);
            setUser(userInfo);
        })
    }, [])

    return(
        <View style={styles.viewBody}>
            <Text>Explorar pelis y series..{/* (infinity display) */}</Text>
          { user && (
          <Icon 
            type="material-community"
            name="comment"
            color="#900"
            reverse
            containerStyle={styles.iconComments}
            onPress={() => navigation.navigate("view-feedback")}
            />
          )}
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff",
    },    
    iconComments: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
    },
  
});