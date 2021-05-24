import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"

// Screens
import Checkout from '../Screens/Cart/Checkout/Checkout';
import Payment from '../Screens/Cart/Checkout/Payment';
import Confirm from '../Screens/Cart/Checkout/Confirm';


const Stack = createStackNavigator();

function MyStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="Ship"
                component={Checkout}
                options={{
                    headerShown: false
                }}
            />  
            <Stack.Screen 
                name="Thanh toán"
                component={Payment}
                options={{
                    headerShown: false
                }}
            />  
            <Stack.Screen 
                name="Xác nhận"
                component={Confirm}
                options={{
                    headerShown: false
                }}
            />    
        </Stack.Navigator>
    );
}

export default function CheckoutNavigator() {
    return <MyStack />
}