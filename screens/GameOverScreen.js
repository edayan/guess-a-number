import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MainButton from '../components/MainButton';
import colors from '../constants/colors';
import globalStyles from '../constants/default-styles';

const GameOverScreen = props => {

    return (
        <View style={styles.screen}>
            <Text style={globalStyles.title}>The game is over</Text>
            <View style={styles.imageContainer}>
                {/* <Image source={require('../assets/success.png')} style={styles.image} resizeMode="cover" /> */}
                <Image
                    fadeDuration={400}
                    source={{ uri: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80' }}
                    style={styles.image}
                    resizeMode="cover" />

            </View>
            <View style={styles.descriptionContainer}>
                <Text style={{...globalStyles.bodyText, ...styles.descriptionText}}>
                    Your phone needed
                <Text style={{...styles.highlight, ...globalStyles.title}}> {props.numberOfRounds} </Text>
                 rounds to guess the number
                <Text style={{...styles.highlight, ...globalStyles.title}}> {props.userNumber}. </Text>
                </Text>
            </View>
            <MainButton onPress={props.onNewGame}>START AGAIN</MainButton>
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
    },
    descriptionContainer: {
        width: '80%',
        marginHorizontal: 20,
        marginVertical: 20,
        marginBottom: 10,
    },
    descriptionText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: colors.PRIMARY
    }

})

export default GameOverScreen;