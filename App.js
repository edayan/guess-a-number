import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {

    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);

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

    let content = <StartGameScreen onStartGame={startNameHandler}/>
    if (userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
    } else if (guessRounds > 0) {
        content = <GameOverScreen numberOfRounds={guessRounds} userNumber={userNumber}
                                  onNewGame={newGameHandler}/>
    }

    return (
        <View style={styles.screen}>
            <Header title="Guess a number"/>
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
