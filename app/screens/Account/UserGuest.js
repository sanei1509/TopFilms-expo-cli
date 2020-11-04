import React from "react";
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

 export default function UserGuest() {
     const navigation = useNavigation();
     

      return(
          <ScrollView 
          centerContent={true}
          style={styles.viewBody}
          >
               <Image 
                  source={require("../../../assets/img/UserGuest.jpg")}
                  resizeMode="center"
                  style={styles.image}
                  />
                  <Text style={styles.title}>Personaliza tu perfil de CinePhile</Text>
                  <Text style={styles.description}>
                      ¿Ya decidiste que pelicula o serie vas a ver hoy? Busca títulos, mira la valoración y opinión de otras personas para decidirlo, y no olvides calificar y comentar también para ayudar a la decisión de otros. 
                  </Text>
                  <View style={styles.viewBtn}>
                      <TouchableOpacity 
                      style={styles.btnPerfil}
                        // buttonStyle={styles.btnPerfil}
                        // containerStyle={styles.btnContainerPerfil}
                        // title={"Ir al perfil"}
                        onPress={() => navigation.navigate("login")}
                      >
                          <Text style={styles.textPerfil}>Ir al perfil</Text>
                      </TouchableOpacity>
                  </View>
          </ScrollView>
      );
    }

  const styles = StyleSheet.create({
      viewBody: {
          marginLeft: 30,
          marginRight: 30,
          marginTop: 10,
          marginBottom: 20,
                },
      image: {
          height: 350,
          width: "100%",
          marginBottom: 10,
          marginTop:17,
          borderRadius: 20,
          borderColor: "#900",
         borderWidth: 1,
         backgroundColor: "#000",
             },
       title: {
          fontWeight: "bold",
          fontSize: 21,
          textAlign: "center",
          marginTop:3,
          marginBottom: 10,
          fontStyle: "italic" ,
          color: "#900",
             },
        description : {
            textAlign: "center",
            fontStyle: "italic",
            fontSize: 14.5,
            fontWeight: "400",
            color: "#596e79",
        },
        viewBtn: {
           flex: 1, 
           alignItems: "center",
           justifyContent: "center",
        },
        // btnContainerPerfil: {
        //     marginTop: 20,
        //     height: 100,
        //     width: "60%",
        // },
        // btnPerfil: {
        //     height: 35,
        //     backgroundColor: "#596e79",
        //     borderRadius: 25,
        // },
       btnPerfil : {
           flex : 1,
           padding: 10,
           marginTop: 20,
           width:160,
           height: 35,
           backgroundColor: "#596e79",
           borderRadius: 28,
           textAlign: "center",
           alignItems: "center",
           justifyContent: "center",
           borderColor: "#900",
           borderWidth: 0.3,
       },
       textPerfil :{
           color:"#fff" ,
           fontSize: 17,
           fontStyle: "italic",
           fontWeight: "bold",
       },
    });