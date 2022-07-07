import axios from '../axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
// import Cards from './Components/cards';
// import Cards from './components/Cards';
import Cards from "../Components/Cards";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ModalComponent from '../Components/Modal';



export default function App() {
  const [data, setData] = React.useState([])
  const [page, setPage]  = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [modalVisible, setModalVisible] = React.useState(false);


  React.useEffect(() => {
   const fetchData = async () => {
    setLoading(true)
    const response  = await axios.get(`/news?page=${page}&limit=10`).then(response =>  response.data).catch(error => {
      console.log(error.response)
    }).finally(() => {
      setLoading(false)
    })

    setData(response)
   }
   fetchData()
  }, [page])
  const renderItem = ({item} : any) => {
return (
  <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
 
  <Cards data={item} />
  </View>
);
  }  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{height: "90%"}}> 
      <Button title="Add News" onPress={() => setModalVisible(true)}/>
      {loading ? 
      <ActivityIndicator />
      :
      <FlatList 
      // ref={"FlatList"}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item: any) => item?.id}
      />
      }
      </View>

    <View style={{display: "flex", flexDirection: "row", width: "100%", justifyContent:"space-between"}}>
      <Button title='Prev' disabled={page == 1} onPress={() => setPage((prev) => prev - 1)}/>
      <Button title='Next' disabled={data.length < 10} onPress={() => setPage((prev) => prev 
        + 1)}/>
    </View>
    <ModalComponent 
    modalVisible={modalVisible}
    setModalVisible={setModalVisible}
    />
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: "100%",
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
