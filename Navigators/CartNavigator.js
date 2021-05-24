import React , { useContext } from 'react'
import { createStackNavigator } from "@react-navigation/stack"

import Cart from '../Screens/Cart/Cart'
import CheckoutNavigator from './CheckoutNavigator'
import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import AuthGlobal from '../Context/store/AuthGlobal'

const Stack = createStackNavigator();

function MyStack() {
    const context = useContext(AuthGlobal);
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Cart"
                component={Cart}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="Checkout"
                component={CheckoutNavigator}
                options={{
                    title: 'Thông tin'
                }}
            />
            {context.stateUser.isAuthenticated ? 
                null: (
                <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
                 />
            )}

            {context.stateUser.isAuthenticated ? 
                null: (
                <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false
                }}
                 />
            )}  
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}