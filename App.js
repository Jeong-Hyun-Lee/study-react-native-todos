import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native'
import { theme } from './colors'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Fontisto } from '@expo/vector-icons'

const STORAGE_KEY = '@todos'

export default function App() {
  const [working, setWorking] = useState(true)
  const [text, setText] = useState('')
  const [todos, setTodos] = useState({})

  const travel = () => setWorking(false)
  const work = () => setWorking(true)
  const onChangeText = (payload) => setText(payload)
  const addToDo = async () => {
    if (text === '') {
      return
    }
    const newTodos = { ...todos, [Date.now()]: { text, work: working } }
    // console.log(newTodos)
    setTodos(newTodos)
    await saveTodos(newTodos)
    setText('')
  }

  const saveTodos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
    } catch (e) {
      console.log(e)
    }
  }

  const loadTodos = async () => {
    try {
      const str = await AsyncStorage.getItem(STORAGE_KEY)
      setTodos(JSON.parse(str))
    } catch (e) {
      console.log(e)
    }
  }

  const deleteTodo = (key) => {
    Alert.alert('Delete To Do?', 'Are you sure?', [
      { text: '아니오' },
      {
        text: '네',
        onPress: () => {
          const newTodos = { ...todos }
          delete newTodos[key]

          setTodos(newTodos)
          saveTodos(newTodos)
        },
      },
    ])
  }

  useEffect(() => {
    loadTodos()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? 'white' : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={travel}
          // onPressIn={(e) => console.log('onPressIn')}
          // onLongPress={(e) => console.log('onLongPress')}
          // onPressOut={(e) => console.log('onPressOut')}
        >
          <Text
            style={{
              ...styles.btnText,
              color: !working ? 'white' : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          onSubmitEditing={addToDo}
          style={styles.input}
          placeholder={working ? 'Add a To Do' : 'Where do you want go?'}
          onChangeText={onChangeText}
          value={text}
          returnKeyType='done'
        />
      </View>
      <ScrollView>
        {Object.keys(todos).map((key) =>
          todos[key].work === working ? (
            <View style={styles.todo} key={key}>
              <Text style={styles.todoText}>{todos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteTodo(key)}>
                <Fontisto name='trash' size={18} color={theme.grey} />
              </TouchableOpacity>
            </View>
          ) : null
        )}
      </ScrollView>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  todo: {
    backgroundColor: theme.todoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoText: { color: 'white', fontSize: 16, fontWeight: '500' },
})
