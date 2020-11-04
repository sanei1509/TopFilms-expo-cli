import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import MoviesStack from "./MoviesStack";
import AccountStack from "./AccountStack";
import MiListaStack from "./MiListaStack";
import SearchStack from "./SearchStack";
import TopTitulosStack from "./TopTitulosStack";


const Tab = createBottomTabNavigator();


 export default function Navigation() {
    return(
        <NavigationContainer>
            <Tab.Navigator
         
              initialRouteName="movies"
              tabBarOptions={{
                   inactiveTintColor:"#c1c1c1",
                   activeTintColor:"#e71414",
                   activeBackgroundColor: "#1b262c",
                   inactiveBackgroundColor: "#000",
              }}
              screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color),
              })}
              >
                <Tab.Screen 
                    name="account"
                    component={AccountStack}
                    options={{ title:"Mi cuenta" }}
                    />                 
                <Tab.Screen
                    name="search"
                    component={SearchStack}
                    options={{title:"Buscar"}}
                    />
                <Tab.Screen
                    name="movies" 
                    component={MoviesStack}
                    options={{ title:"Películas" }} 
                    />
                <Tab.Screen
                    name="top-titulos"
                    component={TopTitulosStack}
                    options={{ title:"Valoraciones" }}
                    />        
                <Tab.Screen     
                    name="mi-lista" 
                    component={MiListaStack} 
                    options={{ title:"Mi lista" }}
                    />
            </Tab.Navigator>
        </NavigationContainer>

    );

 }

 function screenOptions(route, color) {
      let iconName;

      switch (route.name) {
          case "movies":
              iconName= "filmstrip";
                break;
          case "account":
              iconName= "account-circle";
                 break;
          case "search":
               iconName= "compass";
                 break; 
          case "top-titulos":
                iconName= "podium-gold";
                 break;
          case "mi-lista":
                iconName= "bookmark-multiple";
                 break;
        default:
                break;
      }
      return (
          <Icon type="material-community" name={iconName} size={22} color={color} />
      );
 }

