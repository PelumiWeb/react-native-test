import { Modal, HStack, Button, FormControl, Input} from 'native-base';
import React from 'react'
import { Alert } from 'react-native';
import EditNews from '../requests/newsRequests/editNews';
import PostNews from '../requests/newsRequests/postNews';

const EditModalComponent = (props:any) => {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [disable, setDisable] = React.useState(true)
    const [isLoading, setIsloading] = React.useState(false)
    const [author, setAuthor] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [body, setBody] = React.useState("")

    React.useEffect(() => {
        if (author !== "" || title !== "" || body !== "") {
            setDisable(false)
        }
    }, [author, title])


    const EditNewsFuntion = async () => {
        setIsloading(true)
        const editBody = {
            author, 
            title, 
            body,
        }
        try {
            const result = await EditNews(editBody, props.id)
            console.log(result)
            setIsloading(false)
            props.setModalVisible(false);
            Alert.alert("Edited New Successfully")

        } catch(e){
            Alert.alert("Seomthing went wrong")
            setIsloading(false)
        }
    }

    return <>
        <Modal isOpen={props.modalVisible} onClose={() => props.setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Add News</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Author</FormControl.Label>
                <Input
                 onChangeText={(text) => setAuthor(text)}
                />
              </FormControl>
              <FormControl mt="3">
                Title               
                 <Input 
                 onChangeText={(text) => setTitle(text)}
                  />
              </FormControl>
              <FormControl mt="3">
                Body               
                 <Input 
                 onChangeText={(text) => setBody(text)}
                  />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                props.setModalVisible(false);
              }}>
                  Cancel
                </Button>
                <Button 
                isLoading={isLoading}
                isDisabled={disable}
                onPress={EditNewsFuntion}>
                  Add
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>;
  }

  export default EditModalComponent;