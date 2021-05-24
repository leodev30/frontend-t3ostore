import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../Form/FormContainer';
import MyButton from "../../Shared/MyButton";
import Error from '../../Shared/Error';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

//Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Auth.actions";

const formSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
})

const Login = (props) => {
    const context = useContext(AuthGlobal);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")

    useEffect(() => {
        if (context.stateUser.isAuthenticated === true) {
            props.navigation.navigate("User Menu");
        }
    }, [context.stateUser.isAuthenticated]);

    const handleSubmit = () => {
        const user = {
            email,
            password
        }
        if (email === "" || password === "") {
            setError("Email và Password là bắt buộc")
        } else {
            // console.log('success')
            loginUser(user, context.dispatch);
        }
    }

    return (

        <View style={{ paddingTop: 90}}>
            <FormContainer title={"Đăng nhập"} >
                <View style={{ paddingTop: 10}}></View>
                <Input
                    leftIcon={
                      <Icon
                        name='envelope'
                        size={24}
                        color='#aaaaaa'
                        style={{paddingRight: 10, paddingLeft: 5}}
                      />
                    }
                    style={{fontSize: 15}}
                    placeholder={"email@address.com"}
                    name={"email"}
                    id={"email"}
                    value={email}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <Input
                    leftIcon={
                        <Icon
                          name='lock'
                          size={24}
                          color='#aaaaaa'
                          style={{paddingRight: 10, paddingLeft: 5}}
                        />
                      }
                    style={{fontSize: 15, width: '80%',}}
                    placeholder={"Mật khẩu"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
               
                <View style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                    <MyButton style={{
                        backgroundColor: '#336699',
                        borderRadius: 20,
                        marginTop: 0
                    }} large primary onPress={() => handleSubmit()}>
                        <Text style={{ color: "white", fontWeight:'700', fontSize: 16 }}>Đăng nhập</Text>
                    </MyButton>
                </View>
                <View style={styles.buttonGroup}>
                    <Text style={styles.middleText}>Bạn chưa có tài khoản?</Text>
                    <MyButton
                        style={{ borderRadius: 20, backgroundColor:'#00aff0' }}
                        large
                        secondary
                        onPress={() => props.navigation.navigate("Register")}>
                        <Text style={{ color: "white", fontWeight:'700', fontSize: 16 }}>Đăng ký</Text>
                    </MyButton>
                </View>
            </FormContainer>
        </View>


    )
}

const styles = StyleSheet.create({
    buttonGroup: {
        paddingTop: 25,
        width: "80%",
        alignItems: "center",
    },
    middleText: {
        marginBottom: 10,
        alignSelf: "center",
        fontStyle: 'italic',
        color: 'red'
    },
    
})
export default Login;