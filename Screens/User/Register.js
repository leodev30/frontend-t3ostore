import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import FormContainer from "../Form/FormContainer";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MyButton from "../../Shared/MyButton";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "" || city === "" || address === "") {
      setError("Hãy điền đầy đủ các trường!");
    }

    let user = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address,
      city: city,
      isAdmin: false,
    };
    axios
      .post(`${baseURL}/users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Đăng ký thành công!",
            text2: "Hãy đăng nhập tài khoản của bạn",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Opp, Đã có lỗi xảy ra!",
          text2: "Vui lòng thử lại.",
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
        <View style={{ paddingTop: 15}}></View>
      <FormContainer title={"Đăng ký"}>
        <Input
          style={{fontSize: 15, paddingLeft: 10}}
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          style={{fontSize: 15, paddingLeft: 10}}  
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text)}
        />
        <Input
            style={{fontSize: 15, paddingLeft: 10}}
          placeholder={"Phone Number"}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
            style={{fontSize: 15, paddingLeft: 10}}
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
            style={{fontSize: 15, paddingLeft: 10}}
          placeholder={"Address"}
          name={"address"}
          id={"address"}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
            style={{fontSize: 15, paddingLeft: 10}}
          placeholder={"City"}
          name={"city"}
          id={"city"}
          onChangeText={(text) => setCity(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <MyButton style={{
                    backgroundColor:'#1ab7ea', 
                    borderRadius: 20, 
                    marginTop: -15
                    }} large primary onPress={() => register()}>
            <Text style={{ color: "white", fontWeight:'700', fontSize: 16 }}>Đăng ký</Text>
          </MyButton>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{
                paddingTop: 5, 
                color: "#3300FF",
                fontStyle: "italic",
            }}>Trở về trang Đăng nhập</Text>
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

export default Register;