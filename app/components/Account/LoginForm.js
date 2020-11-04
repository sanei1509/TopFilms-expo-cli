import React, {useState} from "react";
import { StyleSheet, View, Text } from "react-native";
import {Input, Button, Icon } from "react-native-elements";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { validateEmail } from ".././../utils/validations"; 
import Loading from "../Loading";

export default function LoginForm(props) {
    const { toastRef } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(datos());
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();   

    const onChange = (e, type) => {
      setFormData({...formData,[type]: e.nativeEvent.text});
    };
    const  onSubmit = () => {
          if( isEmpty(formData.email) || isEmpty(formData.password)){
             toastRef.current.show("Debe completar todos los datos");
            }else if(!validateEmail(formData.email)){
                toastRef.current.show("Correo electrónico no válido");
            }/* else if (){
          
            } */ else{
                setLoading(true);
                firebase
               .auth()
               .signInWithEmailAndPassword(formData.email, formData.password)
               .then(()=>{
                   setLoading(false);
                   navigation.navigate("account")
               })
               .catch(() =>{
                   setLoading(false);
                   toastRef.current.show("Contraseña o correo incorrectos");
               })
            }
            
                 
        }

    return(
     <View style={StyleSheet.formContainer}>
        <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e,"email")}        
        rightIcon={
            <Icon
            type="material-comunity"        
             name="email"
             iconStyle={styles.loginIcon}
           />       
            }
        />
        <Input 
         placeholder="Contraseña"
         containerStyle={styles.inputForm}
         password={true}
         secureTextEntry={showPassword ? (false): (true)}
         onChange={(e) => onChange(e,"password")}
         rightIcon={
             <Icon
             type="material-community"
             name={showPassword ? "eye-off" : "eye"}
             iconStyle={styles.loginIcon}
             onPress={() => setShowPassword(!showPassword)}
             />
         }
        />
        <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        onPress={() => onSubmit()}
        /> 
        <Loading isVisible={loading} text="Verificando.." />  
     </View>

   );

}

function datos(){
    return{
        email: "",
        password: "",
    };
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1 ,
        alignItems:"center",
        justifyContent: "center",
        marginTop: 10,
    },
    inputForm: {
       marginTop:20,
    },
    loginIcon: {
       color: "#596e79c1",
       fontSize: 23,
    },
    btnContainer: {
        marginTop: 20,
        marginBottom:4,
        width: "100%",
    },
    btnStyle: {
        backgroundColor: "#900",
    }
});