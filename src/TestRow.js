import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        height: 50,
        width: 150,
        marginLeft: 12,
        fontSize: 16,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
});

const TestRow = (props) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => Alert.alert("Deneme", props.message)}>
            <Image source={{ uri: "https://cdn0.iconfinder.com/data/icons/logos-brands/24/logo_brand_brands_logos_ubuntu-128.png"}} style={styles.photo}/>
        </TouchableOpacity>
        <Text style={styles.text}>
            {props.name}
        </Text>
    </View>
);

export default TestRow;