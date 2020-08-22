import React from 'react'
import {StyleSheet, Text, View} from "react-native";
import colors from "../constants/colors";

const NumberContainer = (props) => {
    return (
        <View style={{...styles.container, ...props.style}}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.ACCENT,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        fontSize: 20,
        color: colors.ACCENT
    }
})

export default NumberContainer;