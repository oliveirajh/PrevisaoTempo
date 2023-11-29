import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View,Button, TouchableOpacity } from 'react-native';
import DiaDestaque from './component/DiaDestaque';
import DiaSecundario from './component/DiaSecundario';
import React, {useState} from 'react';
import axios from 'axios';

export default function App() {

  const [Cep, setCep] = useState('');
  const [CepData, setCepData] = useState({});
  const [Previsao, setPrevisao] = useState([]);

  async function BuscaCidade(){
    let cidade = await axios.get('https://brasilapi.com.br/api/cep/v2/'+Cep).then((res)=>{
      setCepData(res.data);
      return res.data.city;
    });
    return cidade
  }

  async function GetCidadeId(){
    let cidade = await BuscaCidade();
    let cidadeId = await axios.get('https://brasilapi.com.br/api/cptec/v1/cidade/'+cidade).then(async (res)=>{
      return res.data[0].id;
    });
    return cidadeId;
  }
  

  async function GetPrevisao(){
    let idCidade = await GetCidadeId();
    await axios.get('https://brasilapi.com.br/api/cptec/v1/clima/previsao/'+idCidade+'/6').then((res)=>{
        setPrevisao(res.data.clima);
    });
  }

  
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>Previsão do Tempo</Text>
      <View style={styles.search}>
        <TextInput 
          style={styles.input}
          placeholder='Digite seu CEP'
          value={Cep}
          onChangeText={(text)=>setCep(text)}
        />
        <TouchableOpacity style={styles.btn} onPress={() => {GetPrevisao()}}><Text>Buscar</Text></TouchableOpacity>
      </View>
      {CepData.city && CepData.state ? <Text>{CepData?.city} - {CepData?.state}</Text> : null}
      {CepData.neighborhood ? <Text>Bairro: {CepData?.neighborhood}</Text> : null}
      {CepData.street ? <Text>Rua: {CepData?.street}</Text> : null}
      <View style={styles.flexList}>
        {Previsao ? Previsao.map((item, index)=>{
          return index == 0 ? <DiaDestaque key={index} {...item} />  : <DiaSecundario key={index} {...item} />
        }) : null}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '10%',
    flex: 1,
    width:'100%',
    backgroundColor: '#424242',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  btn:{
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '20%',
    height: 40,
    backgroundColor: '#3bdff5',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  search:{
    marginTop: '5%',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  input:{
    width: '50%',
    height: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  Principal:{
    flexBasis: '100%',
  },
  flexList:{
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center'
  }
});
