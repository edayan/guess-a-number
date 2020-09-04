import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import MainButton from '../components/MainButton';
import colors from '../constants/colors';
import globalStyles from '../constants/default-styles';

const GameOverScreen = props => {

    return (
        <ScrollView>
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
                    <Text style={{ ...globalStyles.bodyText, ...styles.descriptionText }}>
                        Your phone needed
                <Text style={{ ...styles.highlight, ...globalStyles.title }}> {props.numberOfRounds} </Text>
                 rounds to guess the number
                <Text style={{ ...styles.highlight, ...globalStyles.title }}> {props.userNumber}. </Text>
                    </Text>
                </View>
                <MainButton onPress={props.onNewGame}>START AGAIN</MainButton>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: (Dimensions.get('window').width * 0.7) / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    descriptionContainer: {
        width: '80%',
        marginHorizontal: 20,
        marginVertical: Dimensions.get('window').height / 60,
        marginBottom: Dimensions.get('window').height < 400 ? 16 : 20,
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