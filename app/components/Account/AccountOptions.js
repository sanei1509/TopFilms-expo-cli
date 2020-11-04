import React, { useState } from "react";
import { StyleSheet ,View, Text} from "react-native";
import { Input, Button, ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modal";

import DisplayNameForm from "../Account/DisplayNameForm";
import EmailForm from "../Account/EmailForm";
import PasswordForm from "../Account/PasswordForm";

export default function AccountOptions(props) {
    const {
        setReloadUserInfo,
         userInfo,
         toastRef
     } = props;
     const [ showModal, setShowModal ] = useState(false);
     const [renderComponent, setRenderComponent] = useState(null);  
 
     const selectedComponent = (key) => {
        switch(key) {
                case "displayName": 
                    setRenderComponent( 
                        <DisplayNameForm 
                            displayName={userInfo.displayName}
                            setShowModal={setShowModal}
                            toastRef={toastRef}
                            setReloadUserInfo={setReloadUserInfo}
                        />
                    );
                    setShowModal(true)
                break;
                case "email":
                    setRenderComponent(
                        <EmailForm 
                            email={userInfo.email}
                            setShowModal={setShowModal}
                            toastRef={toastRef}
                            setReloadUserInfo={setReloadUserInfo}
                        />
                    );
                    setShowModal(true);
                break;
                case "password":
                    setRenderComponent(
                        <PasswordForm 
                            password={userInfo.password}     
                            setShowModal={setShowModal}
                            toastRef={toastRef}
                        />
                    );
                    setShowModal(true);
                break;
            default: 
                setRenderComponent(null)
                setShowModal(false);
                break;
        }
     };

     const menuOptions = generateOptions(selectedComponent);

    return(
        <View style={styles.viewAccountOptions}>
            {map(menuOptions, (menu, index)=> (
                <ListItem 
                    containerStyle={styles.listStyle}
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.colorLeftIcon,
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.colorRight,
                    }}
                    onPress={menu.onPress}
                />
            ))}
            {renderComponent && 
                <Modal isVisible={showModal} setIsVisible={setShowModal} >
                    {renderComponent}
                </Modal>
            }
            
        </View>
    )
}
    function generateOptions(selectedComponent) {
        return [
            {
               title: "Nombre de usuario", 
               iconType: "material-community",
               iconNameLeft: "pirate",
               colorLeftIcon: "#333333",
               iconNameRight: "chevron-down",
               colorRight: "#cd0a0a",
               onPress: () => selectedComponent("displayName")
            },
            {
                title: "Cambiar correo electrónico",
                iconType: "material-community",
                iconNameLeft: "email-outline",
                colorLeftIcon: "#333333",
                iconNameRight: "chevron-down",
                colorRight: "#cd0a0a",
                onPress: () => selectedComponent("email")
            },
            {
                title: "Cambiar contraseña",
                iconType: "material-community",
                iconNameLeft: "shield-lock-outline",
                colorLeftIcon: "#333333",
                iconNameRight: "chevron-down",
                colorRight: "#cd0a0a",
                onPress: () => selectedComponent("password")
            }
        ];
    }

const styles = StyleSheet.create({
    viewAccountOptions: {
        backgroundColor: "#000",
        paddingBottom: 80,
    },
    listStyle: {
        alignItems: "center",
        backgroundColor:"#fff",
        borderBottomWidth: 0.2,
        borderBottomColor: "#ccc",
        borderRadius: 20,
        height: 45,
        marginBottom: 0.2,
    },
}); 