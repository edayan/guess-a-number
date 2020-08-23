import React, {useState} from 'react';
import {Alert, Button, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Card from "../components/Card";
import colours from '../constants/colors'
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

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
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
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
            <Button title="START GAME" onPress={() =>props.onStartGame(selectedNumber)}/>
        </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a new game</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a number</Text>

                    <Input style={styles.input}
                           keyboardType="number-pad"
                           maxLength={2}
                           onChangeText={inputHandler}
                           value={enteredValue}/>

                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset"
                                    onPress={resetInputHandler}
                                    color={colours.ACCENT}/>
                        </View>
                        <View style={styles.button}>
                            <Button title="confirm"
                                    onPress={confirmInputHandler}
                                    color={colours.PRIMARY}/>
                        </View>
                    </View>

                </Card>
                {confirmedOutput}
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
    },
    summaryContainer: {
        marginVertical: 10,
        alignItems: 'center'
    }
});
export default StartGameScreen; 