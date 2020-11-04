import React from "react";
import { StyleSheet, View, Text} from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
    const { userInfo: { uid, photoURL, displayName, email },
                         toastRef, 
                         setLoading,
                         setLoadingText,  
    } = props;
    
    const changeAvatar = async () => {
      const resultPermission = await Permissions.askAsync(
          Permissions.CAMERA_ROLL
       );
      const resultPermissionCamera = 
        resultPermission.permissions.cameraRoll.status;
      
      if (resultPermissionCamera === "denied") {
           toastRef.current.show("Para añadir imagen acepte los permisos por favor");
        } else { 
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
      if (result.cancelled) {
            toastRef.current.show("No has seleccionado ninguna imagen");
        } else { 
            uploadImage(result.uri)
            .then(() => {
                updatePhotoUrl();
            })
            .catch(() => {
                toastRef.current.show("Algo salió mal vuelve a intentarlo por favor",
                    3000
                );
            });
         } 
       }
    };

    const uploadImage = async (uri) => {
        setLoadingText("Actualizando su perfil..");
        setLoading(true);

       const response = await fetch(uri);
       const blob = await response.blob();
        
       const ref = firebase.storage().ref().child(`avatar/${uid}`);
       return ref.put(blob);
    };

    const updatePhotoUrl = () => {
        firebase
        .storage()
        .ref(`avatar/${uid}`)
        .getDownloadURL()
        .then( async (response) => {
            const update = {
                photoURL: response,
            };
            await firebase.auth().currentUser.updateProfile(update);
            setLoading(false);
        })
        .catch(() => {
            toastRef.current.show("Ha ocurrido un error inténtalo");
        });
    };

    return(
        <View style={styles.viewUserInfo}>
            <Avatar 
               rounded
               size={105}
               showEditButton
               onEditPress={changeAvatar}
               containerStyle={styles.userInfoAvatar}
               source={!photoURL 
                        ? require("../../../assets/img/avatar-super.jpg")
                        : {uri: photoURL}            
                        }
            />
        <View>
             <Text style={styles.userName}>
                {displayName ? displayName : "Usuario Anónimo"}
             </Text>
             <Text style={styles.user}>
                {email ? email : "Social login"}
             </Text>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#000",
    },
    userInfoAvatar: {
        marginRight: "auto",
        marginLeft: 60,
    },
    user: {
        marginRight: 100,
        color: "#fff",
        fontStyle: "italic",
    },
    userName: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 5,
        color: "#fff",
        fontStyle: "italic",        
    },
});