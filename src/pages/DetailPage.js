import React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'

const DetailPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <TouchableOpacity>
        <Button
          title='Create post'
          onPress={() => navigation.navigate('CreatePost')}
        />
      </TouchableOpacity>
    </View>
  )
}

export default React.memo(DetailPage)
