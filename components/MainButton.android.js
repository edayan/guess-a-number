import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TouchableNativeFeedback, Platform } from 'react-native';
import colors from '../constants/colors';
import globalStyles from '../constants/default-styles';

const MainButton = (props) => {

    let ButtonComponent = TouchableOpacity;
    if (Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={{ ...globalStyles.bodyTextBig, ...styles.buttonText }}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>

    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden'
    },
    button: {
        backgroundColor: colors.PRIMARY,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25
    },
    buttonText: {
        color: 'white',
    }
});

export default MainButton;