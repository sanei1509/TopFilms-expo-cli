import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { map, size, filter } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from "react-native-gesture-handler";

const widthScreen = Dimensions.get("window").width;

export default function FeedbackForm(props) {
    const { toastRef, setIsLoading, navigation } = props;
    const [ filmName, setFilmName ] = useState(" ");    
    const [ filmPageOrApp, setFilmPageOrApp ] = useState(" ");
    const [ filmRecommendation, setFilmRecommendation ] = useState(" "); 
    const [ imageSelected, setImageSelected ] = useState([]);

    const addRecommendation = () => {
        // console.log("click");
        // console.log("filmName: "+filmName);
        // console.log("filmPageOrApp: "+filmPageOrApp);
        // console.log("filmRecommendation: "+filmRecommendation);
        console.log(imageSelected);
    };

    return(
        <ScrollView style={styles.scrollView}>
            <ImageMovie 
                imagenPelicula={imageSelected[0]}
            />
            <FormAdd 
                setFilmName={setFilmName}
                setFilmPageOrApp={setFilmPageOrApp}
                setFilmRecommendation={setFilmRecommendation}
            />
            <UploadImage 
                toastRef={toastRef}
                setImageSelected={setImageSelected}
                imageSelected={imageSelected}
            />            
            <Button 
                titleStyle={styles.btnText}
                title="Subir Recomendación"
                onPress={addRecommendation}
                buttonStyle={styles.btnRecommend}
                linearGradientProps={{
                    colors: [ "#1b262c", "#e3e3e3"],
                    start: { x:0, y:0.5 },
                    end: { x:1 , y:0.5 }, 
                }}
                TouchableComponent={TouchableOpacity}
            />
        </ScrollView>
    );
}

 function ImageMovie(props) {
     const {imagenPelicula} = props;

     return(
         <View style={styles.viewCover}>
             <Image 
                source= { imagenPelicula 
                        ? {uri: imagenPelicula} 
                        : require("../../../../assets/img/404-not-found.jpg") }
                style={{ width: widthScreen, height: 265 }}
             />
         </View>
     );
 }
 
 function FormAdd(props) {
    const { setFilmName,
            setFilmPageOrApp,
            setFilmRecommendation
            } = props
            
     return(
    <View style={styles.viewForm}>
        <Input 
            placeholder="Título de la película o serie..."
            containerStyle={styles.input}
            onChange={(e) => setFilmName(e.nativeEvent.text)}
        />
        <Input 
            placeholder="En que página o aplicación la miraste.."
            containerStyle={styles.input}
            onChange={(e) => setFilmPageOrApp(e.nativeEvent.text)}
        />
        <Input 
            placeholder="Tu recomendación     ej: me arrepiento de verla
                                        *fue la mejor que vi esta semana la recomiendo                  "
            multiline={true}
            inputContainerStyle={styles.textArea}
            onChange={(e) => setFilmRecommendation(e.nativeEvent.text)}
        />
     </View>
     );
 }

 function UploadImage(props) {
     const { toastRef,
             setImageSelected ,
             imageSelected   
            } = props; 
            
     const imageSelect = async () => {
         const resultPermissions = await Permissions
                  .askAsync(Permissions.CAMERA_ROLL);
           if (resultPermissions === "denied") {
               toastRef.current.show("Es necesario el permiso si quiere acceder a su galería"
               ,3000
              );
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [4, 4]
            });
            if (result.cancelled) {
                toastRef.current.show("No has seleccionado ninguna imagen"
                ,2000
                );
            } else {
                setImageSelected([...imageSelected, result.uri]);
            } 
        } 
          };

          const removeImage = (image) => {
        
            Alert.alert(
                "Eliminar Imagen",
                "¿Estas seguro de que quieres borrar esta imagen?",
                [
                    {
                        text: "Cancelar",
                        style:"cancel"
                    },
                    {
                        text: "Eliminar",
                    onPress: () => {
                        setImageSelected(
                             filter(imageSelected, (imageUrl) => imageUrl !== image )
                        )
                     },
                   },
                ],
                { cancelable: false }
            );
        };

     return (
         <View style={styles.viewImages}>
             {size(imageSelected) < 4 && (
            <Icon 
                type="material-community"
                name="camera-plus-outline"
                color="#fff"
                containerStyle={styles.containerIcon}
                onPress={imageSelect}
                />
              )}
           
            {map(imageSelected, (imageMovie, index)=> (
                <Avatar
                key={index}
                style={styles.miniature}
                source={{ uri: imageMovie }}
                onPress={() => removeImage(imageMovie)}
                />
            ))}
         </View>
     );
 }

const styles = StyleSheet.create({
    scrollView: {
        height: "100%",
    }, 
    viewForm: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 30,
    },
    input: {
        marginBottom:10,
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0,
    },
    btnRecommend: {
        backgroundColor:"#ffff",
        width: "93%",
        marginRight: "auto",
        marginLeft: "auto",
        borderRadius: 10,
    },
    btnText: {
        color: "#fff",
    },
    viewImages: { 
        flexDirection: "row",
        marginLeft: 15,
        marginRight: 20,
        marginTop: 30,
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        width: 70,
        height: 70,
        backgroundColor: "#1b262c",
        marginBottom: 20,
        marginTop: -30,
        marginRight: 10,
    },
    miniature: {
       width: 70,
       height: 70,
       margin: 10,
       marginTop: -30, 
    },
    viewCover: {
        alignItems: "center",
        height: 260,
        marginTop:0,
    },
});