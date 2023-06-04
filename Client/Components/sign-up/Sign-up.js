import { useEffect, useState } from 'react';
import {  StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import Input from './Input';
import {SafeAreaView } from 'react-native-safe-area-context';


export default SignUp = ({navigation}) => {

  const [ios, setIos] = useState(false)
  const [checkTitle, setCheckTitle] = useState("성명")
  const [sendMail, setSendMail] = useState(false)
  const [CheckState, setCheckState] = useState(false)

  const [name,setName] = useState("")
  const [student_Id,setStudent_Id] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")

  useEffect(( ) => {
    Platform.OS === 'ios' ? setIos(true) : setIos(false)
  },[])

  const Checking = () => {
    switch(checkTitle){
      case '성명':
        // 이름은 크게 조건을 두지않는다.
        if(name.length < 2 || name.trim() === ""){
          setCheckState(true)
        }
        else{
          setCheckState(false)
          setCheckTitle("학번")
        }
        break;
      case '학번':
          // 학번은 숫자만 가능 및 자리수 정확
        
          const pattern = /^\d{8}$/;
          console.log(student_Id)
          if(!pattern.test(student_Id)){
            setCheckState(true)
          }
          else{
            setCheckState(false)
            setCheckTitle("암호")
          }
        break;
      case '암호':

        setCheckTitle("메일")
        break;
      case '메일':

        setSendMail(true)
        break;
    }
  }


  return (
    <SafeAreaView style={{ backgroundColor : "#FFDE89" }}>
    <View style={styles.container}>
        <View style={styles.Logo}>
            <Text style={{ color : "#6B83AF", fontSize : 50 }}>Logo</Text>
        </View>

        <View style={styles.Body}>
            <Text style={{ fontSize : 32, color : "#ffffff", fontWeight : "bold" ,top : "2%"}}>SIGN - UP</Text>
            <View style={styles.Inputs}>
              {
                checkTitle === '성명' ? <Input Title={"성명"} CheckState={CheckState} SetState={setName} State={name}/> :
                checkTitle === '학번' ? <Input Title={"학번"} CheckState={CheckState} SetState={setStudent_Id} State={student_Id}/> :
                checkTitle === '암호' ? <Input Title={"암호"} Hint={"영문, 숫자 포함 6~15"} CheckState={true} SetState={setPassword} State={password}/> :
                checkTitle === '메일' ? <Input Title={"메일"} Hint={"수원대 웹메일만 인증 가능"} CheckState={CheckState} SendMail={sendMail} SetState={setEmail} State={email}/> :
                <></>
              }
                {/* 경우마다 다른 화면 */}
                {/* <Input Title={"성명"} CheckState={false}/> */}
                {/* <Input Title={"학번"} CheckState={true}/> */}
                {/* <Input Title={"암호"} Hint={"영문, 숫자 포함 6~15"} CheckState={false}/> */}
                {/* <Input Title={"메일"} Hint={"수원대 웹메일만 인증 가능"} CheckState={false} SendMail={false}/> */}
            </View>
        </View>

        <View style={styles.Btn}>
            <TouchableOpacity style={{ width : 115, height : 40, backgroundColor : "#6B83AF", borderRadius : 44, justifyContent : "center", alignItems : "center", top : 30 }}
            onPress={()=> Checking()}
            >
                <Text style={{ color : "#ffffff", fontSize : 20, fontWeight : "bold" }}>GO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ top : 50 }} onPress={()=> navigation.navigate("LoginPage")}
            >
                <Text style={{ color : "#6B83AF", fontSize : 15, fontWeight : "bold"}}>Back</Text>
            </TouchableOpacity>
        </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width : "100%",
    height : "100%",
    backgroundColor: '#FFDE89',
    justifyContent: 'center',
    paddingHorizontal : 30,
  },
  Logo:{
    flex : 1,
    alignItems : "center",
    justifyContent : "center",
    width : "100%",
  },
  Body:{
    flex :3,
    alignItems : "center"
  },
  Inputs:{
    flex :1,
    backgroundColor : "#ffffff",
    width : "100%",
    borderRadius : 44,
  },
  Btn : {
    flex : 1,
    alignItems : "center",
  },

});
