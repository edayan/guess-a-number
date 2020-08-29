import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native'
import globalStyles from '../constants/default-styles'

const GameOverScreen = props => {

    return (
        <View style={styles.screen}>
            <Text style={globalStyles.title}>The game is over</Text>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/success.png')} style={styles.image} resizeMode="cover" />
            </View>

            <Text style={globalStyles.bodyText}>Number of rounds: {props.numberOfRounds}</Text>
            <Text style={globalStyles.bodyText}>Number was: {props.userNumber}</Text>
            <Button title="START AGAIN" onPress={props.onNewGame} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',
    }
   
})

export default GameOverScreen;