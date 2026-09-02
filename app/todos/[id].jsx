// for dynamic route
import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function EditScreen() {
  // when hook called id value passed to route
  const { id } = useLocalSearchParams();
  const [todo, setTodo] = useState({});
  // color scheme
  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  const router = useRouter();
  // which font based on error state
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });
  const styles = createStyles(theme, colorScheme);
  useEffect(() => {
    // get from local storage  , then save back when done
    const fetchData = async (id) => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (storageTodos && storageTodos.length) {
          const myTodo = storageTodos.find((todo) => todo.id.toString() === id);
          setTodo(myTodo);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData(id);
  }, [id]);
  // check state for font- wait for it to load
  if (!loaded && !error) {
    return null;
  }
  // call with button click
  const handleSave = async () => {
    try {
      // push the title change to the list in async storage
      const savedTodo = { ...todo, title: todo.title };

      const jsonValue = await AsyncStorage.getItem("TodoApp");
      const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
      // filter out the id just edited , from that filtered list add the edited version back
      if (storageTodos && storageTodos.length) {
        const otherTodos = storageTodos.filter(
          (todo) => todo.id !== savedTodo.id,
        );
        const allTodos = [...otherTodos, savedTodo];
        await AsyncStorage.setItem("TodoApp", JSON.stringify(allTodos));
      } else {
        ///take care of scenario where there is not yet an array in local storage
        await AsyncStorage.setItem("TodoApp", JSON.stringify([savedTodo]));
      }
      // go back to home page
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };
  // edit page view
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Edit todo"
          placeholderTextColor="gray"
          value={todo?.title || ""}
          //  spread in value with use effect
          onChangeText={(text) => setTodo((prev) => ({ ...prev, title: text }))}
        />
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
      <View style={styles.inputContainer}>
        <TextInput />
        <Pressable onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/")}
          style={[styles.saveButton, { backgroundColor: "red" }]}
        >
          <Text style={[styles.saveButtonText, { color: "white" }]}>
            Cancel
          </Text>
        </Pressable>
      </View>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}
function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: theme.background,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      padding: 10,
      gap: 6,
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
    saveButton: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
    },
    saveButtonText: {
      fontSize: 18,
      color: colorScheme === "dark" ? "black" : "white",
    },
  });
}
