import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TodoPage from './src/pages/TodoPage'
import { MaterialIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

function HomeScreen({ navigation, route: { params } }) {
  const { test } = params

  useEffect(() => {
    if (params?.post) {
      console.log('post')
    }
  }, [params?.post])

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Details'
        component={DetailsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='home' size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Tab.Screen
        name='Todo'
        component={TodoPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name='work' size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  )
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = useState('')

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: 'white' }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title='Done'
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
            params: { post: postText },
            merge: true,
          })
        }}
      />
    </>
  )
}

function DetailsScreen({ navigation }) {
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

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/icon.png')}
    />
  )
}

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          initialParams={{ test: 14 }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='CreatePost'
          component={CreatePostScreen}
          options={{
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title='Info'
                color='#000'
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
