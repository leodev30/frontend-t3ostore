import React from 'react'
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import {
    Text,
    Left,
    Right,
    ListItem,
    Thumbnail,
    Body
} from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../../../Redux/Actions/cartActions'
import axios from "axios"
import baseURL from "../../../assets/common/baseUrl"
import Toast from "react-native-toast-message"


var { width, height } = Dimensions.get('window')

const Confirm = (props) => {

    const finalOrder = props.route.params;

    const confirmOrder = () => {

        const order = finalOrder.order.order;
        
        axios
            .post(`${baseURL}/orders/`, order )
            .then(console.log(order))
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                        Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: "Thêm đơn hàng thành công",
                            text2: "",
                        })
                        setTimeout(() => {
                            props.clearCart();
                            props.navigation.navigate("Cart")
                        }, 500)
                    }
                })
            .catch((error) => {
                    Toast.show({
                        topOffset: 60,
                        type: "error",
                        text1: "Opps, có lỗi xảy ra,",
                        text2: "Vui lòng thử lại.",
                    })
                })         
    }


    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 30, color: '#CC3300', fontWeight: 'bold', paddingTop: 10, paddingBottom: 20}}>
                    Xác nhận đơn hàng
                </Text>
                {props.route.params ? 
                <View style={{  backgroundColor: '#F0EEEE', borderRadius: 18}}>
                    <Text style={styles.title}>Giao hàng đến:</Text>
                    <View style={{ padding: 8, fontSize: 18 }}>
                        <Text>Địa chỉ nhận: {finalOrder.order.order.shippingAddress1}</Text>
                        <Text>Địa chỉ dự phòng: {finalOrder.order.order.shippingAddress2}</Text>
                        <Text>Tỉnh/Thành phố: {finalOrder.order.order.city}</Text>
                        <Text>Số điện thoại: {finalOrder.order.order.phone}</Text>
                    </View>
                    <Text style={styles.title}>Sản phẩm:</Text> 
                    {finalOrder.order.order.products.map((x) => {
                        return (
                            <ListItem
                                style={styles.listItem}
                                key={x.product.name}
                                avatar
                            >
                                <Left>
                                    <Thumbnail style={{ height: 80, width: 120, }} source={{ uri: x.product.image}}/>
                                </Left>
                                <Body style={styles.body}>
                                    <Left>
                                        <Text>{x.product.name}</Text>
                                    </Left>
                                    <Right>
                                        <Text style={{color: 'red', fontWeight: 'bold'}}>$ {x.product.price}</Text>
                                    </Right>
                                </Body>
                            </ListItem>
                        )
                    })} 
                </View>    
           : null }
           <View style={{ alignItems: 'center', margin: 20 }}>
                <Button title={'Xác nhận đơn hàng'} onPress={() => confirmOrder()}/>
           </View>
            </View>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        clearCart: () => dispatch(actions.clearCart())
    }
}

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: 'center',
        backgroundColor: 'white',
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        
    },
    title: {
        alignSelf: 'center', 
        margin: 8, 
        fontSize: 16,
        fontWeight: 'bold' 
    },
    listItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 1.2,
        paddingBottom: 5
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default connect(null, mapDispatchToProps)(Confirm);