import { Modal, HStack, Button, FormControl, Input} from 'native-base';
import React from 'react'
import { Alert } from 'react-native';
import PostImage from '../requests/ImageRequests/postImages';
import PostNews from '../requests/newsRequests/postNews';

const AddImageModalComponent = (props:any) => {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [disable, setDisable] = React.useState(true)
    const [isLoading, setIsloading] = React.useState(false)
    const [image, setImage] = React.useState("")
    React.useEffect(() => {
        if (image !== ""){
            setDisable(false)
        }
    }, [image])


    const AddImage = async () => {
        setIsloading(true)
        const body = {
            image, 
            newsId: props.id 
        }
        console.log(body)
        try {
            const result = await PostImage(body)
            console.log(result)
            setIsloading(false)
            props.setModalVisible(false);
            Alert.alert("Added New Successfully")

        } catch(e){
            Alert.alert("Seomthing went wrong")
            setIsloading(false)
        }
    }

    return <>
        <Modal isOpen={props.modalVisible} onClose={() => props.setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Add Image</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Image</FormControl.Label>
                <Input
                 onChangeText={(text) => setImage(text)}
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
                onPress={AddImage}>
                  Add
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>;
  }

  export default AddImageModalComponent;