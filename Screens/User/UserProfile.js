import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Dimensions } from 'react-native';
import { Container, Right } from "native-base"
import { useFocusEffect, useLinkProps } from "@react-navigation/native"
import AsyncStorage from "@react-native-community/async-storage"
import MyButton from "../../Shared/MyButton";
import { ListItem } from 'react-native-elements'
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"
import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native'
import AuthGlobal from "../../Context/store/AuthGlobal"
import { useEffect } from 'react/cjs/react.development';

var width = Dimensions.get("window")

const UserProfile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()

    useFocusEffect(
        useCallback(() => {
        if (
            context.stateUser.isAuthenticated === false || 
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }
        // console.log(context.stateUser.user);

        AsyncStorage.getItem("jwt")
            .then((res) => {
                const AuthStr = 'Bearer '.concat(res); 
                axios.get(`${baseURL}/users/getCurrentUser`, { headers: { Authorization: AuthStr } })
                    .then((user) => setUserProfile(user.data))
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

    }, [context.stateUser.isAuthenticated]))

    const list = [
        {
            title: 'userProfile' ,
            icon: 'user-o'
        },
        {
            title: 'Trips',
            icon: 'envelope-o'
        },
        {
            title: 'Appointments',
            icon: 'phone'
          },
        
      ]
    const li = [
        {
            title: 'Trips',
            icon: 'address-book-o'
        },
        {
            title: 'Trips',
            icon: 'building-o'
        },
    
    ]

    return (
        <Container style={styles.container}>
            <Card>
                <Card.Title style={{fontSize: 23}}>THÔNG TIN CÁ NHÂN</Card.Title>
                <Card.Divider/>
                {
                    <View style={{ marginTop: 50, alignItems: 'center', position: 'relative' }}>
                        <MyButton style={{                            
                                backgroundColor:'#0099FF', 
                                borderRadius: 5, 
                                position: 'absolute',
                                top: -50, left: 10,
                                }} large primary onPress={() => {
                                    props.navigation.navigate("Edit Profile")
                                }}>
                            <Text style={{ color: "white", fontSize: 16,fontWeight: '700' }}>Sửa thông tin</Text>
                            </MyButton>
                            <MyButton style={{                            
                                backgroundColor:'#339966', 
                                borderRadius: 5, 
                                position: 'absolute',
                                top: -50, right: 10,
                                }} large primary onPress={() =>  {
                                    props.navigation.navigate("Edit Password")
                                }}>
                            <Text style={{ color: "white", fontSize: 16, fontWeight: '700' }}>Đổi mật khẩu</Text>
                        </MyButton>
                    </View>  
                }
            </Card>
            <View style={{width: '92%', alignSelf: 'center', marginTop: 15,backgroundColor: 'white'}}>
            
                <Text style={styles.text2}>
                    <Icon name= "user-o" size={20} />       {userProfile ? userProfile.name : "" }
                </Text>  

                <Text style={styles.text}>
                    <Icon name= "envelope-o"size={20} />       {userProfile ? userProfile.email : "" }
                </Text>
                <Text style={styles.text}>
                    <Icon name= "phone" size={20} />       {userProfile ? userProfile.phone : "" }
                </Text>
                <Text style={styles.text}>
                    <Icon name= "address-book-o" size={20} />       {userProfile ? userProfile.address : "" }
                </Text> 
                <Text style={styles.text1} >
                    <Icon name= "building-o" size={20} />       {userProfile ? userProfile.city : "" }
                </Text> 
            
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
    text: {
        fontSize: 20,  
        height: 60,
        borderBottomWidth: 0.5,
        borderBottomColor: '#cccccc',
        padding: 20,paddingTop: 15, paddingBottom: 15,
    },
    text1: {
        fontSize: 20,  
        borderBottomWidth: 2,
        height: 60,
        borderBottomColor: '#dddddd',
        padding: 20,paddingTop: 15, paddingBottom: 15,
    },
    text2: {
        fontSize: 20,  
        borderTopWidth: 2,
        height: 60,
        borderTopColor: '#dddddd',
        borderBottomWidth: 0.5,
        borderBottomColor: '#cccccc',
        padding: 20,paddingTop: 15, paddingBottom: 15,
    }
})

export default UserProfile;