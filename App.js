import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Header from './components/Header';
import GameOverScreen from "./screens/GameOverScreen";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from './screens/StartGameScreen';


const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
}

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return <AppLoading startAsync={fetchFonts}
            onFinish={() => setDataLoaded(true)}
            onError={err => console.log(err)} />
    }

    const startNameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
    }

    const gameOverHandler = numberOfRounds => {
        setGuessRounds(numberOfRounds);
    }

    const newGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
        console.log('userNumber', userNumber, 'guessRounds', guessRounds);
    }

    let content = <StartGameScreen onStartGame={startNameHandler} />

    if (userNumber && guessRounds <= 0) {
        content = <GameScreen
            userChoice={userNumber}
            onGameOver={gameOverHandler} />
    } else if (guessRounds > 0) {
        content = <GameOverScreen
            numberOfRounds={guessRounds} userNumber={userNumber}
            onNewGame={newGameHandler} />
    }

    return (
        <SafeAreaView style={styles.screen}>
                <Header title="Guess a number" />
                {content}
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
