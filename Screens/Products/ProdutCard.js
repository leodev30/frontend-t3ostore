import React, {useContext} from 'react'
import {
        StyleSheet,
        View,
        Dimensions,
        Image,
        Text,
        Button,
        TouchableOpacity
} from 'react-native'
import Toast from 'react-native-toast-message';
import Icon from "react-native-vector-icons/FontAwesome";
import AuthGlobal from '../../Context/store/AuthGlobal'
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
    const context = useContext(AuthGlobal);
    const { name, price, image, countInStock } = props;
    return (
        <View style={styles.container}>
            <Image 
            style={styles.image}
            resizeMode="contain"
            source={{uri: image ? image : 'https://3wga6448744j404mpt11pbx4-wpengine.netdna-ssl.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif'}}
            />
            <View style={styles.card}/>
            <Text style={styles.title}>
                {name.length > 21 ? name.substring(0, 21 - 3)
                    + '...' : name    
            }
            </Text>
            <View style={styles.bottomCard}>
                <Text style={styles.price}>${price}</Text>
                {context.stateUser.user.isAdmin == true ? null : (
                        <View style={styles.button}>
                        <TouchableOpacity onPress={() => {
                             props.addItemToCart(props),
                             Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: `${name} đã được thêm vào giỏ hàng`,
                                text2: "Đi đến giỏ hàng để xác nhận đơn hàng ngay nào!"
                            })
                         }}>
                            <Icon name="cart-plus" style={styles.cart} size={26}/>
                        </TouchableOpacity>
                    </View>)}       
                </View>           
        </View>
        
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => 
            dispatch(actions.addToCart({quantity: 1, product}))
    }
}

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 4,
        height: width / 1.7,
        padding: 2,
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 3,
        marginLeft: 2,
        elevation: 2,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: width / 2 - 20 - 5,
        paddingTop: 165,
        height: 20,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -0
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 55,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 17,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FF0033',
        position: 'absolute',
        right: 10,top: 20
    },
    button: {
       // width: 60,
        //backgroundColor: '#3399FF',
        //borderRadius: 4,
        position: 'absolute',
        top: 17, left: 27,
    },
    cart: {
        color: '#00CCCC',
    },
})
export default connect(null, mapDispatchToProps)(ProductCard);