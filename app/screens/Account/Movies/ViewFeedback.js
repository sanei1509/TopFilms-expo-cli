import React from "react";
import {StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";

export default function ViewFeedback(props) {
    const { navigation } = props;

    return(
        <View style={styles.view}>
            <Text>Mira los comentarios mas utiles sobre las peliculas más recomendadas</Text>
          <Icon 
            type="material-community"
            name="comment-plus"
            color="#900"
            reverse
            containerStyle={styles.btnAddVision}
            onPress={() => navigation.navigate("add-feedback")}
          />
        </View>    
    )
} 

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    btnAddVision: {
        position: "absolute",
        bottom: 10,
        right: 10,
    },
});