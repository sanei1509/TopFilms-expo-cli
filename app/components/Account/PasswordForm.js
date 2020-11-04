import React,{ useState } from "react";
import {StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Input, Button, Icon } from "react-native-elements";
import * as firebase from "firebase";
import { size } from "lodash";
import { reauthenticate } from "../../utils/api";

export default function PasswordForm(props) {
    const { password, setShowModal, toastRef} = props
    const [showPasswords, setShowPasswords] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValue);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e, type) => {
        setFormData({...formData,[type]: e.nativeEvent.text})
    }

    const onSubmit = async () => {
        setErrors({});
        if(!formData.confirmPassword || !formData.newPassword || !formData.repeatNewPassword) {
            setErrors({
                confirmPassword:"Todos los campos son obligatorios"
            });
            
        }
         else if(formData.newPassword !== formData.repeatNewPassword) {
            setErrors({
                  newPassword: "Las contraseñas no coinciden por favor vuelve a intentarlo",
                  repeatNewPassword: "Las contraseñas no coinciden por favor vuelve a intentarlo"
              });     
            } 
            else if(size(formData.newPassword) < 6) {
            setErrors({
                newPassword: "la contraseña debe tener un minimo de 6 caracteres",
                repeatNewPassword: "la contraseña debe tener un minimo de 6 caracteres"
            })
        } else {
            setIsLoading(true);
           await reauthenticate(formData.password)
            .then(async () => {
               await firebase
               .auth()
               .currentUser
               .updatePassword(formData.newPassword)
               .then(() =>{
                    setIsLoading(false);
                    setShowModal(false);
                    firebase.auth().signOut();
               }).catch(()=>{
                   setErrors({
                       confirmPassword: "Error al actualizar la contraseña vuelve a intentarlo por favor"
                   })
                   setIsLoading(false);
               })
            })
            .catch(() => {
                setErrors({
                    confirmPassword:"la contraseña no es correcta vuelve a inténtarlo"})
            })
            setIsLoading(false);
        }
     
    }

    return(
        <View style={styles.viewForm}>
            <Input 
                containerStyle={styles.inputForm}
                placeholder="Nueva contraseña"
                secureTextEntry={showPasswords ? (false) : (true)}
                password={true}
                rightIcon={{
                    type: "material-community",
                    name: showPasswords ? "eye-off" : "eye",
                    color: "#c1c1c1",
                    onPress: () => setShowPasswords(!showPasswords)
                }}
                errorMessage={errors.newPassword}
                onChange={(e) => onChange(e, "newPassword")}
            />
            <Input 
                containerStyle={styles.inputForm}
                placeholder="Repetir nueva contraseña"
                secureTextEntry={showPasswords ? false : true}
                password={true}
                errorMessage={errors.repeatNewPassword}
                onChange={(e) => onChange(e, "repeatNewPassword")}
            />
            <Input
                containerStyle={styles.inputFormConfirm}
                placeholder= "Contraseña actual por seguridad"
                secureTextEntry={showPassword ? false : true }
                password={true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off" : "eye",
                    color: "#c1c1c1",
                    onPress: () => setShowPassword(!showPassword)
                }}
                errorMessage={errors.confirmPassword}
                onChange={(e) => onChange(e, "confirmPassword")}
            />
            {/* <View>
                <TouchableOpacity 
                    style={styles.viewBtn}
                    onPress={onSubmit}
                    >
                    <Text style={styles.btnText}>Confirmar</Text>
                </TouchableOpacity>
            </View> */}
            <Button 
                title="Confirmar"
                titleStyle={styles.btnName}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View>
    );
}

    function defaultValue() {
        return{
            newPassword: "",
            repeatNewPassword: "",
            confirmPassword: "",
        };
    }

    const styles = StyleSheet.create({
        viewForm: {
            alignItems: "center",
            paddingBottom: 3,
        },
        inputForm: {
            width: "98%",
        },
        inputFormConfirm: {
            width: "98%",
            marginTop: 40,
            marginBottom: 12,
        },
        // viewBtn: {
        //     alignItems: "center",
        //     justifyContent: "center",
        //     backgroundColor: "#000",
        //     padding: 9,
        // },
        // btnText: {
        //     marginRight: 15,
        //     fontSize: 17,
        //     color: "#fff",
        //     fontStyle: "italic",
        //     fontWeight: "bold",
        // },
        btnContainer: {
            width: "96.5%",
        },
        btnStyle: {
            borderRadius: 3,
        },
        btnName: {
            fontSize: 17.5,
            fontStyle: "italic",
        },
    });