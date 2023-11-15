import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { primary } from "../Constants/colors";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default function ErrorPopUp({ message, open }) {
  const [bottom, setBottom] = React.useState(-100);

  React.useEffect(() => {
    if (open) {
      LayoutAnimation.easeInEaseOut();
      setBottom((value) => value + 110);
      setTimeout(() => {
        if (bottom < 0) {
          setBottom(-100);
        }
      }, 5000);
    }
  }, []);

  const _onPress = () => {
    setBottom(-100);
  };

  return (
    <TouchableOpacity onPress={_onPress} style={[styles.popUp, styles.button]}>
      <View style={{ flexDirection: "row" }}>
        <Text style={[styles.buttonText, { position: "absolute" }]}>
          {message ? message : "Something went wrong :("}
        </Text>
        <Ionicons
          name="close"
          size={16}
          color="white"
          style={{
            position: "absolute",
            right: 0,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 0,
    height: 0,
    backgroundColor: "red",
  },
  button: {
    backgroundColor: primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
  },
  popUp: {
    width: "95%",
    position: "absolute",
    bottom: bottom,
    height: "6%",
    borderRadius: 10,
    alignSelf: "center",
    padding: 20,
  },
});
