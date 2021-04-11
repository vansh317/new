import React from 'react-native';
import firebase from 'firebase';
import db from '../config.js';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';

export default class Recieverdetail extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            userId: firebase.auth().currentUser.email,
            userName: "",
            recieverId: this.props.navigation.getParam('details')["userid"],
            requestId: this.props.navigation.getParam('details')["requestid"],
            bookName: this.props.navigation.getParam('details')["bookname"],
            reason_for_requesting: this.props.navigation.getParam('details')["reason"],
            recieverName: '',
            recieverContact: '',
            recieverAddress: '',
            recieverRequestDocId: ''
        }
    }
    getreciverdetails = () => {
        db.collection('users').where('email_id', '==', this.state.recieverId).get()
            .then(snapShot => {
                snapShot.forEach(doc => {
                    this.setState({
                        recieverContact: doc.data().contact,
                        recieverAddress: doc.data().address,
                        recieverName: doc.data().first_name + doc.data().last_name,
                    })
                })
            })
        db.collection('requested_books').where('requestid', '==', this.state.requestId).get()
            .then(snapShot => {
                snapShot.forEach(doc => {
                    this.setstate({
                        recieverRequestDocId: doc.id
                    })
                })
            })
    }
    getuserdetails = () => {
        db.collection('users').where('email_id', '==', this.state.userId).get()
            .then(snapShot => {
                snapShot.forEach(doc => {
                    this.setState({
                        userName: doc.data().first_name

                    })
                })
            })
    }
    componentDidMount() {
        this.getreciverdetails()
        this.getuserdetails()
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.3 }}>
                    <Card title={"Book Information"} titleStyle={{ fontSize: 20 }} >
                        <Card > <Text style={{ fontWeight: 'bold' }}>Name : {this.state.bookName}
                        </Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Reason : {this.state.reason_for_requesting}
                            </Text>
                        </Card>
                    </Card>
                </View>
                <View style={{ flex: 0.3 }}>
                    <Card title={"Reciever Information"} titleStyle={{ fontSize: 20 }} >
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Name: {this.state.recieverName}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Contact: {this.state.recieverContact}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Address: {this.state.recieverAddress}</Text>
                        </Card>
                    </Card>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, },
    buttonContainer: { flex: 0.3, justifyContent: 'center', alignItems: 'center' },
    button: {
        width: 200, height: 50, justifyContent: 'center', alignItems: 'center',
        borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000", shadowOffset:
            { width: 0, height: 8 }, elevation: 16
    }
})
