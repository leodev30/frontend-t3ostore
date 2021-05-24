import React from 'react'
import {StyleSheet, Image, SafeAreaView, Text, View, H1, Dimensions} from 'react-native'

var width = Dimensions.get('window')
const Footer = () => {
    return (
        <View style={{alignItems: 'center'}}>
        <SafeAreaView style={styles.footer}>
            <View >
                <View style={{marginTop: 12}}>
                    <Text style={ styles.contact}>
                    Liên hệ: 0928230347
                    </Text> 
                    <Text style={ styles.contact}>
                    Email   : t3ostore@gmail.com
                    </Text>
                </View>
                <View>
                    <Text style={ styles.address}>
                    Địa chỉ: số 20, phường Mai Dịch, quận Cầu Giấy, Hà nội.
                    </Text> 
                </View>
            </View>
        </SafeAreaView>
        <View>
            <Text style={styles.title}>
                edit by t3o team https://github.com/T3O-UET
            </Text>
        </View>
        </View>
    )
}
const styles = StyleSheet.create({
    footer: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: '#03bafc',
    },
    contact: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center'
    },
    address: {  
        textAlign: 'center',
        fontSize: 14,
        paddingBottom: 20,
        color: 'white'
    },
    title: {
        alignContent: 'center',
        textAlign: 'center',
        paddingBottom:5,
        width: 360,
        fontWeight: 'bold',
        paddingTop: 5,
        fontSize: 8,
        color: 'black',
    }
})

export default Footer;