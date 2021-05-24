import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import { Container } from "native-base"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from "@react-native-community/async-storage"
import OrderCard from "../../Shared/OrderCard"

import axios from "axios"
import baseURL from "../../assets/common/baseUrl"

import AuthGlobal from "../../Context/store/AuthGlobal"
import { logoutUser } from "../../Context/actions/Auth.actions"
import { useEffect } from 'react/cjs/react.development';

const OrdersManage = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
    const [orders, setOrders] = useState()

    useFocusEffect(
        useCallback(() => {
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

        axios
        .get(`${baseURL}/orders/`)
        .then((x) => {
            const data = x.data;

            const userOrders = data.filter(
                (order) => {
                     return order.user._id === context.stateUser.user.id                   
                }
            );
            setOrders(userOrders);
        })
        .catch((error) => console.log(error))

        return () => {
            setUserProfile();
            setOrders();
        }

    }, [context.stateUser.isAuthenticated]))

    return (
       <Container style={styles.container}>
           <ScrollView contentContainerStyle={styles.subContainer}>
               <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                Các đơn hàng của {userProfile ? userProfile.name : "" }
               </Text>
               <View style={styles.order}>
                   <View>
                       {orders ? (
                           orders.map((x) => {
                               return <OrderCard key={x.id} {...x} />;
                           })
                       ) : (
                           <View style={styles.order}>
                               <Text>Bạn chưa có đơn hàng nào!</Text>
                           </View>
                       )}
                   </View>
               </View>
           </ScrollView>
       </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eeeeee',
        flex: 1,
        alignItems: "center",
    },
    subContainer: {
        alignItems: "center",
        marginTop: 20
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
})

export default OrdersManage;