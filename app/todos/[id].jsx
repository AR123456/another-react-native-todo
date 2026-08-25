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
  useEffect(() => {
    // get from local storage  , then save back when done
    const fetchData = async (id) => {
      try {
      } catch (e) {
        console.error(e);
      }
    };
  }, []);
  // check state for font- wait for it to load
  if (!loaded && !error) {
    return null;
  }
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
}
