import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Orders from "../Screens/Admin/Orders"
import Products from "../Screens/Admin/Products"
import ProductForm from "../Screens/Admin/ProductForm"
import Categories from "../Screens/Admin/Categories"
import EditProduct from "../Screens/Admin/EditProduct"
import EditCategory from "../Screens/Admin/editCategory"

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Products"
                component={Products}
                options={{
                    title: "Quản lý sản phẩm"
                }}
            />
            <Stack.Screen name="Categories" component={Categories}
                options={{
                    title: "Thương hiệu"
                }}
            />
            <Stack.Screen name="Orders" component={Orders} 
                options={{
                    title: "Quản lý đơn hàng"
                }}
            />
            <Stack.Screen name="ProductForm" component={ProductForm} 
                options={{
                    title: "Thêm sản phẩm"
                }}
            />
            <Stack.Screen name="Edit Product" component={EditProduct} 
                options={{
                    title: "Sửa sản phẩm"
                }}
            />
              <Stack.Screen name="Edit Category" component={EditCategory} 
                options={{
                    title: "Sửa thương hiệu"
                }}
            />
        </Stack.Navigator>
    )
}
export default function AdminNavigator() {
    return <MyStack />
}