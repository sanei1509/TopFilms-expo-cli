import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, Text , TouchableOpacity } from "react-native";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [reloadUserInfo, setReloadUserInfo] = useState(false); 
  const toastRef = useRef();
  
  useEffect(() => {
      (async () =>{
        const user = await firebase.auth().currentUser;
        setUserInfo(user);
      })();
      setReloadUserInfo(false);
  }, [reloadUserInfo])   
 
  return(
        <View style={styles.viewUserInfo}>
          { userInfo &&  <InfoUser 
                            userInfo={userInfo} 
                            toastRef={toastRef}   
                            setLoading={setLoading} 
                            setLoadingText={setLoadingText}
                             /> }
            <AccountOptions
                userInfo={userInfo}
                toastRef={toastRef}
                setLoading={setLoading}
                setReloadUserInfo={setReloadUserInfo}
            />
        <View style={styles.viewBtn}>
             <TouchableOpacity 
             onPress={() => firebase.auth().signOut()}
             style={styles.btnSalir}
             >
            <Text style={styles.btnText}>Cerrar sesión</Text>
             </TouchableOpacity>

        </View>
        <Toast ref={toastRef} position="center" opacity={0.9} style={{backgroundColor:"#900"}} />
        <Loading text={loadingText} isVisible={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
       minHeight: "100%",
      backgroundColor: "#c1c1c1",
    },
      viewBtn:{
        flex:1,
        alignItems: "center" ,
        justifyContent: "center",
      },
    btnSalir: {
        position: "absolute",
        bottom: 415,
        padding: 21,
        marginTop: 410,
        width: "100%",
        height: 28,
        backgroundColor: "#fff",
        borderRadius: 50,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        // borderTopWidth: 0.8,
        // borderTopColor: "#900"
    },
    btnText: {
      color: "#900",
      fontSize: 20,
      fontStyle: "italic",
      fontWeight: "bold",
    },
    
});