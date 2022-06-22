import React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import { post } from '../recoil/post'
import { useRecoilValue } from 'recoil'

const DetailPage = ({ navigation }) => {
  const postValue = useRecoilValue(post)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <TouchableOpacity>
        <Button
          title='Create post'
          onPress={() => navigation.navigate('CreatePost')}
        />
      </TouchableOpacity>
      <Text>{postValue}</Text>
    </View>
  )
}

export default React.memo(DetailPage)
