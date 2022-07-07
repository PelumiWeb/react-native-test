import { Modal, HStack, Button, FormControl, Input} from 'native-base';
import React from 'react'
import { Alert } from 'react-native';
import PostComments from '../requests/commentsRequests/postComments';
import PostNews from '../requests/newsRequests/postNews';

const AddCommentModalComponent = (props:any) => {
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [disable, setDisable] = React.useState(true)
    const [isLoading, setIsloading] = React.useState(false)
    const [name, setName] = React.useState("")
    const [avatar, setAvatar] = React.useState("")
    const [comment, setComment] = React.useState("")

    React.useEffect(() => {
        if (name !== "" && avatar !== "" && comment !== "") {
            setDisable(false)
        }
    }, [name, avatar, comment])


    const AddComments = async () => {
        setIsloading(true)
        const body = {
            newsId:props.id,
            name, 
            avatar,
            comment
        }
        console.log(body)
        try {
            const result = await PostComments(body)
            console.log(result)
            setIsloading(false)
            props.setModalVisible(false);
            Alert.alert("Added Comment Successfully")

        } catch(e){
            Alert.alert("Seomthing went wrong")
            setIsloading(false)
        }
    }

    return <>
        <Modal isOpen={props.modalVisible} onClose={() => props.setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Add Comment</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input
                 onChangeText={(text) => setName(text)}
                />
              </FormControl>
              <FormControl mt="3">
                Avatar               
                 <Input 
                 onChangeText={(text) => setAvatar(text)}
                  />
              </FormControl>
              <FormControl>
                <FormControl.Label>Comments</FormControl.Label>
                <Input
                 onChangeText={(text) => setComment(text)}
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
                onPress={AddComments}>
                  Add
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>;
  }

  export default AddCommentModalComponent;