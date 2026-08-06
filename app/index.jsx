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
