import React, { Component } from 'react';
import { AsyncStorage,ScrollView } from 'react-native';
import styles from './styles';

import { URL_SERVER } from '../../../src/constantes';
import { Actions } from 'react-native-router-flux';
import { Container,Content, Button, Text, Header,Item,Icon,Input,Segment,Spinner,Toast, Title, Body, Left, Right } from "native-base";
 
class Home extends Component {
	constructor(props) { 
		super(props);
		this.state = {
            isLoading: false, 
            arrayFechas:[]
		};
    }

    componentWillMount() {
        this.setState({
			isLoading: true,
        })
        
        AsyncStorage.getItem("usuario")
                    .then(req => JSON.parse(req))
                    .then(json => {
                        if (json === null){
                            Toast.show({
                                text: "Inicie sesión nuevamente para sincronizar los datos",
                                buttonText: "Aceptar",
                                type: "danger",
                                duration: 3000
                            }) 
                        }else{
                           

                            let formdata = new FormData();
                            formdata.append("username", json.username)
                            formdata.append("password", json.password)
                            const param = {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                                body: formdata,
                            }
                            console.log("Enviando a Servidor...", param)
                            fetch(URL_SERVER + '/ws_ponencias/', param)
                            .then((response) => { return response.json() })
                            .then((responseData) => {
                                console.log(responseData)
                                this.setState({
                                    isLoading: false,
                                })
                                if(responseData.respuesta=='ok'){
 
                                    this.setState({
                                        arrayFechas: responseData.detalle,
                                    })
                                }else{
                                    Toast.show({
                                        text: responseData.detalle,
                                        buttonText: "Aceptar",
                                        type: "danger",
                                        duration: 3000
                                    })
                                }
                                
                               
                            }).catch((error) => {
                                Toast.show({
                                    text: error,
                                    buttonText: "Aceptar",
                                    type: "danger",
                                    duration: 3000
                                })
                    
                                this.setState({
                                    isLoading: false,
                                })
                            });


                        }

                    })


      

    }
    

	render() {
        const { isLoading,arrayFechas } = this.state;
		return (
			<Container>
                
				<Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Buscar ponencias" />
                         
                        <Button transparent>
                            <Text>Buscar</Text>
                        </Button>
                    </Item>
                   
                </Header>
                
                {isLoading && (
                <Content> 
                    <Spinner color='#267093' /> 
                </Content>
                )}
               
                {!isLoading && ( 
                    <Header>
                        <ScrollView horizontal={true}>
                            <Segment>

                                {arrayFechas.map((f, index) => {
                                    return index!=0?(
                                            <Button>
                                                <Text>{f.fecha}</Text>
                                            </Button>
                                        ):(
                                            <Button active>
                                                <Text>{f.fecha}</Text>
                                            </Button>
                                        );
                                })}
            
                            </Segment> 
                        </ScrollView>
                        
                    </Header>
                )}
                
                {!isLoading && (
                <Content padder >
                    <Text>Awesome segment</Text>
                </Content>

                )}
					  
			</Container>
		);
	}
}

export default Home;
