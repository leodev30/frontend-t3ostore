import React, {useState, useEffect, useContext } from 'react'
import { Image, View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Left, Right, Container, H1} from 'native-base';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import Toast from 'react-native-toast-message';
import { Toolbar, ToolbarBackAction, ToolbarContent, ToolbarAction } from 'react-native-paper';
import TrafficLight from '../../Shared/TrafficLight';
import AuthGlobal from '../../Context/store/AuthGlobal'

const SingleProduct = (props) => {
    const context = useContext(AuthGlobal);

    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);
    const [availabilityText, setAvailabilityText] = useState("");

    useEffect(() => {
        if (props.route.params.item.countInStock == 0) {
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText("Hết hàng")
        } else if (props.route.params.item.countInStock <= 5) {
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText("Số lượng giới hạn")
        } else {
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText("Hàng có sẵn")
        }

        return () => {
            setAvailability(null);
            setAvailabilityText("");
        }
    }, [])
    return (
        <Container style={styles.containter}>
            <ScrollView style={{ marginBottom: 80, padding: 5}}
            >
                <View>
                    <Text style={styles.tasbar}>
                        Chi tiết sản phẩm
                    </Text>
                    <Image 
                        source={{
                            uri: item.image ? item.image 
                            : 'https://3wga6448744j404mpt11pbx4-wpengine.netdna-ssl.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif'
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                        <H1 style={styles.contentHeader}>{item.name}</H1>
                        <Text style={styles.contentText}>{item.brand}</Text>
                </View>
                <View style={styles.availabilityContainer}>
                    <View style={styles.availability}>
                        <Text style={{ marginRight: 5, fontSize: 16 }}>
                            Tình trạng: {availabilityText}
                        </Text>
                        {availability}
                    </View>
                    <Text style={{ marginRight: 5, fontSize: 16 }}>Nhãn hiệu: {item.description}</Text>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Left>
                    <Text style={styles.price}>${item.price}</Text>
                </Left>
                
                {context.stateUser.user.isAdmin == true ? null : (
                 <Right style={{ paddingRight: 20}}>
                 <Button 
                         type="clear"
                         icon={
                             <Icon
                               name="cart-plus"
                               size={35}
                               color="#00CCCC"
                             />
                         }
                         onPress={() => {
                             props.addItemToCart(item),
                             Toast.show({
                             topOffset: 60,
                             type: "success",
                             text1: `${item.name} đã được thêm vào giỏ hàng`,
                             text2: "Tới ngay giỏ hàng của bạn để xác nhận đơn hàng nào!"
                         })
                     }}
                 />
                 
             </Right>)}
            </View>
        </Container>
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
        position: 'relative',
        height: '100%'
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    tasbar: {
        fontSize: 26,
        fontFamily: 'sans-serif',
        textAlign: 'center'
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: "bold",
        marginBottom: 10
    },
    contentText: {
        fontSize: 18,
        marginBottom: 10,
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 25,
        margin: 20,
        color: 'red'
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})


export default connect(null, mapDispatchToProps)(SingleProduct);