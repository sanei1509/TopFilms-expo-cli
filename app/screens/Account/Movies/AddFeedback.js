import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "react-native-elements";
import Toast from "react-native-easy-toast";
import FeedbackForm from "../Movies/FeedbackForm";

export default function AddFeedback(props) {
    const {navigation} = props;
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();

  console.log(props);
    return(
        <View>
           <FeedbackForm 
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
           />
          <Toast ref={toastRef} position="center" opacity={0.95}/>
        </View>
    );
}