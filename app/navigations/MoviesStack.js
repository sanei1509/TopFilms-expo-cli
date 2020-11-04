import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Movies from "../screens/Account/Movies/Movies";
import ViewFeedback from "../screens/Account/Movies/ViewFeedback";
import AddFeedback from "../screens/Account/Movies/AddFeedback";

const Stack = createStackNavigator();

export default function MoviesStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="movies"
            component={Movies}
            options={{ title:"Películas y Series" }}
            />
            <Stack.Screen 
            name="view-feedback"
            component={ViewFeedback}
            options={{title: "Visión y recomendación de otros"}}
            />
            <Stack.Screen 
            name="add-feedback"
            component={AddFeedback}
            options={{title: "Compartir con otros mi elección"}}
            />
        </Stack.Navigator>
    );

}