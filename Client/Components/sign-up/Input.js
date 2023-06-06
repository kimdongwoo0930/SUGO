import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

export default Input = ({
  Title,
  Hint,
  State,
  SetState,
  CheckState,
  SendMail,
}) => {
  const [ios, setIos] = useState();
  const [timer, setTimer] = useState();

  useEffect(() => {
    Platform.OS === "ios" ? setIos(true) : setIos(false);
  }, []);

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      paddingHorizontal: 30,
    },
    InputView: {
      borderBottomColor: "#6B83AF",
      borderBottomWidth: 2,
      width: "100%",
      //   marginTop : ios ? "70%" : "60%",
      top: "40%",
    },
    InputTitle: {
      color: "#6B83AF",
      fontWeight: "bold",
      top: 25,
      fontSize: 16,
    },
    textInput: {
      width: "100%",
      height: 30,
      paddingStart: 80,
      color: "#6B83AF",
    },
    HintMsg: {
      color: "#6B83AF",
      fontWeight: "bold",
      textAlign: "right",
      top: "10%",
    },
    failMsg: {
      color: "#D03838",
      top: "40%",
      fontWeight: "bold",
    },
  });

  if (["성명", "학번"].includes(Title)) {
    return (
      <View style={styles.container}>
        <View style={styles.InputView}>
          <Text style={styles.InputTitle}>{Title}</Text>
          <TextInput
            style={styles.textInput}
            value={State}
            onChange={(event) => SetState(event.nativeEvent.text)}
          />
        </View>
        {/* <Text style={{ color : "#6B83AF", fontWeight : "bold" , textAlign : "right", bottom : 4}}>SUGO</Text> */}
        {CheckState ? (
          <Text style={[styles.failMsg]}>다시해 다시해~</Text>
        ) : (
          <></>
        )}
      </View>
    );
  } else if (Title === "학과") {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              top: "7%",
              right: "25%",
              fontWeight: "bold",
              color: "#6B83AF",
              fontSize: 15,
            }}
          >
            SU
          </Text>
          <View
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: "#6B83AF",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: "80%",
                height: "80%",
                backgroundColor: "#6B83AF",
                borderRadius: 100,
              }}
            ></TouchableOpacity>
          </View>
          <Text
            style={{
              bottom: "7%",
              left: "25%",
              fontWeight: "bold",
              color: "#6B83AF",
              fontSize: 15,
            }}
          >
            GO
          </Text>
        </View>
        <View style={{ width: "100%", bottom: "7%" }}>
          <Text style={[styles.HintMsg, { textAlign: "center" }]}>{Hint}</Text>
        </View>
      </View>
    );
  } else if (Title === "메일") {
    return (
      <View style={styles.container}>
        <View style={styles.InputView}>
          <Text style={styles.InputTitle}>{Title}</Text>
          <TextInput
            style={styles.textInput}
            editable={SendMail}
            value={State}
            onChange={(event) => SetState(event.nativeEvent.text)}
          />
        </View>
        {/* <Text style={{ color : "#6B83AF", fontWeight : "bold" , textAlign : "right", bottom : 6, }}>SUGO</Text> */}

        {!SendMail ? (
          <View style={{ width: "100%", top: 5, top: "40%" }}>
            <Text style={styles.HintMsg}>{Hint}</Text>
          </View>
        ) : (
          <View style={{ top: "40%" }}>
            <View
              style={{
                borderBottomColor: "#6B83AF",
                borderBottomWidth: 2,
                width: "70%",
                marginLeft: "15%",
              }}
            >
              <Text style={styles.InputTitle}>인증번호</Text>
              <TextInput style={styles.textInput} />
            </View>
            <View style={{ width: "85%", top: 5 }}>
              <Text
                style={{
                  color: "#DC6A6A",
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                03:00
              </Text>
            </View>
          </View>
        )}
        {CheckState ? (
          <Text style={styles.failMsg}>다시해 다시해~</Text>
        ) : (
          <></>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.InputView}>
          <Text style={styles.InputTitle}>{Title}</Text>
          <TextInput
            style={styles.textInput}
            value={State}
            onChange={(event) => SetState(event.nativeEvent.text)}
          />
        </View>
        {/* <Text style={{ color : "#6B83AF", fontWeight : "bold" , textAlign : "right", bottom : 6, }}>SUGO</Text> */}
        <View style={{ width: "100%", top: 5, top: "40%" }}>
          <Text style={styles.HintMsg}>{Hint}</Text>
        </View>
        {CheckState ? (
          <Text style={[styles.failMsg, { top: "36%" }]}>다시해 다시해~</Text>
        ) : (
          <></>
        )}
      </View>
    );
  }
};
