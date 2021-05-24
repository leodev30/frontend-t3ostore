import React, { useEffect, useState } from "react"
import { 
    View, 
    Text,
    Alert,
    FlatList,
    Dimensions,
    TextInput,
    StyleSheet 
} from "react-native"
import MyButton from "../../Shared/MyButton"
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage"
import { add } from "react-native-reanimated";

var { width } = Dimensions.get("window")

const Item = (props) => {

    return (
        <View style={styles.item}>
            <Text style={{fontSize: 17, paddingLeft:5}}>{props.item.name}</Text>
            <MyButton
                style={{right: 90,position: 'absolute', width:70}}
                danger
                medium
                onPress={() => 
                    {
                        Alert.alert(
                        'Xác nhận xóa thương hiệu này',
                        '',
                        [
                          {text: 'NO', onPress: () => console.warn('Hủy xóa'), style: 'cancel'},
                          {text: 'YES', onPress: () => { 
                            props.delete(props.item.id)                             
                            }}
                        ]
                      );
                   }}

            >
                <Text style={{ color: "white", fontWeight: "bold"}}>Xóa</Text>
            </MyButton>
            <MyButton
                style={{width:70}}
                primary
                medium
                onPress={() => props.edit(props.item)}
            >
                <Text style={{ color: "white", fontWeight: "bold"}}>Sửa</Text>
            </MyButton>
        </View>
    )
}

const Categories = (props) => {

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res);
            })
            .catch((error) => console.log(error));

        axios
        .get(`${baseURL}/categories`)
        .then((res) => setCategories(res.data))
        .catch((error) => alert("Error to load categories"))

        return () => {
            setCategories();
            setToken();
        }
    }, [])

    const addCategory = () => {
        const category = {
            name: categoryName
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
        .post(`${baseURL}/categories`, category, config)
        .then((res) => setCategories([...categories, res.data]))
        .catch((error) => alert("Lỗi load Categories"));

        setCategoryName("");
    }



    const deleteCategory = (id) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
        .delete(`${baseURL}/categories/${id}`, config)
        .then((res) => {
            const newCategories = categories.filter((item) => item.id !== id);
            setCategories(newCategories);
        })
        .then(alert("Xóa thành công!"))
        .catch((error) => alert("Lỗi load categories"));
    }

    const editCategory = (item) => {
        props.navigation.navigate("Edit Category", {item: item})
    }

    return (
        <View style={{ position: "relative", height: "100%"}}>
            <View style={{ marginBottom: 60 }}>
                <FlatList 
                    data={categories}
                    renderItem={({ item, index }) => (
                        <Item item={item} index={index} delete={deleteCategory} edit={editCategory} />
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            <View style={styles.bottomBar}>
                <View>
                    <Text style={{paddingLeft:5}}>Thêm thương hiệu</Text>
                </View>
                <View style={{ width: width / 2.4 + 10}}>
                    <TextInput 
                        value={categoryName}
                        style={styles.input}
                        onChangeText={(text) => setCategoryName(text)}
                    />
                </View>
                <View>
                    <MyButton
                        style={{width:80}}
                        medium
                        primary
                        onPress={() => addCategory()}
                    >
                        <Text style={{ color: "white", fontWeight: "bold"}}>Thêm</Text>
                    </MyButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: "white",
        width: width,
        height: 60,
        padding: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5
    },
    item: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
        padding: 5,
        margin: 5,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 5
    }
})

export default Categories;