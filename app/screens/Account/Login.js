import React, {useRef} from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";

import LoginForm from "../../components/Account/LoginForm";

export default function Login() {
    const toastRef = useRef(); 
    
    return(
    <ScrollView>
           <Image
           source={require("../../../assets/img/Ultima2.jpg")}
           resizeMode="contain"
           style={styles.logo}
           />
        <View style={styles.viewContainer}>
              <LoginForm toastRef={toastRef} />
               <CreateAccount/>    
        </View>
           <Divider style={styles.divider}/>
           <Text>social Login</Text>         
     <Toast ref={toastRef} position="center" opacity={0.9} style={{backgroundColor:"#cf1b1b"}} />        
    </ScrollView>
        );
}

 function CreateAccount(props){
   const navigation = useNavigation();
     return (
        <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta?{" "}
            <Text
             style={styles.btnRegister}
             onPress={() => navigation.navigate("register")}
             >
                 Registrate ahora
             </Text>
        </Text>
     );
    
 }

const styles = StyleSheet.create({
    logo: {
        marginTop: 0, 
        height: 400 ,  
        width: "100%",
    },
    viewContainer: {
        marginRight:40,
        marginLeft:40,
    },
    loginForm: {
        marginLeft: 100,
    },
    textRegister: {
        marginTop: 10,
        marginLeft: "auto",
        marginRight: "auto",
        fontWeight: "bold",
    },
    btnRegister: {
        color: "#e71414",
        fontWeight: "bold",
    },
    divider: {
        backgroundColor: "#900",
        margin: 20,
    }

});