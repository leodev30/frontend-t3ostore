import React from 'react'
import {StyleSheet, Image, SafeAreaView, Text} from 'react-native'

const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            <Image
                style={styles.image}
                source={require("../assets/logo.png")}
                resizeMode="contain"
            />
            <Text style={styles.title}>
                T3O Store
            </Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        marginTop: 20,
        borderBottomColor: '#999999',
        borderBottomWidth: 0.25

    },
    image: {
        height: 48,
        width: 70,
        paddingLeft: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        paddingRight: 30,
        marginTop: 10
    }
})

export default Header;