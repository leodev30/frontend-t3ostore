import React, { useEffect, useState, useContext} from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';
import FormContainer from '../../Form/FormContainer'
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import AuthGlobal from "../../../Context/store/AuthGlobal"
import Toast from "react-native-toast-message";
import Error from "../../../Shared/Error";
import AsyncStorage from "@react-native-community/async-storage"
import baseURL from "../../../assets/common/baseUrl"
import axios from "axios";


const Checkout = (props) => {
    const context = useContext(AuthGlobal)
    const [ orderItems, setOrderItems ] = useState();
    const [ address, setAddress ] = useState();
    const [ address2, setAddress2 ] = useState();
    const [ city, setCity ] = useState();
    const [ phone, setPhone ] = useState();
    const [status, setStatus] = useState();
    const [error, setError] = useState("");
  
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
                        (user) => {
                            setPhone(user.data.phone),
                            setAddress(user.data.address),
                            setCity(user.data.city)
                        }
                    )
                    .then(res => {
                        console.log("Good request ");
                    })
                    .catch((error) => {
                        console.log('error ' + error);
                    });
            })
            .catch((error) => console.log(error))

        setOrderItems(props.cartItems)

        return () => {
            setPhone();
            setAddress();
            setCity();
            setOrderItems();
            setStatus("Đang chờ xử lý");
        }
    },  [context.stateUser.isAuthenticated])
   
    const checkOut = () => {

        if (city === undefined || phone === undefined || address === undefined || address2 === undefined) {    
            setError("Hãy điền đầy đủ các trường!");
        } else {
            let order = {
                city,
                products: orderItems,
                phone,
                shippingAddress1: address,
                shippingAddress2: address2,
                user: context.stateUser.user.id,
                status: status,
            }
        
            props.navigation.navigate("Thanh toán", {order: order })  
        }
              
    }

    return (
        
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >   
            <View style={{ height: 20}}></View>
            <FormContainer title={"Địa chỉ giao hàng"}>
            <View style={{ height: 10}}></View>
                <Input
                    style={{fontSize: 16}}
                    placeholder={"Số điện thoại"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />
                   <Input
                    style={{fontSize: 16}}
                    placeholder={"Địa chỉ nhận"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />
                   <Input
                    style={{fontSize: 16}}
                    placeholder={"Địa chỉ dự phòng"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />
                   <Input
                    style={{fontSize: 16}}
                    placeholder={"Tỉnh/Thành phố"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />
                <View style={styles.buttonGroup}>
                {error ? <Error message={error} /> : null}
                </View>
                <View style={{ width: '80%', alignItems: "center", marginTop:20 }}>
                    <Button title="Xác nhận" onPress={() => checkOut()}/>
                </View>
            </FormContainer>
        </KeyboardAwareScrollView>
    )
}


const mapStateToProps = (state) => {
    const { cartItems } = state;
    return {
        cartItems: cartItems,
    }
}

const styles = StyleSheet.create({
    buttonGroup: {
      width: "80%",
      margin: 10,
      alignItems: "center",
    },
  });
export default connect(mapStateToProps)(Checkout)