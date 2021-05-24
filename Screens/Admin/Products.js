import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Header, Item, Input } from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"
import { useFocusEffect } from "@react-navigation/native"
import ListItem from "./ListItem"
import { SearchBar } from 'react-native-elements';

import axios from "axios"
import baseURL from "../../assets/common/baseUrl"
import AsyncStorage from "@react-native-community/async-storage"
import MyButton from "../../Shared/MyButton";

var { height, width } = Dimensions.get("window")

const ListHeader = () => {
    return(
        <View
            elevation={1}
            style={styles.listHeader}
        >
            <View style={styles.headerItem}></View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Mô tả</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Tên</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Thương hiệu</Text>
            </View>
            <View style={styles.headerItem}>
                <Text style={{ fontWeight: '600'}}>Giá</Text>
            </View>
        </View>
    )
}

const Products = (props) => {

    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback(
            () => {
                // Get Token
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((error) => console.log(error))

                axios
                    .get(`${baseURL}/products`)
                    .then((res) => {
                        setProductList(res.data);
                        setProductFilter(res.data);
                        setLoading(false);
                    })

                return () => {
                    setProductList();
                    setProductFilter();
                    setLoading(true);
                }
            },
            [],
        )
    )

    const searchProduct = (text) => {
        if (text == "") {
            setProductFilter(productList)
        }
        setProductFilter(
            productList.filter((i) => 
                i.name.toLowerCase().includes(text.toLowerCase())
            )
        )
    }

    const deleteProduct = (id) => {
        axios
            .delete(`${baseURL}/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const products = productFilter.filter((item) => item.id !== id)
                setProductFilter(products)
            })
            .then(alert("Xóa thành công!"))
            .catch((error) => console.log(error));
    }

  return (
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <MyButton style={{width: 105, backgroundColor: '#33CCFF'}}
               
                onPress={() => props.navigation.navigate("Orders")}
            >
                <Text style={styles.buttonText}>Quản lý đơn hàng</Text>
            </MyButton>
            <MyButton
                style={{width: 110, backgroundColor: '#33CCCC'}}
                onPress={() => props.navigation.navigate("ProductForm")}
            >
                <Text style={styles.buttonText}>Thêm sản phẩm</Text>
            </MyButton>
            <MyButton
                style={{width: 105, backgroundColor: '#33CC99'}}
                onPress={() => props.navigation.navigate("Categories")}
            >
                <Text style={styles.buttonText}>Thương hiệu</Text>
            </MyButton>
        </View>
      <View>
            <SearchBar
              showLoading={false}
              platform={Platform.OS}
              inputStyle={{backgroundColor: '#EEEEEE', marginLeft: 12, borderRadius: 25, paddingLeft: 20}}
              containerStyle={{backgroundColor: 'white'}}
              style={styles.searchBar}
              searchIcon={{ size: 30 }}
              placeholder="Tìm kiếm"
              onChangeText={(text) => searchProduct(text)}
            />
         
      </View>

      {loading ? (
          <View style={styles.spinner}> 
              <ActivityIndicator size="large" color="red" />
          </View>
      ) : (
          <FlatList 
            data={productFilter}
            ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => (
                <ListItem 
                    {...item}
                    navigation={props.navigation}
                    index={index}
                    delete={deleteProduct}
                />
            )}
            keyExtractor={(item) => item.id}
          />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 6
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin: 5, marginTop: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700'
    }
})

export default Products;