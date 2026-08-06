import { Text, View } from "react-native";
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
    }
  };
  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Edit app/index.tsx to edit this screen.</Text>
      </View>
    </SafeAreaView>
  );
}
