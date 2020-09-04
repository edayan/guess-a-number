import React, { useState, useEffect } from 'react';
import {
    Alert, Button, Keyboard, StyleSheet, Text,
    TouchableWithoutFeedback, View, Dimensions, ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import Card from "../components/Card";
import Input from "../components/Input";
import MainButton from '../components/MainButton';
import NumberContainer from "../components/NumberContainer";
import colours from '../constants/colors';
import DefaultStyles from '../constants/default-styles';

const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        }
    });
    const inputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const choseNumber = parseInt(enteredValue, 10);
        if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
            Alert.alert('Error', 'number has to be between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }

        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(choseNumber);
        Keyboard.dismiss();
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = <Card style={styles.summaryContainer}>
            <Text>You selected:</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                START GAME
            </MainButton>
        </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a new game</Text>
                        <Card style={styles.inputContainer}>
                            <Text style={DefaultStyles.title}>Select a number</Text>

                            <Input style={styles.input}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={inputHandler}
                                value={enteredValue} />

                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="Reset"
                                        onPress={resetInputHandler}
                                        color={colours.ACCENT} />
                                </View>
                                <View style={{ width: buttonWidth }}>
                                    <Button title="confirm"
                                        onPress={confirmInputHandler}
                                        color={colours.PRIMARY} />
                                </View>
                            </View>

                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </ScrollView>


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
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        width: '80%',
        maxWidth: '90%',
        minWidth: 300,
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
        // width: Dimensions.get('window').width / 3
    },
    input: {
        width: 75,
        textAlign: 'center'
    },
    summaryContainer: {
        marginVertical: 10,
        alignItems: 'center'
    },
});
export default StartGameScreen; 