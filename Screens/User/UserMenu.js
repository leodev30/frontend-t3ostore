import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from "@react-native-community/async-storage"
import MyButton from '../../Shared/MyButton'

import axios from "axios"
import baseURL from "../../assets/common/baseUrl"

import AuthGlobal from "../../Context/store/AuthGlobal"
import { logoutUser } from "../../Context/actions/Auth.actions"
import { getUserProfile } from "../../Context/actions/Auth.actions"
import { useEffect } from 'react/cjs/react.development';

var { width } = Dimensions.get("window");


const UserMenu = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
    
    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false || 
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }

        AsyncStorage.getItem("jwt")
            .then((res) => {
                console.log(AsyncStorage.getItem("jwt"));
                const AuthStr = 'Bearer '.concat(res); 
                axios.get(`${baseURL}/users/getCurrentUser`,  { headers: { Authorization: AuthStr } })
                    .then(
                        (user) => setUserProfile(user.data),
                        // console.log(`${baseURL}/users/${context.stateUser.user.userId}`)
                    )
                    .then(res => {

                        // If request is good...
                        console.log("Good request ");
                    })
                    .catch((error) => {
                        console.log('error ' + error);
                    });
            })
            .catch((error) => console.log(error))

        

        return () => {
            setUserProfile();
        }

    }, [context.stateUser.isAuthenticated])

    return (
       <View style={{alignItems: 'center', textAlign: 'center'}}>
            <Text style={styles.helloUser}> 
                Xin chào {userProfile ? userProfile.name : "" }! 
            </Text>              
           <MyButton style={styles.editButton} large onPress={() => {
                        props.navigation.navigate("User Profile")   
                    }}>
                <Text style={{ fontSize: 17, color: "black" }}>Quản lý tài khoản</Text>
            </MyButton>

            {context.stateUser.user.isAdmin == true ? null : (
                 <MyButton style={styles.editButton} large onPress={() => {
                    props.navigation.navigate("Orders Manage")
                }}>
                <Text style={{ fontSize: 17, color: "black" }}>Quản lý đơn hàng</Text>
                </MyButton>
            )}        
            <View style={{ marginTop: 50, width: 110, alignItems: 'center', alignSelf: 'center' }}>
                    <MyButton
                        style={{width:120, backgroundColor: '#3399FF', borderRadius: 20}}
                        
                        onPress={() => 
                            [
                                AsyncStorage.removeItem("jwt"),
                                logoutUser(context.dispatch)
                            ]
                        }
                    >
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16}}>Đăng xuất</Text>
                    </MyButton>
               </View>
       </View>
    )
}

const styles = StyleSheet.create({
   helloUser: {
       paddingTop: 50,
       textAlign: 'center',
       fontSize: 24,
       fontWeight: 'bold',
       paddingBottom: 20,
   },
   editButton:{
        backgroundColor:'#CFD8DC', 
        borderRadius: 20, 
        width: width / 1.2,
        height: 50,
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
   }
})

export default UserMenu;