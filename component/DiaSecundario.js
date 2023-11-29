import React, {useState, useEffect} from 'react';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

export default function DiaSecundario({...item}){

  const [data, setData] = useState('');

  useEffect(() => {
      getIcon();
      dataAtualFormatada()
  }, []);

  function dataAtualFormatada(){
    var data = new Date(item.data),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano  = data.getFullYear();
    setData(dia+"/"+mes+"/"+ano)
  }

  function getIcon(){
    switch(item.condicao){
      case 'c':
        return <Ionicons name="md-rainy" size={20} color="white" />;
      case 'ci':
        return <Ionicons name="md-rainy" size={20} color="white" />;
      case 'pn':
        return <Ionicons name="cloudy" size={20} color="white" />
      case 'pc':
        return <Fontisto name="rains" size={20} color="white" />
      case 't':
        return <Ionicons name="thunderstorm" size={20} color="white" />
      case 'ps':
        return <Ionicons name="sunny" size={20} color="white" />
      case 'cl':
        return <Ionicons name="sunny" size={20} color="white" />
    }
  }



    return (
        <View style={styles.container}>
            <Text style={styles.txt}>{data}</Text>
            {getIcon()}
            <Text style={styles.txt}>{item.condicao_desc}</Text>
            <Text style={styles.txt}>Temp Máx: {item.max}º</Text>
            <Text style={styles.txt}>Temp Mín: {item.min}º</Text>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: '3%',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: '1%',
    flexGrow: 1,
    borderWidth: 1,
    borderColor: '#3bdff5'
  },
  txt:{
    color: 'white',
    fontSize: 10
  }
});