import {  StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {SafeAreaView } from 'react-native-safe-area-context';


export default Login = ({navigation}) => {
  return (
    <SafeAreaView style={{ backgroundColor : "#FFDE89" }}>
    <View style={styles.container}>
        <View style={styles.Logo}>
            <Text style={{ color : "#6B83AF", fontSize : 50 }}>LOGO</Text>
        </View>
        
        <View style={styles.Input}>
            <View style={ styles.Id }>
                <View style={styles.InputView}>
                    <Text style={styles.LoginText}>학번</Text>
                    <TextInput style={styles.LoginInput}/>
                </View>
            </View>

            <View style={ styles.Password}>
                <View style={styles.InputView}>
                    <Text style={styles.LoginText}>비밀번호</Text>
                    <TextInput style={styles.LoginInput}
                    secureTextEntry ={true}
                    />
                </View>
            </View>
        </View>

        <View style={ styles.LoginBtn }>
            <TouchableOpacity style={{ width : 115, height : 40, backgroundColor : "#6B83AF", borderRadius : 44, alignItems : "center", justifyContent : "center"}}
                activeOpacity={0.5}
            >
                <Text style={{ color : "#ffffff", fontWeight : "bold", fontSize : 18 }}>LOG IN</Text>
            </TouchableOpacity>
        </View>

        <View style={ styles.OtherBtn}>
            <TouchableOpacity onPress={() => navigation.navigate("SignUpPage")}>
                <Text style={styles.otherBtnText}>처음왔다면 날 클릭해조</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.otherBtnText}>내 비밀번호가 뭐였더라</Text>
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
    paddingHorizontal : 30,
    justifyContent: 'center',
  },

  Logo:{
    flex : 5,
    alignItems : "center",
    justifyContent : "center",
    width : "100%",
  },
  Id:{
    marginBottom : 15
  },

  Input:{
    flex : 1.5,
  },

    LoginBtn:{
        flex : 3,
        height : 100,
        alignItems : "center",
        justifyContent : "center"
    },

  OtherBtn:{
    flex : 2,
    flexDirection : "row",
    justifyContent : "space-between",
    marginStart : 30,
    marginEnd : 30,
  },

  InputView : {
    borderBottomColor : "#6B83AF",
    borderBottomWidth : 2,
    width : "100%" 
  },

  LoginText : {
    color : "#6B83AF", 
    fontWeight : "bold", 
    top : 25, 
    fontSize : 18,
  },

  LoginInput:{
    width : "100%" ,
    height : 30,
    paddingStart : 100,
    color : "#6B83AF",
  },


  otherBtnText: {
    color: "#344A76",
    fontSize : 13,
    borderBottomColor :  "#344A76",
    borderBottomWidth : 1 ,
  },

});
