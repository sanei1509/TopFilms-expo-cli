import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

export default function Loading(props) {
   const { isVisible, text} = props;
    return(
       <Overlay
          isVisible={isVisible}
          windowBackgroundColor="rgba(0, 0, 0, 0.66)"
          overlayBackgroundColor="transparent"
          overlayStyle={styles.overlay}
       >
           <View style={styles.view}>
               <ActivityIndicator size="small" color="#ffff" />
            {text && <Text style={styles.text}>{text}</Text>}
           </View>
       </Overlay>
    );

}

const styles = StyleSheet.create({
       overlay: {
           height: 62,
           width: 220,
           backgroundColor: "#900",
           borderColor: "#fff",
        //    borderStyle: "inset",                                                                                                     
           borderWidth:0.1,
           borderRadius: 15,   
       },
       view: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
       },
       text: {
           color: "#fff",
        //    textTransform: "uppercase",
           marginTop: 5,
           fontSize:18,  
       },
});