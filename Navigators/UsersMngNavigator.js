import React from 'react'
import { createStackNavigator} from '@react-navigation/stack'
import UsersManage from './../Screens/Admin/UsersManage'
const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="UsersMng"
                component={UsersManage}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export default function UsersMngNavigator() {
    return <MyStack />
}