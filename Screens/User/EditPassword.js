import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import FormContainer from "../Form/FormContainer";
import Input from "../Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MyButton from "../../Shared/MyButton";
import AsyncStorage from "@react-native-community/async-storage"

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

const EditPassword = (props) => {


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const [error, setError] = useState("");
    const [token, setToken] = useState();

  const editPassword = () => {
    if (oldPassword === "" || newPassword === "" || confirmPassword === "" ){
      setError("Hãy điền đầy đủ các trường!");
    }
    else if(newPassword !== confirmPassword){
        setError("Nhập lại mật khẩu trùng với mật khẩu mới!");
    }

    let passwordUpdate = {
      oldPassword: oldPassword,
      newPassword: confirmPassword
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
        .put(`${baseURL}/users/changePassword`, passwordUpdate, config)
        // .then(console.log(passwordUpdate))
        .then((res) => {
            if (res.status == 200 || res.status == 201) {
            Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Đã cập nhật password thành công!",
                text2: "",
            });
            setTimeout(() => {
                props.navigation.navigate("User Profile");
            }, 500);
            }
        })
        .catch((error) => {
            Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Opps, sai mật khẩu cũ rồi.",
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
        
      <FormContainer title={"Đổi mật khẩu"}>
        <View style={{ height: 15}}></View>
        <Input
            placeholder={"Nhập mật khẩu cũ"}
            name={"oldPassword"}
            id={"oldPassword"}
            secureTextEntry={true}
            onChangeText={(text) => setOldPassword(text)}
        />
        <Input
            placeholder={"Nhập mật khẩu mới"}
            name={"newPassword"}
            id={"newPassword"}
            secureTextEntry={true}
            onChangeText={(text) => setNewPassword(text)}
        />
        <Input
            placeholder={"Nhập lại mật khẩu mới"}
            name={"confirmPassword"}
            id={"confirmPassword"}
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <MyButton style={{
                    backgroundColor:'#36CBDA', 
                    borderRadius: 20, 
                    }} large primary onPress={() => editPassword()}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: '700' }}>Xác nhận</Text>
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
    marginTop: 15,
    alignItems: "center",
  },
});

export default EditPassword;