import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View, ScrollView, FlatList, Dimensions } from 'react-native';
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

// for scroll view
// const renderListItem = (value, numberOfRounds) => (
//     <View key={value} style={styles.listItem}>
//         <Text style={globalStyles.bodyText}>#{numberOfRounds}</Text>
//         <Text style={globalStyles.bodyText}>{value}</Text>
//     </View>)

//for flatlist
const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <Text style={globalStyles.bodyText}>#{listLength - itemData.index}</Text>
        <Text style={globalStyles.bodyText}>{itemData.item}</Text>
    </View>)


const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 99, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [availableDeviceHeight, setAvailableDeviceHeight]  = useState(Dimensions.get('window').height);

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


    useEffect(() =>  {
        const updateLayout = () => {
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change', updateLayout);
        return() => Dimensions.removeEventListener('change', updateLayout);

    });



    if (availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text>Opponents guess</Text>
                <View style={styles.controls}>
                    <MainButon onPress={() => { nextGuessHandler('greater') }}>
                        <Ionicons name="md-add" size={24} color="white" />
                    </MainButon>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButon onPress={() => { nextGuessHandler('lower') }}>
                        <Ionicons name="md-remove" size={24} color="white" />
                    </MainButon>
                </View>


                <View style={styles.listContainer}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                    <FlatList contentContainerStyle={styles.list}
                        data={pastGuesses}
                        renderItem={renderListItem.bind(this, pastGuesses.length)} l̥
                        keyExtractor={item => item.toString()} />
                </View>
            </View>
        )
    }


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
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList contentContainerStyle={styles.list}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)} l̥
                    keyExtractor={item => item.toString()} />
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
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
        width: 400,
        maxWidth: '95%'
    },
    controls : {
        flexDirection:  'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    listContainer: {
        flex: 1, //ScrollView inside View need flex 1 to scroll in android.
        //width: '80%',// for scroll view
        width: Dimensions.get('window').width > 350 ? '60%' : '80%'
    },
    list: {
        flexGrow: 1, // use whole available space, but keeps the other properties (Fixes not scrolling in Android).
        // alignItems: 'center', // only for scroll view
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
        //width: '60%'// for scroll view,
        width: '100%'// for flat list
    }
})
export default GameScreen;