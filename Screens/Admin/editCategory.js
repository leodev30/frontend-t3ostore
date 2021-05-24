import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet} from 'react-native';
import Input from '../Form/Input'
import MyButton from '../../Shared/MyButton';
import axios from 'axios';
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-toast-message";


const EditCategory = (props) => {
    // console.log(props)
    
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [token, setToken] = useState();
    
    useEffect(() => {
        setName(props.route.params.item.name);
        setId(props.route.params.item.id);


        return () => {
            setName();
            setId();
        }

    }, [])

    const editCategory = () => {

        AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        
        const category = {
            name: name
        }
        

        
        axios
        .put(`${baseURL}/categories/${id}`, category, config)
        .then(console.log(category))
        .then(console.log(`${baseURL}/categories/${id}`))
        .then((res) => {
            if (res.status == 200 || res.status == 201) {
            Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Đã sửa thương hiệu.",
                text2: "",
            });
            setTimeout(() => {
                props.navigation.navigate("Products");
            }, 500);
            }
        })   

    }
    

    return (
        <View style={{alignItems: 'center'}}>
            <View style={{height: 70}}></View>
            <Input
                    name={"name"}
                    id={"name"}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            <MyButton style={{
                        backgroundColor: '#00b488',
                        borderRadius: 20,
                        marginTop: 15
                    }} large primary onPress={() => editCategory()}>
                        <Text style={{ color: "white", fontWeight:'700', fontSize: 16 }}>Xác nhận</Text>
                    </MyButton>
        </View>
    )
}
export default EditCategory;