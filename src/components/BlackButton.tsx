import React from 'react'
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'
import { TouchableOpacity, View } from 'react-native'

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}
export const BlackButton = ({ onPress, title, style = {} }: Props) => {
  return (
    <TouchableOpacity
        onPress={ onPress }
        activeOpacity={ 0.8 }
        style={{
            ...style as any,
            ...styles.blackButton,
        }}
    >
        <Text style={ styles.textButton }>{ title }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    blackButton: {
        height: 45,
        width: 200,
        borderRadius: 50,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    textButton: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    }
})
