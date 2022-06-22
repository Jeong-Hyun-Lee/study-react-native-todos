import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { post } from '../recoil/post'
import { TextInput, Button } from 'react-native'

const CreatePostPage = ({ navigation, route }) => {
  const [postValue, setPostValue] = useRecoilState(post)

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postValue}
        onChangeText={setPostValue}
      />
      <Button
        title='Done'
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
          })
        }}
      />
    </>
  )
}

export default React.memo(CreatePostPage)
