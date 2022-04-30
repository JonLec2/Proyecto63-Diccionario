import * as React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default class App extends React.Component {

  constructor(){
    super()

    this.state={
      text1:'', 
      word:'',
      lexicalCategory:'', 
      definition: '', 
      isSearchPressed: false, 
      aviso:'Escribe una palabra', 
    }
  }

  getWord= async (word)=>{
    var searchKeyword=word.toLowerCase()
    var url="https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
return fetch(url)
.then((data)=>{
  if(data.status===200){
    return data.json()
  }
else{
  return null
}
})

.then((response)=>{
var responseObject =response

if(responseObject){
  var wordData=responseObject.definitions[0]
var definition1=wordData.description
var lexicalCategory1=wordData.wordtype

this.setState({
  "word":this.state.text1,
  "definition":definition1,
  "lexicalCategory":lexicalCategory1,
  "aviso":"Palabra encontrada✅", 
})

}

else{
  this.setState({
    "word":this.state.text1,
    "definition":"NotFound",
    "lexicalCategory":"NotFound",
    "aviso":"Intenta con otra palabra, probablemente no este en nuestra bibliotéca❌"
  })
}

})
  }


  render(){
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
   <View style={styles.header}>
<Text style={styles.textheader}>Diccionario</Text>
   </View>
     
      <Text style={styles.aviso}>Busca la palabra</Text>
      
<TextInput style={styles.BoxInput}  onChangeText={(text1)=>{
this.setState({
  text1: text1,
  isSearchPressed:false, 
  word: "",
  lexicalCategory:"",
  definition:"",
  aviso:"Escribe una palabra"
});


}}
value={this.state.text1}
/>

<TouchableOpacity style={styles.button}
onPress={()=>{
  this.setState({isSearchPressed: true});
  this.getWord(this.state.text1)
}}
><Text style={styles.textbuton}>Buscar</Text></TouchableOpacity>

<Text  style={styles.avisotext}>{this.state.aviso}</Text>

<View>
  


<View style={styles.textinformation}>
  <View style={styles.grid}>
<Text style={styles.categoria}> Word: {""}</Text>
<Text style={styles.textdefinition}>{this.state.word}</Text>
</View>

<View  style={styles.grid}>
<Text style={styles.categoria} > Type: {""}</Text>
<Text style={styles.textdefinition}>{this.state.lexicalCategory}</Text>
</View>

<View style={styles.grid}>
<Text style={styles.categoria}>Definition:{""}</Text>
<Text  style={styles.textdefinition}>{this.state.definition}</Text>
</View>

</View>

</View>

    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
   
  },

  header:{
backgroundColor:'#696969',
width:'100%', 
height:'11%',
alignItems:"center", 
marginBottom:20, 

  },

  textheader:{
color:"white",
fontSize:20, 
fontWeight:"bold", 
marginTop:40,

  },
  aviso:{
    fontSize:20,
    marginBottom:20,
  },

BoxInput:{
height:30, 
width:200, 
borderWidth:2,
backgroundColor:"white", 
marginBottom:25, 

},

button:{
  backgroundColor:"#ffd700",
   width:200, 
   justifyContent:"center",
   alignItems:"center",
   height:60, 
   borderRadius:20, 
   borderWidth:3,
   marginBottom:20,
  
},
textbuton:{
  fontSize:25,
  color:"black"
  
},

avisotext:{
  fontSize:19,
  marginBottom: 30,
  textAlign:"center",

},

textinformation:{
  backgroundColor:"#8080803f",
  width: 330,
  borderRadius:20,
  flexDirection:"column"

},

grid:{
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop:20,
  height:'16%',
  marginLeft:12,

},

categoria:{
  fontSize:20,
  fontWeight:"bold",
},

textdefinition:{
  fontSize:20,
  textAlign:"justify",
paddingRight:20,
  
}


});
