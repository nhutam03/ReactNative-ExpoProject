import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import {Mail, ArrowRight} from 'lucide-react'
import { useNavigation } from '@react-navigation/native';


export default function Home() {
  const navigation = useNavigation();
  return (
    <View style = {styles.container}>
      <View style = {styles.imgHeader}>
        <Image source={require('./img/image.png')} style={styles.img} />
      </View>
      <View style = {styles.view}>
        <Text style={styles.title}>
          MANAGE YOUR {"\n"} TASK
        </Text>
      </View>
      <View style = {styles.email}>
        <Mail />
        <TextInput 
        style={styles.emailInput} 
        placeholder="Enter your name" 
        placeholderTextColor="#bfbfbf" 
      />
      </View>
      <View style = {{flex:1,
      flexDirection:'row', 
      alignItems:'center',
      justifyContent:'space-around'
      }}>
        <TouchableOpacity style = {styles.btn} 
        onPress={() => navigation.navigate('InforScreen')}
        > 
          <Text style = {styles.text}>GET STARTED </Text>
          <ArrowRight color='#fff'/>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  imgHeader: {
    flex:1, 
    alignItems: 'center',
     justifyContent: 'center'
  },
  img: {
    height:100,
     width:100,
  },
  text: {
   fontWeight:'bold',
   textAlign: "center",
   color: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    textAlign: 'center',
    color: '#bea6de',
  },
  btn: {
    fontWeight: 'bold',
    backgroundColor: '#87ceeb',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height:50,
    borderRadius: 20,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  view: {
    flex:1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cac6cf',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  emailInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
});
