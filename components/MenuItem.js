import React, {Fragment} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {addOrder, fetchDishes} from "../store/action";
import {connect} from "react-redux";

const MenuItem = (props) => {
    console.log('MenuItem PROPS ++++++++++++++++++++++++++++++++++', props);
    return (
        <TouchableOpacity onPress={()=>props.addOrder(props.item)}>
            <View style={styles.item_div}>
                <Image source={{uri: props.item.url}} style={styles.img}
                       alt={props.item.name}/>
                <View style={styles.text_div}>
                    <Text style={styles.text}>{props.item.name}</Text>
                    <Text style={styles.text}>{props.item.cost} сом</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    img: {
        height: 170,
        width: 170,
    },
    item_div: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 20,
    },
    text_div: {
        padding: 20,
    },
    text: {
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 20,
        maxWidth: 150,
    },
});

const mapDispatchToProps = dispatch => {
    console.log('fetchDishes');
    return {
        addOrder: (order) => dispatch(addOrder(order)),
    }
};

export default connect(null, mapDispatchToProps)(MenuItem);