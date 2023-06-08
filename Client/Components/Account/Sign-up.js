import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import Input from "./Input";
import { SafeAreaView } from "react-native-safe-area-context";
import usePostAxios from "../../Hook/PostAxios";
import useGetAxios from "../../Hook/GetAxios";
import useCheckValidation from "../../Hook/CheckValidation";

export default SignUp = ({ navigation }) => {
  const [ios, setIos] = useState(false);
  const [checkTitle, setCheckTitle] = useState(1); // 1: 이름 2: 학번 3: 비밀번호 4: 이메일 5: 학과인증
  const [sendMail, setSendMail] = useState(false);
  const [CheckState, setCheckState] = useState(false);

  const [name, setName] = useState("");
  const [student_Id, setStudent_Id] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [enable, setEnable] = useState(false);

  const { postdata, posterrer, postloaded, postAxios } = usePostAxios();
  const { getdata, geterrer, getloaded, getAxios, setLoaded } = useGetAxios();

  useCheckValidation(name, student_Id, password, email, setEnable);

  useEffect(() => {
    Platform.OS === "ios" ? setIos(true) : setIos(false);
  }, []);

  useEffect(() => {
    if (getloaded) {
      if (!getdata) {
        setMessage("");
        setCheckTitle(3);
        setEnable(false);
      } else {
        setMessage("이미 가입된 학번이야");
        setLoaded(false);
      }
    }
  }, [getloaded]);

  const Checking = async () => {
    switch (checkTitle) {
      case 1:
        // 이름은 크게 조건을 두지않는다.
        setCheckTitle(2);
        setEnable(false);
        break;
      case 2:
        // 학번은 숫자만 가능 및 자리수 정확
        await getAxios("/existId/" + student_Id);
        break;
      case 3:
        setCheckTitle(4);
        setEnable(false);
        break;
      case 4:
        if (!sendMail) {
          setSendMail(true);
          setMessage("");
          setEnable(false);
        } else if (sendMail) {
          // TODO: 메일 인증부분
          setCheckTitle(5);
        }
        break;
      case 5:
        break;
    }
  };

  const SignupRequest = () => {
    const payload = {
      username: name,
      studentId: student_Id,
      password: password,
      email: email,
    };
    postAxios("/signup", payload);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#FFDE89" }}>
      <View style={styles.container}>
        <View style={styles.Logo}>
          <Text style={{ color: "#6B83AF", fontSize: 50 }}>Logo</Text>
        </View>

        <View style={styles.Body}>
          <Text
            style={{
              fontSize: 32,
              color: "#ffffff",
              fontWeight: "bold",
              top: "2%",
            }}
          >
            SIGN - UP
          </Text>
          <View style={styles.Inputs}>
            {checkTitle === 1 ? (
              <Input
                Title={"성명"}
                CheckState={CheckState}
                SetState={setName}
                State={name}
                Message={message}
              />
            ) : checkTitle === 2 ? (
              <Input
                Title={"학번"}
                CheckState={CheckState}
                SetState={setStudent_Id}
                State={student_Id}
                Message={message}
              />
            ) : checkTitle === 3 ? (
              <Input
                Title={"암호"}
                Hint={"영문, 숫자 포함 6~15"}
                CheckState={CheckState}
                SetState={setPassword}
                Message={message}
                State={password}
              />
            ) : checkTitle === 4 ? (
              <Input
                Title={"메일"}
                Hint={"수원대 웹메일만 인증 가능"}
                CheckState={CheckState}
                SendMail={sendMail}
                SetState={setEmail}
                Message={message}
                State={email}
              />
            ) : checkTitle === 5 ? (
              <Input
                Title={"학과"}
                Hint={"학생증 또는 학부 인증 가능 이미지 첨부"}
              />
            ) : (
              <></>
            )}
            {/* 경우마다 다른 화면 */}
            {/* <Input Title={"성명"} CheckState={false}/> */}
            {/* <Input Title={"학번"} CheckState={true}/> */}
            {/* <Input Title={"암호"} Hint={"영문, 숫자 포함 6~15"} CheckState={false}/> */}
            {/* <Input Title={"메일"} Hint={"수원대 웹메일만 인증 가능"} CheckState={false} SendMail={false}/> */}
          </View>
        </View>

        <View style={styles.Btn}>
          <TouchableOpacity
            style={{
              width: 115,
              height: 40,
              backgroundColor: enable ? "#6B83AF" : "#B6B9C0",
              borderRadius: 44,
              justifyContent: "center",
              alignItems: "center",
              top: 30,
            }}
            onPress={() => Checking()}
            disabled={!enable}
          >
            <Text
              style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold" }}
            >
              GO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ top: 50 }}
            onPress={() => {
              checkTitle !== "학과"
                ? navigation.navigate("LoginPage")
                : SignupRequest();
            }}
          >
            {checkTitle !== "학과" ? (
              <Text
                style={{ color: "#6B83AF", fontSize: 15, fontWeight: "bold" }}
              >
                Back
              </Text>
            ) : (
              <Text
                style={{ color: "#6B83AF", fontSize: 15, fontWeight: "bold" }}
              >
                다음에 할래요
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFDE89",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  Logo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  Body: {
    flex: 3,
    alignItems: "center",
  },
  Inputs: {
    flex: 1,
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 44,
  },
  Btn: {
    flex: 1,
    alignItems: "center",
  },
});
