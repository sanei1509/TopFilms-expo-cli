import React,{ useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button} from "react-native-elements";
import Loading from "../Loading";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import * as firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

export default function RegisterForm(props) {
       const { toastRef } = props;
       const [showPassword, setShowPassword] = useState(false);
       const [showRepeatPassword, setShowRepeatPassword] = useState(false); 
       const [formData, setFormData] = useState(defaultFormValue());
       const [loading, setLoading] = useState(false);
       const navigation = useNavigation();

       const onSubmit = () => {
           if(isEmpty(formData.email)
            ||isEmpty(formData.password)
            ||isEmpty(formData.rePassword)
                         ) {
            //  console.log("Todos los campos son obligatorios");
            toastRef.current.show("Todos los campos son obligatorios");
        }else if(!validateEmail(formData.email)) {
            toastRef.current.show("Correo electrónico no válido");
        } else if(formData.password !== formData.rePassword){
            toastRef.current.show("Las contraseñas no coinciden intentalo de nuevo");
        }else if (size(formData.password) < 6){
            toastRef.current.show("Las contraseñas deben tener mínimo 6 caracteres");
        }
        else {
            setLoading(true);
            firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .then( () => {
            setLoading(false);
               navigation.navigate("account");
            })
            .catch( () => {
                setLoading(false);
              toastRef.current.show("*Este correo electrónico ya esta en uso");
            })
            
        }
            
            
        };
       
       const onChange = (e, type) => {
        //    console.log(type);
        // setFormData({[type]: e.nativeEvent.text});
        setFormData({ ...formData, [type] : e.nativeEvent.text})
       };

    return(
      <View style={styles.formContainer}>
          <Input
          placeholder="Correo electrónico"
          containerStyle={styles.inputForm}
          onChange={(e) => onChange(e, "email")}
          rightIcon={
            <Icon 
                 type="material-community"
                 name="email-outline"  
                 iconStyle={styles.iconRight}       
            />
         }
       />
          <Input
          placeholder="Contraseña"
          containerStyle={styles.inputForm}
          password={true}
          secureTextEntry={showPassword ? (false):(true)}
          onChange={(e) => onChange(e, "password")}
          rightIcon={
            <Icon 
              type="material-community"
              name={showPassword ? "eye-off":"eye"}
              iconStyle={styles.iconRight}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          />
          <Input 
          placeholder="Confirmar contraseña"
          containerStyle={styles.inputForm}
          password={true}
          secureTextEntry={showRepeatPassword ? (false) : (true)}
          onChange={(e) => onChange(e, "rePassword")}
          rightIcon={
            <Icon 
                type="material-community"
                name={showRepeatPassword ? "eye-check-outline":"eye-check"}
                iconStyle={styles.iconRight}
                onPress={()=>setShowRepeatPassword(!showRepeatPassword)}
            />
          }
          />
          <Button
            title="Crear Cuenta"
            containerStyle={styles.btnContainerRegister}
            buttonStyle={styles.btnRegister}  
            onPress={() => onSubmit()}
          />
                <Loading 
                isVisible={loading}
                text="Registrando.."
                />
      </View>
    );

}

 function defaultFormValue() {
     return{
         email: "",
         password: "",
         rePassword: "",
     };
 };

const styles = StyleSheet.create({
    formContainer: {
            flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    inputForm: {
        width: "95%",
        marginTop:10,
    },
    btnContainerRegister: {
        width: "95%" ,
    },
    btnRegister: {
        //  height: 35,
         marginTop: 20,
         backgroundColor: "#900",
        //  borderRadius: 28,
        //  borderColor: "#900" ,
        //  borderWidth: 1,
    },
    iconRight: {
        fontSize:22 ,
        color: "#596e79c1",
    },
});