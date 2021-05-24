  
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


//Stacks
import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';
import UserNavigator from './UserNavigator';
import CartIcon from '../Shared/CartIcon';
import AdminNavigator from './AdminNavigator';
import UsersMngNavigator from './UsersMngNavigator';
import AuthGlobal from "../Context/store/AuthGlobal";

const  Tab = createBottomTabNavigator();

const Main = () => {

    const context = useContext(AuthGlobal) 

    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: '#03bafc'
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                      <Icon name="home" color={color} size={30} />
                    ),
                  }}
            />
            
            {context.stateUser.user.isAdmin == true ? null : (
              <Tab.Screen 
              name="Cart"
              component={CartNavigator}
              options={{
                  tabBarIcon: ({ color }) => (
                    <View>
                      <Icon name="shopping-cart" color={color} size={30} />
                      <CartIcon />
                    </View>
                  ),
                }}
          />)}
            
            {context.stateUser.user.isAdmin == true ? (
                <Tab.Screen
                name="Admin"
                component={AdminNavigator}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Icon name="cog" color={color} size={30} />
                  ),
                }}
              />
            ): null }

          {context.stateUser.user.isAdmin == true ? (
                <Tab.Screen
                name="UsersMng"
                component={UsersMngNavigator}
                options={{
                  tabBarIcon: ({ color }) => (
                    <Icon name="user" color={color} size={30} />
                  ),
                }}
              />
            ): null }
            <Tab.Screen 
                name="User"
                component={UserNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                      <Icon name="bars" color={color} size={29} />
                    ),
                  }}
            />
        </Tab.Navigator>
    )
}

export default Main;