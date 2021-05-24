import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Dimensions, View, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper/src'

var { width } = Dimensions.get("window");
const Banner = () => {
    const [bannerData, setBannerData] = useState([])
    useEffect(() => {
        setBannerData([
            "https://i.cbc.ca/1.5717822.1599683406!/fileImage/httpImage/image.png_gen/derivatives/16x9_940/shoes-collage.png",
            "https://www.thespruce.com/thmb/4mqhYh6-NfH0Ha3sjbQAjJ4OFcI=/1500x844/smart/filters:no_upscale()/how-to-declutter-your-shoes-4126062-hero-6e3f6873752f4166bbe3a993a3a58c56.jpg",
            "https://i.pinimg.com/originals/8b/c5/71/8bc571e20209c3b662ce35e38d28cbb7.jpg"
        ])
        return () => {
            setBannerData([])
        }
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
            <View style={styles.swiper}>
                <Swiper
                    style={{ height: width / 2 }}
                    showButtons={false}
                    autoplay={true}
                    autoplayTimeout={5}
                >
                    {bannerData.map((item) => {
                        return (
                            <Image  
                                key={item}
                                style={styles.imageBanner}
                                resizeMode="contain"
                                source={{uri: item}}
                            />
                        );
                    })}
                </Swiper>
            </View>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width,
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
    },
    swiper: {
        width: width,
        alignItems: 'center',
    },
    imageBanner: {
        height: width / 2,
        width: width,
    }
})
export default Banner;