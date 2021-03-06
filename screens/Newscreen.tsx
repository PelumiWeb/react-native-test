import { Image, StyleSheet, Text, View, ActivityIndicator, FlatList, Button, Alert } from "react-native";
import React from "react";
import axios from "../axios";
import GetComments from "../requests/commentsRequests/getComments";
import Cards from "../Components/Cards"
import { ScrollView } from "native-base";
import DeleteNews from "../requests/newsRequests/deleteNews";
import EditModalComponent from "../Components/EditModal";
import AddImageModalComponent from "../Components/AddImageModal";
import AddCommentModalComponent from "../Components/PostComments";
import GetNews from "../requests/newsRequests/getNews";
import fetchImageData from "../requests/ImageRequests/fetchImage";

const Newscreen = (props: any) => {
  const [news, setNews] = React.useState(props.route.params.data)
  const [images, setImages] = React.useState([]);
  const [loadingImages, setLoadingImages] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [isLoadingComments, setIsLoadingComments] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [addImageModalVisible, setAddImageModalVisible] = React.useState(false);
  const [addCommentModalVisible, setAddCommentModalVisible] = React.useState(false);


  React.useEffect(() => {
      const fetchData = async () => { 
        const response = await GetNews(news.id)
        setNews(response)
      }
      fetchData()
  }, [modalVisible, addImageModalVisible, addCommentModalVisible])

  React.useEffect(() => {
    setLoadingImages(true)
    const fetchData = async () => {
      try {
        const response = await fetchImageData(news.id)
          setLoadingImages(false)
      setImages(response)
      } catch (err) { 
          setLoadingImages(false)

      }
    };
    fetchData();
  }, [modalVisible, addImageModalVisible, addCommentModalVisible]);

  const deleteNews = async() => {
    try {
      const result = await DeleteNews(news.id)
      Alert.alert("News auccessfully deleted")
      props.navigation.goBack()
    } catch(err) {

    }
  }

  React.useEffect(() => {
    setIsLoadingComments(true)
    const fetchData = async () => {
      try {
        const response = await GetComments(news.id)
        setComments(response)
        setIsLoadingComments(false)
      } catch(err)  {
        setIsLoadingComments(false)
      }
    }
    fetchData()
  }, [modalVisible, addImageModalVisible, addCommentModalVisible])
  const renderItem = ({item} : any) => {
    return (
      <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
      <Cards data={item} />
      </View>
    );
      }  


  return (
    <ScrollView>
      <View style={{display: "flex", flexDirection: "row", alignItems: "center",  justifyContent:"space-between"}}> 
      <Button title="Delete News" onPress={deleteNews} />
      <Button title="Edit News" onPress={() => setModalVisible(true)} />
      </View>
     


      <Text>{news.title}</Text>
      <Text>{news.body}</Text>
      <Text>{news.author}</Text>
      <Button title="Add Image" onPress={()=> setAddImageModalVisible(true)} />
      {loadingImages && <ActivityIndicator />}
      {images.map((image: any) => (
        <Image
          source={{ uri: image.image }}
          style={{
            width: 200,
            height: 200,
          }}
        />
      ))}
      <View> 
      <Button title="Add Comment" onPress={() => setAddCommentModalVisible(true)}/>
      <Text>Comments</Text>
      {!isLoadingComments && comments?.lenght == 0 ?
      <View> 
        <Text>No comments avaiilable</Text>  
        </View>
        :
        <FlatList 
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item: any) => item?.id}
        />
        }
    
      </View>
      <EditModalComponent 
    modalVisible={modalVisible}
    setModalVisible={setModalVisible}
    id={news.id}
    />

<AddImageModalComponent 
    modalVisible={addImageModalVisible}
    setModalVisible={setAddImageModalVisible}
    id={news.id}
    />
    <AddCommentModalComponent 
    modalVisible={addCommentModalVisible}
    setModalVisible={setAddCommentModalVisible}
    id={news.id}
    />
     
    </ScrollView>
  );
};

export default Newscreen;

const styles = StyleSheet.create({});
