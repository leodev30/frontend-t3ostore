import React from 'react'
import {ScrollView, Dimensions, StyleSheet, Text } from 'react-native'

var {width} = Dimensions.get('window');
const FormContainer = (props) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            {props.children}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        marginBottom: 400,
        width: width / 1.1 ,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    title: {
        fontSize: 40,
    }
})
export default FormContainer;