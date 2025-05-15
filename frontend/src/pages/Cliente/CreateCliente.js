import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native"
import Api from "../services/Api";

export default props => {
    const [name, setName] = useState("");

    const handleCreate = async () =>{
        try{
            const response = await Api.post('/modelCliente', {name});
            if(response.ok){
                Alert.alert("Item inserido com sucesso!");
            }
        }catch(error){
            console.error(error);
        }
    } 

    return(
        <View style={{marginTop: 30}}>
            <Text>Criando item</Text>
            <TextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={{backgroundColor: 'gray'}}
            />
            <Button
                title="Inserir"
                onPress={handleCreate}
            />
            <Text>-----------------------------</Text>
        </View>
    )
}