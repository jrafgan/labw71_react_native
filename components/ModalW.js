import React from 'react';
import {StyleSheet, Text, View, Image, Modal, TouchableHighlight, TextInput, Button} from 'react-native';
import {deleteOrder, fetchDishes, initialState, saveOrder, toggleModal} from "../store/action";
import {connect} from "react-redux";

class ModalW extends React.Component {

    state = {
        name: '',
        address: '',
        phone: '',
    };

    changeName = (text) => {
        console.log('e current Traget ttttttttttttttttttt', text);
        this.setState({name: text});
    };

    changeAddress = (text) => {
        console.log('e current Traget ttttttttttttttttttt', text);
        this.setState({address: text});
    };

    changePhone = (text) => {
        console.log('e current Traget ttttttttttttttttttt', text);
        this.setState({phone: text});
    };

    saveUser = () => {
        this.props.saveOrder(this.state)
    };

    render() {
        return (
            <View style={styles.container}>

                <Modal animationType={"slide"} transparent={false}
                       visible={this.props.modalVisible}
                       onRequestClose={() => {
                           this.saveUser();
                       }}>

                    <View style={styles.order_div}>
                        <View><Text style={styles.text}>Ваш заказ :</Text></View>

                        {this.props.orderList.length !== 0 ? this.props.orderList.map((item, ndx) => (
                            <View style={styles.order_info} key={ndx}>
                                <Text style={styles.text}>{item.name} </Text>
                                <Text style={styles.text}> x {item.qty} шт </Text>
                                <Text style={styles.text}> {item.cost * item.qty} сом  </Text>
                                <TouchableHighlight onPress={() => {
                                    this.props.toggleModal()
                                }}>
                                    <Text style={styles.text} onPress={(ndx) => {
                                        this.props.deleteOrder(ndx);
                                    }}>Удалить</Text>
                                </TouchableHighlight>

                            </View>)) : null}
                        <View><Text style={styles.text}>Доставка : 150 сом</Text></View>
                        <View><Text style={styles.text}>Итого : {this.props.total} сом</Text></View>
                    </View>

                    <TextInput style={styles.input}
                               placeholder="Ваше имя"
                               name="name"
                               value={this.state.name}
                               onChangeText={text => this.changeName(text)}/>

                    <TextInput style={styles.input}
                               placeholder="Ваш адрес"
                               name="address"
                               value={this.state.address}
                               onChangeText={text => this.changeAddress(text)}/>

                    <TextInput style={styles.input}
                               placeholder="Ваш телефон"
                               name="phone"
                               value={this.state.phone}
                               onChangeText={text => this.changePhone(text)}/>


                    <View style={styles.modal}>

                        <TouchableHighlight onPress={() => {
                            this.saveUser();
                        }}>

                            <Text style={styles.text}>Оплатить</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => {
                            this.props.toggleModal()
                        }}>
                            <Text style={styles.text}>Отменить</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        );
    }


}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#dfdef7',
        padding: 100,
    },
    text: {
        color: '#000',
        marginTop: 10,
        fontSize: 15,
    },
    input: {
        marginTop: 25,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        marginHorizontal: 10,
    },
    order_info: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    order_div: {
        padding: 10,
    },
    delete_btn: {
        marginLeft: 20,
        height: 10,
    }
});

const mapStateToProps = state => {

    return {
        modalVisible: state.modalVisible,
        state: state,
        orderList: state.orderList,
        total: state.total,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleModal: () => dispatch(toggleModal()),
        saveOrder: (userData) => {
            dispatch(saveOrder(userData));
            dispatch(toggleModal());
            dispatch(initialState());
        },
        deleteOrder: (ndx) => dispatch(deleteOrder(ndx))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalW);