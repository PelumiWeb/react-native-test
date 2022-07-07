import {TouchableOpacity, View} from "react-native"
import { VStack, Box, Divider } from 'native-base';
import {useNavigation} from "@react-navigation/native"

const Cards = (props: any) => {
  const navigation = useNavigation()
  
  return (
    <TouchableOpacity
    onPress={() => {
      navigation.navigate("News", {
        data: props.data
      })
    }}
    >
    <View style={{borderBottom: "black", borderBottomWidth: 1, }}>
    <Box border="1" borderRadius="md">
      <VStack space="4" >
        <Box px="4">
          {props.data.title}
        </Box>
        <Box px="4">
          {`${props.data.body.length > 100  ? props.data.body.slice(0, 100): props.data.body}...`}
        </Box>
        <Box px="4" pb="2">
        {props.data.author}
        </Box>
      </VStack>
    </Box>
    </View>
    </TouchableOpacity>
  );
}

export default Cards