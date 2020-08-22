import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import Card from "../components/Card";
import colours from '../constants/colors'
const StartGameScreen = () => {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Start a new screen</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a number</Text>
                <TextInput/>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Reset" onPress={() => {}} color={colours.ACCENT}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="confirm" onPress={() => {}} color={colours.PRIMARY}/>
                    </View>
                </View>
            </Card>
        </View>
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
    }
});
export default StartGameScreen; 