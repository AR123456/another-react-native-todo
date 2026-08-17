import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { ThemeContext } from "@/context/ThemeContext";
// sun and moon icons
import Octicons from "@expo/vector-icons/Octicons";
// animations vis react reanimated
import Animated, { LinearTransition } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
// test data
import { data } from "@/data/todos";
export default function Index() {
  // getters setters  - sort data so newest todo is first/top on list
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  // text input
  const [text, setText] = useState("");
  // color scheme
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  // which font based on error state
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });
  // need to put useEffect before fonts load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // retrive local data if it
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        // parse json if it does not exist return null
        const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
        // if there are stored run setter setTodos
        if (storageTodos && storageTodos.length) {
          setTodos(storageTodos);
        }
      } catch (e) {
        console.error(e);
      }
    };
  }, []);
  // check state for font- wait for it to load
  if (!loaded && !error) {
    return null;
  }
  const styles = createStyles(theme, colorScheme);
  const addTodo = () => {
    //remove extra spaces
    if (text.trim()) {
      // create id for new   - take first todo it array that has the highest number and add 1 to it, it no todos then the number is 1
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      // create this todo object then spread in the rest
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      // set text in input back to null
      setText("");
    }
  };

  // toggle complete or not
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  // delete todo
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  // for each todo item
  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text
        style={[styles.todoText, item.completed && styles.completedText]}
        onPress={() => toggleTodo(item.id)}
      >
        {item.title}
      </Text>
      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons
          name="delete-circle"
          size={36}
          color="red"
          selectable={undefined}
        />
      </Pressable>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor="gray"
          value={text}
          onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add todo</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            setColorScheme(colorScheme === "light" ? "dark" : "light")
          }
          style={{ marginLeft: 10 }}
        >
          <Octicons
            name={colorScheme === "dark" ? "moon" : "sun"}
            size={36}
            color={theme.text}
            selectable={undefined}
            style={{ width: 36 }}
          ></Octicons>
        </Pressable>
      </View>
      <Animated.FlatList
        // todo state
        data={todos}
        renderItem={renderItem}
        keyExtractor={(todo) => todo.id}
        contentContainerStyle={{ flexGrow: 1 }}
        // animation props
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"
      />
    </SafeAreaView>
  );
}
function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      padding: 10,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    input: {
      flex: 1,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      fontFamily: "Inter_500Medium",
      minWidth: 0,
      color: theme.text,
    },
    addButton: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
    },
    addButtonText: {
      fontSize: 18,
      color: colorScheme === "dark" ? "black" : "white",
    },
    // for flat list of items
    todoItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 4,
      padding: 10,
      borderBottomColor: "gray",
      borderBottomWidth: 1,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
    },
    todoText: {
      flex: 1,
      fontSize: 18,
      color: theme.text,
      fontFamily: "Inter_500Medium",
    },
    completedText: {
      textDecorationLine: "line-through",
      color: "gray",
    },
  });
}
