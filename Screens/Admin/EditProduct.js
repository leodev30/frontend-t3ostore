import React, { useState, useEffect } from "react"
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform
} from "react-native"
import { Item, Picker } from "native-base"
import FormContainer from "../Form/FormContainer"
import { Input } from 'react-native-elements'
import MyButton from "../../Shared/MyButton"
import Error from "../../Shared/Error"
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-community/async-storage"
import baseURL from "../../assets/common/baseUrl"
import axios from "axios"

const EditProduct = (props) => {

    const [pickerValue, setPickerValue] = useState();
    const [brand, setBrand] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [id, setId] = useState();
    const [categories, setCategories] = useState([]);
    const [err, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [isFeatured, setIsFeature] = useState(false);
    const [token, setToken] = useState();


    useEffect(() => {
        // console.log(props)

        setId(props.route.params.item.id);
        setBrand(props.route.params.item.brand);
        setName(props.route.params.item.name);
        setPrice(props.route.params.item.price.toString());
        setDescription(props.route.params.item.description);
        setCategory(props.route.params.item.category.id);
        setCountInStock(props.route.params.item.countInStock.toString());

       
        // Get categories
        axios
        .get(`${baseURL}/categories`)
        .then((res) => {
            // console.log(res),
            setCategories(res.data)})
       
        //Get Token
        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))

        return () => {
            setCategories([]);
            setId();
            setBrand();
            setName();
            setPrice();
            setDescription();
            setCountInStock();
            setCategory();
            setToken();
        }
        }, []);
        

        const editProduct = () => {

            if (
                name == "" ||
                brand == "" ||
                price == "" ||
                description == "" ||
                category == "" ||
                countInStock == ""
            ) {
                setError("Vui lòng điền đẩy đủ các mục!")
            }

          


            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const Product = {
                id: id,
                name: name,
                brand: brand,
                price: price,
                description: description,
                category: category,
                countInStock: countInStock,
                isFeatured: isFeatured
            }

            axios
            .put(`${baseURL}/products/${id}`, Product, config)
            .then(console.log(`${baseURL}/products/${id}`))
            .then(console.log(Product))
            .then(console.log(config))
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Đã sửa sản phẩm.",
                    text2: "",
                });
                setTimeout(() => {
                    props.navigation.navigate("Products");
                }, 500);
                }
            })
            .catch((error) => {
                Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Opps, có lỗi xảy ra.",
                text2: "Xin vui lòng thử lại",
                });
            });   

        }


    return (  
            <FormContainer>
                <View style={styles.label}>
                    <Text style={styles.title}>Nhãn hiệu</Text>
                </View>
                <Input 
                    style={{fontSize: 17, paddingLeft: 5}}
                    placeholder="Brand"
                    name="brand"
                    id="brand"
                    value={brand}
                    onChangeText={(text) => setBrand(text)}
                />
                <View style={styles.label}>
                    <Text style={styles.title}>Tên giày</Text>
                </View>
                <Input 
                    style={{fontSize: 17, paddingLeft: 5}}
                    placeholder="Name"
                    name="name"
                    id="name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                    <View style={styles.label}>
                    <Text style={styles.title}>Giá</Text>
                </View>
                <Input 
                    style={{fontSize: 17, paddingLeft: 5}}
                    placeholder="Price"
                    name="price"
                    id="price"
                    value={price}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPrice(text)}
                />
                    <View style={styles.label}>
                    <Text style={styles.title}>Số lượng</Text>
                </View>
                <Input 
                    style={{fontSize: 17, paddingLeft: 5}}
                    placeholder="Stock"
                    name="stock"
                    id="stock"
                    value={countInStock}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setCountInStock(text)}
                />
                    <View style={styles.label}>
                    <Text style={styles.title}>Mô tả sản phẩm</Text>
                </View>
                <Input 
                    style={{fontSize: 17, paddingLeft: 5}}
                    placeholder="Description"
                    name="description"
                    id="description"
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                />
                <View style={styles.label}>
                    <Text style={styles.title}>Lựa chọn danh mục</Text>
                </View>
                <View  style={{marginTop: 10, paddingLeft: 10, paddingRight: 20 , borderWidth: 2, borderColor: '#D6D5D5', borderRadius: 20 }}>
                <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                            style={{width: 250, height: 50, color: 'black'}}
                            placeholder="Select your Category"
                            selectedValue={pickerValue}
                            onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
                        >
                            {categories.map((c) => {
                                // console.log(c.name)
                                return <Picker.Item key={c.id} label={c.name} value={c.id} />
                            })}
                        </Picker>
                </Item>
                </View>
                
                {err ? <Error message={err} /> : null}
                <View style={styles.buttonContainer}>
                    <MyButton
                        large
                        primary 
                        style={{backgroundColor: '#36CBDA', 
                            borderRadius: 20}} 
                        onPress={() => editProduct()}               
                    >
                        <Text style={styles.buttonText}>Xác nhận</Text>
                    </MyButton>
                </View>
            </FormContainer>
    )
}

const styles = StyleSheet.create({
    label: {
        width: "94%",
        marginTop: 5,
    },
    buttonContainer: {
        width: "80%",
        marginBottom: 80,
        marginTop: 20,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontWeight: '700',
        fontSize: 16
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold'
    }
})

export default EditProduct;