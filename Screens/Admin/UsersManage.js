import React, { useEffect, useState } from "react"
import { 
    View, 
    Text,
    FlatList,
    Dimensions,
    TextInput,
    Alert,
    StyleSheet 
} from "react-native"
import MyButton from "../../Shared/MyButton"
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage"
var { width } = Dimensions.get("window")

const User = (props) => {
    return (
        <View style={[styles.container, {
            backgroundColor: props.index % 2 == 0 ? "white" : "gainsboro"
        }]}>
            <Text style={{
                flexWrap: "wrap",
                margin: 6,
                fontSize: 16, paddingLeft:5,
                width: width / 3.3
            }} ellipsizeMode="tail">{props.user.name}</Text>
            <Text style={{
                flexWrap: "wrap",
                margin: 6,
                fontSize: 16, paddingLeft:5,
                width: width / 2.2
            }} ellipsizeMode="tail">{props.user.email}</Text>
            <MyButton
                style={{right: 5,position: 'absolute', width:50, height: 35}}
                danger
                medium
                onPress={() => { 
                    Alert.alert(
                        'Xác nhận xóa người này',
                        '',
                        [
                          {text: 'NO', onPress: () => console.warn('Hủy xóa'), style: 'cancel'},
                          {text: 'YES', onPress: () => { 
                              props.delete(props.user.id)                              
                            }}
                        ]
                      );
                   }}>
                <Text style={{ color: "white", fontSize: 14, fontWeight: 'bold'}}>Xóa</Text>
             </MyButton>
        </View>
    )
}

const UsersManage = (props) => {

    const [users, setUsers] = useState([]);
    const [token, setToken] = useState();


    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));
        
        const AuthStr = 'Bearer '.concat(token); 

        axios
        .get(`${baseURL}/users`, { headers: { Authorization: AuthStr } })
        .then((x) => {
            const data = x.data;
            const userMng = data.filter((user) => user.isAdmin === false );
            setUsers(userMng);
        })
        // .catch((error) => alert("Có lỗi xảy ra"))
        

        return () => {
            setUsers([]);
            setToken();
        }
    }, [])    
    const deleteUser = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
        .delete(`${baseURL}/users/${id}`, config)
        .then((res) => {
            const newUsers = users.filter((user) => user.id !== id);
            setUsers(newUsers);
        })
        .then(alert("Xóa thành công!"))
        .catch((error) => alert("Lỗi load users"));
    }

    return (
        
        <View style={{ position: "relative", height: "100%"}}>
            <View style={{ marginBottom: 60 }}>
                <Text style={{ fontSize: 20, 
                    fontWeight: 'bold', 
                    alignSelf: 'center',
                    margin: 10
                    }}>Quản lý tài khoản</Text>

                <View
                elevation={1}
                style={styles.listHeader}
                >
                <View style={styles.headerItem}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 10}}>Tên</Text>
                </View>
                <View style={styles.headerItem}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', paddingLeft: 10}}>Email</Text>
                </View>
                </View>
                <FlatList 
                    data={users}
                    renderItem={({ item, index }) => (
                        <User user={item} index={index} delete={deleteUser} />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        width: width
    },
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    item: {
        flexWrap: "wrap",
        margin: 6,
        fontSize: 18, paddingLeft:5,
        width: width / 3
    },
    headerItem: {
        margin: 3,
        width: width / 3
    },
})

export default UsersManage;