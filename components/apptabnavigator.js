import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Bookdonate from '../screens/Bookdonate.js' ;
import BookRequest from '../screens/bookrequest' ;
export  const AppTabNavigator=createBottomTabNavigator({
    Donatebooks:{
        screen:Bookdonate,navigationOptions:{tabBarLabel:"donate books"}
    },
    Requestbooks:{
        screen:BookRequest,navigationOptions:{tabBarLabel:"request books"}
    }
})