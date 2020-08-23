import React, {useEffect, useRef, useState} from 'react'
import {Alert, Button, StyleSheet, Text, View} from 'react-native'
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 99, props.userChoice))
    const [rounds, setRounds] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && props.userChoice > currentGuess)
            || (direction === 'greater' && props.userChoice < currentGuess)) {
            Alert.alert('Don\'t lie', 'You know you choose wrong direction',
                [{text: 'Sorry', style: 'cancel'}]);
            return
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else if (direction === 'greater') {
            currentLow.current = currentGuess;
        }
        const nextGuess = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextGuess);
        setRounds(currentRounds => currentRounds + 1);
    }

    const {userChoice, onGameOver} = props;
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);

    return (
        <View style={styles.screen}>
            <Text>Opponents guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={() => {
                    nextGuessHandler('lower')
                }}/>
                <Button title="GREATER" onPress={() => {
                    nextGuessHandler('greater')
                }}/>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
})
export default GameScreen;