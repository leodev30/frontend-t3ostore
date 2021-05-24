import React, { useState, useCallback } from 'react';
import { 
        ScrollView, 
        View, 
        StyleSheet, 
        ActivityIndicator, 
        Dimensions 
        } from 'react-native';
import { Container, Icon, Text} from 'native-base';
import { SearchBar } from 'react-native-elements';

import baseURL from "../../assets/common/baseUrl";
import axios from 'axios';

import Footer from '../../Shared/Footer'
import ProductList from './ProductList';
import SearchProduct from './SearchProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';
import { useFocusEffect } from '@react-navigation/native'


var { height } = Dimensions.get("window")

const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true)
  
    useFocusEffect((
      useCallback(
        () => {
          setFocus(false);
          setActive(-1);
          
          // Products
          axios
            .get(`${baseURL}/products`)
            .then((res) => {
              setProducts(res.data);
              setProductsFiltered(res.data);
              setProductsCtg(res.data);
             
              setInitialState(res.data);
              setLoading(false)
            })
            .catch((error) => {
              console.log('Api call error')
            })
      
          // Categories
          axios
            .get(`${baseURL}/categories`)
            .then((res) => {
              setCategories(res.data)
            })
            .catch((error) => {
              console.log('Api call error')
            })
      
          return () => {
            setProducts([]);
            setProductsFiltered([]);
            setFocus();
            setCategories([]);
            setActive();
            setInitialState();
          };
        },
        [],
      )
    ))
      
     
    
  
    // Product Methods
    const searchProduct = (text) => {
      setProductsFiltered(
        products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
      );
    };

  const openList = () => {
    setFocus(true);
  }

  const onBlur = () => {
    setFocus(false);
  }

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true),
             
            ),
          ];
    }
  };


  return (
    <>
    {loading == false ? (
      <Container>
      <ScrollView>
      <View>
            <SearchBar
              showLoading={false}
              platform={Platform.OS}
              inputStyle={{backgroundColor: '#EEEEEE', marginLeft: 12, borderRadius: 25}}
              containerStyle={{backgroundColor: 'white'}}
              style={styles.searchBar}
              searchIcon={{ size: 30 }}
              placeholder="Tìm kiếm"
              onFocus={openList}
              onChangeText={(text) => searchProduct(text)}
            />
            {focus == true ? (
              <Icon onPress={onBlur} name="ios-close" />
            ) : null}
        {focus == true ? (
          <SearchProduct
            navigation={props.navigation}
            productsFiltered={productsFiltered} 
            />
        ) : (
            <View >
              <View>
                <Banner />
              </View>
              
              <View>
                <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                />
              </View>
              <View>
                <Text
                  style={{ paddingTop: 5, paddingBottom: 5, fontSize: 21, textAlign: 'center', fontWeight: '680', color: '#111111' }}
                >
                Sản phẩm T3O Store
                </Text>   
              </View>
                <View style={{ backgroundColor: '#eeeeee', height: 5}}></View>    
              {productsCtg.length > 0 ? (
              <View style={styles.listContainer}>
                  {productsCtg.map((item) => {
                      return(
                          <ProductList
                              navigation={props.navigation}
                              key={item.name}
                              item={item}
                          />
                      )
                  })}
                </View>
              ) : (
                <View style={styles.center, { height: height/2}}>
                  <Text>Không có sản phẩm nào</Text>
                </View>
              )}
              <View style={styles.listContainer}>
              </View>
            </View>
        )}
        <View style={{ backgroundColor: '#eeeeee', height: 30}}></View>    
        <Footer />
      </View>
      </ScrollView>
      </Container>
   ):(
     //Loading
      <Container style={[styles.center, { backgroundColor: "#f2f2f2"}]}>
        <ActivityIndicator size="large" color="#03bafc" />
      </Container> 
  )}
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  listContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
    
  },
  searchBar: {
    paddingLeft: 10,
  },
  center: {
    justifyContent: 'center',
    alignContent: 'center'
  }
})
export default ProductContainer;