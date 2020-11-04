import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopTitulos from "../screens/TopTitulos";

const Stack = createStackNavigator();

export default function TopTitulosStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="top-titulos"
                component={TopTitulos}
                options={{ title:"Ranking de valoraciones" }}
                />
        </Stack.Navigator>
    );
}