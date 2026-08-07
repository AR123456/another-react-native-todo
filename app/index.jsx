import { Text, View, TextInput, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
// test data
import { data } from "@/data/todos";
export default function Index() {
  // getters setters  - sort data so newest todo is first/top on list
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  // text input
  const [text, setText] = useState("");
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
  // read flat list

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
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* text input and a pressable or button  */}
        <Text>The todo List </Text>

        <TextInput style={styles.input} />
        <Pressable>
          <Text>Add todo</Text>
        </Pressable>
      </View>
      {/* flat list here */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  inputContainer: {},
  input: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 18,
    minWidth: 0,
    color: "white",
  },
});
