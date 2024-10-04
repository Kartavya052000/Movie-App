import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
    Button,
  ButtonIcon,
  ButtonText,
  FormControl,
  FormControlLabelText,
  HStack,
  Icon,
  Input,
  InputField,
  InputIcon,
  VStack,
} from "@gluestack-ui/themed";
import { SearchIcon } from "@gluestack-ui/themed";

export default function Form(props) {
    const { onInputChange,onSubmit,value} =props;
  return (
    <VStack space={2} width="100%" p={5} mt={2}>
      <FormControl isRequired>
        <FormControl.Label fontSize="sm">
          <FormControlLabelText>Search Movie/TV Show Name</FormControlLabelText>
        </FormControl.Label>
        <HStack width='100%' space={2}>
            <Input
            mr={10}
            px={5}
            style ={styles.inputStyles}
            bg="#D9D9D9"
            >
         <InputIcon>
         <Icon as={SearchIcon} size='sm' />
         </InputIcon>
         <InputField 
         onChangeText={value =>onInputChange(value)}
         placeholder="i.e:James Bond,CSI"
         value={value}
         />
            </Input>
          
          <Button onPress={onSubmit}
            bg="#06b6d4"
            >
            <ButtonIcon as={SearchIcon} mr={12} />
            <ButtonText>Search</ButtonText>
          </Button>
        </HStack>
      </FormControl>
    </VStack>
  );
}
const styles = StyleSheet.create({
    inputStyles:{flex:1,alignItems:'center'}
})