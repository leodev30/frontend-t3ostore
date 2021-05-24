import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import FormContainer from "../Form/FormContainer";
import { Input } from 'react-native-elements';
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MyButton from "../../Shared/MyButton";
import AsyncStorage from "@react-native-community/async-storage"

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const EditProfile = (props) => {


    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");

    const [error, setError] = useState("");
    const [token, setToken] = useState();

    useEffect(() => {
        
        AsyncStorage.getItem("jwt")
            .then((res) => {
                const AuthStr = 'Bearer '.concat(res); 
                axios.get(`${baseURL}/users/getCurrentUser`,  { headers: { Authorization: AuthStr } })
                    .then(
                        (user) => {
                            setName(user.data.name),
                            setPhone(user.data.phone),
                            setAddress(user.data.address),
                            setCity(user.data.city)                           
                        },
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
            setName();
            setAddress();
            setCity();
            setPhone();
        };

    }, [])
    

  const editProfile = () => {
    if (name === "" || phone === "" || address === "" || city === "") {
      setError("Hãy điền đầy đủ các trường!");
    }

    let userUpdate = {
      name: name,
      phone: phone,
      address: address,
      city: city
    };

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

    axios
        .put(`${baseURL}/users/updateUser`, userUpdate, config)
        .then((res) => {
            if (res.status == 200 || res.status == 201) {
            Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Đã cập nhật tài khoản.",
                text2: "",
            });
            setTimeout(() => {
                props.navigation.navigate("User Profile");
            }, 1000);
            }
        })
        .catch((error) => {
            Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Opps, có lỗi xảy ra.",
            text2: "Xin vui lòng thử lại",
            });
        });
}

   

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <View style={{ height: 40}}></View>
      <FormContainer title={"Sửa thông tin"}>
      <View style={{ height: 10}}></View>
        <Input
          placeholder={"Tên"}
          value={name}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Số điện thoại"}
          value={phone}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Địa chỉ"}
          value={address}
          name={"address"}
          id={"address"}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Thành phố"}
          value={city}
          name={"city"}
          id={"city"}
          onChangeText={(text) => setCity(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <MyButton style={{
                    backgroundColor:'#36CBDA', 
                    borderRadius: 20,                  
                    }} large primary onPress={() => editProfile()}>
            <Text style={{ color: "white", fontSize: 16,fontWeight:'700' }}>Xác nhận</Text>
          </MyButton>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("User Profile")}
          >
            <Text style={{
                paddingTop: 20, 
                color: "blue",
                fontStyle: "italic",
            }}>Hủy và quay về trang Profile</Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default EditProfile;