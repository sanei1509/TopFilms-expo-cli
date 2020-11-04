import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function DisplayNameForm(props) {
    const { displayName,
            toastRef,
            setShowModal,
            setReloadUserInfo
        } = props
        const [ newDisplayName, setNewDisplayName ] = useState(null);
        const [ error, setError ] = useState(null);
        const [ isLoading, setIsLoading ] = useState(false);

        const onSubmit = () => {
            setError(null);
            if(!newDisplayName) {
                setError("No puede dejar el usuario sin valor");
            } else if(displayName === newDisplayName) {
                setError("El nombre de usuario es igual al anterior");
            } else {
                setIsLoading(true);
                const update = {
                    displayName: newDisplayName,
                };
                firebase
                .auth()
                .currentUser
                .updateProfile(update)
                .then(() => {
                    setIsLoading(false);
                    setReloadUserInfo(true);
                    setShowModal(false);
                    toastRef.current.show("Nombre de usuario actualizado!");
                })
                .catch(() =>{
                    setError("Error al actualizar nombre de usuario")
                    setIsLoading(false);
                    setShowModal(false);
                });
            }

        };
        return(
        <View style={styles.view}>
            <Input 
            containerStyle={styles.inputForm}
            placeholder="Nuevo nombre de usuario"
            rightIcon={{
                type: "material-community",
                name: "pen",
                color: "#c1c1c1"
            }}
            // defaultValue={displayName ? displayName : ""}
            onChange={ (e) => setNewDisplayName(e.nativeEvent.text)   }
            errorMessage={error}
            />
            <Button 
                title="Cambiar Nombre"
                titleStyle={styles.textBtn}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        paddingBottom: 3,
    },
    inputForm: {
    },
    btnContainer: {
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 13,
        width: "96.5%",
    },
    btnStyle: {
        // backgroundColor: "",
    },
    textBtn: {
        fontSize:17.5 ,
        fontStyle: "italic",
    },
})