import { set } from "lodash";
import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import { reauthenticate } from "../../utils/api";
import * as firebase from "firebase";

export default function EmailForm(props) {
    const { email,
            password,
            toastRef,
            setShowModal,
            setReloadUserInfo,
        } = props
    const [showPassword, setShowPassword] = useState(false);
    const [ formData, setFormData ] = useState(defaultValue()); 
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

        const onSubmit = () => {
            setErrors({});
            if(!formData.email || email === formData.email){
                setErrors({
                    email:"No ha sido posible realizar el cambio"
                });
            } else if(!validateEmail(formData.email)) {
                setErrors({
                   email: "El correo electrónico que esta ingresando no es válido" 
                });
            } else if(!formData.password) {
                setErrors({
                    password: "Campo obligatorio por seguridad"
                })
            } else {
                setIsLoading(true);
                reauthenticate(formData.password)
                .then(()=>{
                   firebase
                   .auth()
                   .currentUser
                   .updateEmail(formData.email)
                   .then(()=>{
                       setShowModal(false);
                       setReloadUserInfo(true)
                    toastRef.current.show("Cambio aplicado con éxito")
                   }).catch(() => {
                       setErrors({email: "Algo salió mal intentelo de nuevo por favor"})
                       setIsLoading(false);
                    })
                })
                .catch(() => {
                    setIsLoading(false);
                    setErrors({password: "Contraseña Incorrecta"});
                });
            }
        }

        const onChange = (e, type) => {
            setFormData({...formData, [type]: e.nativeEvent.text})
        }
    return(
        <View style={styles.view}>
            <Input 
                containerStyle={styles.inputForm}
                placeholder="Nuevo correo electrónico"
                rightIcon={{
                    type: "material-community",
                    name: "email-edit-outline",
                    color: "#c1c1c1",
                }}
                defaultValue={email}
                onChange={(e) => onChange(e,"email")}
                errorMessage={errors.email}
            />
            <Input
                containerStyle={styles.inputForm}
                placeholder="Contraseña para validar cambio"
                secureTextEntry={showPassword ? (false):(true)}
                password={true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off": "eye",
                    color: "#c1c1c1",
                    onPress: () => setShowPassword(!showPassword)
                }}
                onChange={ (e) =>onChange(e,"password")}
                errorMessage={errors.password}
            />
            <View >
            <TouchableOpacity 
                style={styles.viewBtn}  
                onPress={onSubmit}
                loading={isLoading}
                activeOpacity={0.2}
            >
                <Text style={styles.btnText}>Confirmar cambio</Text>
            </TouchableOpacity>
            </View>
        </View>
        
    );
}

function defaultValue() {
    return{
        email: "",
        password: "",
    }
}

    const styles = StyleSheet.create({
        view: {
            paddingBottom: 4,
        },
        inputForm: {
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 10,
            width: "97%",
        },
        viewBtn: {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            padding: 10,
            width: "94.5%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 3,
            borderRadius: 3,
        },
        btnText: {
            marginRight: 15,
            fontSize: 17,
            color: "#fff",
            fontStyle: "italic",
            fontWeight: "bold",
        },
    }); 