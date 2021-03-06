import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
} from 'react-native'
import { theme } from '../../colors'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Fontisto, MaterialIcons, AntDesign } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'

const STORAGE_KEY = '@todos'
const IS_WORK = '@isWork'

const UpdateTodo = ({ submitHandler, initText, todoKey, setUpdateTodoKey }) => {
  const [text, setText] = useState(initText)

  return (
    <View
      style={{
        ...styles.todo,
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
    >
      <TextInput
        style={styles.updateInput}
        onChangeText={setText}
        onSubmitEditing={() => {
          let updateText = text.trim() === '' ? initText : text
          submitHandler(todoKey, updateText)
        }}
        value={text}
      />
      <TouchableOpacity onPress={() => setUpdateTodoKey('')}>
        <MaterialIcons name='cancel' size={24} color={theme.grey} />
      </TouchableOpacity>
    </View>
  )
}

const TodoPage = () => {
  const [working, setWorking] = useState(true)
  const [text, setText] = useState('')
  const [todos, setTodos] = useState({})
  const [updateTodoKey, setUpdateTodoKey] = useState('')

  const travel = () => {
    setWorking(false)
    saveIsWork(false)
  }
  const work = () => {
    setWorking(true)
    saveIsWork(true)
  }
  const onChangeText = (payload) => setText(payload)
  const addToDo = async () => {
    if (text === '') {
      return
    }
    const newTodos = {
      ...todos,
      [Date.now()]: { text, work: working, isComplete: false },
    }
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
      if (str) {
        setTodos(JSON.parse(str))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const saveIsWork = async (toSave) => {
    try {
      await AsyncStorage.setItem(IS_WORK, JSON.stringify(toSave))
    } catch (e) {
      console.log(e)
    }
  }

  const loadIsWork = async () => {
    try {
      const str = await AsyncStorage.getItem(IS_WORK)
      setWorking(JSON.parse(str))
    } catch (e) {
      console.log(e)
    }
  }

  const deleteTodo = (key) => {
    if (Platform.OS === 'web') {
      const ok = confirm('Do you want to delete this To Do?')
      if (ok) {
        const newTodos = { ...todos }
        delete newTodos[key]

        setTodos(newTodos)
        saveTodos(newTodos)
      }
    } else {
      Alert.alert('Delete To Do?', 'Are you sure?', [
        { text: '?????????' },
        {
          text: '???',
          onPress: () => {
            const newTodos = { ...todos }
            delete newTodos[key]

            setTodos(newTodos)
            saveTodos(newTodos)
          },
        },
      ])
    }
  }

  const toggleCompleteTodo = (key) => {
    const newTodos = { ...todos }
    newTodos[key].isComplete = !newTodos[key].isComplete
    setTodos(newTodos)
    saveTodos(newTodos)
  }

  useEffect(() => {
    loadTodos()
    loadIsWork()
    return () => setUpdateTodoKey('')
  }, [])

  const updateTodo = (key, toUpdate) => {
    const newTodos = { ...todos }
    newTodos[key].text = toUpdate
    setTodos(newTodos)
    saveTodos(newTodos)
    setUpdateTodoKey('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{
              fontSize: 38,
              fontWeight: '600',
              color: working ? 'white' : theme.grey,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              fontSize: 38,
              fontWeight: '600',
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
            updateTodoKey === key ? (
              <UpdateTodo
                {...{
                  submitHandler: updateTodo,
                  initText: todos[key].text,
                  key,
                  todoKey: key,
                  setUpdateTodoKey,
                }}
              />
            ) : (
              <View style={styles.todo} key={key}>
                <TouchableOpacity
                  style={{ marginRight: 20 }}
                  onPress={() => toggleCompleteTodo(key)}
                >
                  <AntDesign
                    name={
                      todos[key].isComplete ? 'checkcircle' : 'checkcircleo'
                    }
                    size={18}
                    color={todos[key].isComplete ? 'white' : 'grey'}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    ...styles.todoText,
                    ...(todos[key].isComplete ? styles.completeText : {}),
                  }}
                >
                  {todos[key].text}
                </Text>
                <TouchableOpacity
                  onPress={() => setUpdateTodoKey(key)}
                  style={{ marginRight: 20 }}
                >
                  <AntDesign name='form' size={24} color='grey' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTodo(key)}>
                  <Fontisto name='trash' size={18} color='grey' />
                </TouchableOpacity>
              </View>
            )
          ) : null
        )}
      </ScrollView>
    </View>
  )
}

export default React.memo(TodoPage)

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
  todoText: { color: 'white', fontSize: 16, fontWeight: '500', flex: 2 },
  completeText: {
    color: theme.grey,
    textDecorationLine: 'line-through',
  },
  updateInput: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    marginRight: 15,
  },
})
