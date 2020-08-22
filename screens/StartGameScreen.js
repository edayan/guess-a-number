import React, {useState} from 'react';
import {Button, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Card from "../components/Card";
import colours from '../constants/colors'
import Input from "../components/Input";

const StartGameScreen = () => {

    const [enteredValue, setEnteredValue] = useState('');

    const inputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a new screen</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a number</Text>

                    <Input style={styles.input}
                           keyboardType="number-pad"
                           maxLength={2}
                           onChangeText={inputHandler}
                           value={enteredValue}/>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" onPress={() => {
                            }} color={colours.ACCENT}/>
                        </View>
                        <View style={styles.button}>
                            <Button title="confirm" onPress={() => {
                            }} color={colours.PRIMARY}/>
                        </View>
                    </View>

                </Card>
            </View>
        </TouchableWithoutFeedback>

    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: '80%',
        alignItems: 'center',
        shadowColor: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    button: {
        width: 80
    },
    input: {
        width: 50,
        textAlign: 'center'
    }
});
export default StartGameScreen; 