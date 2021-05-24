import React from 'react'
import {TextInput, StyleSheet} from 'react-native'

const Input = (props) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            name={props.name}
            id={props.id}
            value={props.value}
            autoCorrect={props.autoCorrect}
            onChangeText={props.onChangeText}
            onFocus={props.onFocus}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
        ></TextInput>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '90%',
        height: 50,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 20,
        padding: 10,
        borderWidth: 2,
        borderColor: '#D6D5D5',
        fontSize: 17
    }
})

export default Input;