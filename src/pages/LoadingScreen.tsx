import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'

export const LoadingScreen = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
        <ActivityIndicator 
          size={ 50 }
          color="black"
        />
    </View>
  )
}
