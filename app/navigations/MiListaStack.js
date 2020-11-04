import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MiLista from "../screens/MiLista";

const Stack = createStackNavigator();

export default function MiListaStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                  name="mi-lista"
                  component={MiLista}
                  options={{title:"Películas y series guardadas"}}
            />
        </Stack.Navigator>
    );
}