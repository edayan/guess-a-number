import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import Card from "../components/Card";
import MainButon from '../components/MainButton';
import NumberContainer from "../components/NumberContainer";
import { Ionicons } from '@expo/vector-icons'
import globalStyles from '../constants/default-styles'

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

const renderListItem = (value, numberOfRounds) => (
    <View key={value} style={styles.listItem}>
        <Text style={globalStyles.bodyText}>#{numberOfRounds}</Text>
        <Text style={globalStyles.bodyText}>{value}</Text>
    </View>)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 99, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && props.userChoice > currentGuess)
            || (direction === 'greater' && props.userChoice < currentGuess)) {
            Alert.alert('Don\'t lie', 'You know you choose wrong direction',
                [{ text: 'Sorry', style: 'cancel' }]);
            return
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else if (direction === 'greater') {
            currentLow.current = currentGuess + 1;
        }
        const nextGuess = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextGuess);
        setPastGuesses(curPastGuesses => [nextGuess, ...curPastGuesses]);
    }

    const { userChoice, onGameOver } = props;
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    return (
        <View style={styles.screen}>
            <Text>Opponents guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButon onPress={() => { nextGuessHandler('lower') }}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButon>
                <MainButon onPress={() => { nextGuessHandler('greater') }}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButon>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
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
        width: 400,
        maxWidth: '95%'
    },
    listContainer: {
        flex: 1, //ScrollView inside View need flex 1 to scroll in android.
        width: '80%'
    },
    list: {
        flexGrow: 1, // use whole available space, but keeps the other properties (Fixes not scrolling in Android).
        alignItems: 'center',
        justifyContent: 'flex-end'// list starts from end
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    }
})
export default GameScreen;