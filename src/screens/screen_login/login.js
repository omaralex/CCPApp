import React, { Component } from 'react';
import { Image, View, StatusBar, ScrollView,AsyncStorage } from 'react-native';
import { Container, Content, Card,	CardItem,	Button, Text, Body, Icon, Item, Input, Form, Toast,Spinner,Label } from 'native-base';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

import { URL_SERVER } from '../../../src/constantes';
import { Actions } from 'react-native-router-flux';
 
const launchscreenBg = require('../../img/background.png'); 
 
class Login extends Component {

	constructor(props) { 
		super(props);
		this.state = {
			showToast: false,
			isLoading: false,
			user:'',
			password:''
		};
    }

    componentWillMount() {
		 
    }
    
    SendAuthentification = ()=>{ 
		this.setState({
			isLoading: true,
		})
		let formdata = new FormData();
		formdata.append("username", this.state.user)
		formdata.append("password", this.state.password)
		const param = {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			body: formdata,
		}
      	console.log("Enviando a Servidor...", param)
      	fetch(URL_SERVER + '/ws_login/', param)
        .then((response) => { return response.json() })
        .then((responseData) => {
			this.setState({
				isLoading: false,
			})

			if(responseData.respuesta=='ok'){
				AsyncStorage.setItem('usuario', JSON.stringify({"username":this.state.user,"password":this.state.password}))
							.then(json => {
								Actions.home()
								console.log('success!')
							})
							.catch(error => 
								Toast.show({
									text: "Error al almacenar los datos",
									buttonText: "Aceptar",
									type: "danger",
									duration: 3000
								})
							); 

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

	render() {
		const { isLoading } = this.state;
		return ( 
			<Container>
				<StatusBar barStyle="light-content" backgroundColor="#125371"/>
				<Image source={launchscreenBg} style={styles.imageContainer}>
				<ScrollView>
				<Content style={styles.containerLogin}>
			          <Card>
			            <CardItem>
			                <Body style={{alignItems: 'center', justifyContent: 'center',}}>
			                	<View style={styles.logoContainer}>
												<Icon ios='ios-pulse' android="md-pulse" style={{fontSize: 60, color: '#267093'}}/>
								 	<Animatable.Text 
								 		animation="pulse" 
								 		iterationCount="infinite" 
								 		style={{ textAlign: 'center', fontSize: 30, }}>Control Asistencia</Animatable.Text>
								 	 
							        <Text note>CCP CUSCO 2018</Text>
						        </View>
			                </Body>
			            </CardItem>
			            <CardItem cardBody>
			              	<Content style={{paddingRight: 10,}}>
					          	<Form>
					            	<Item floatingLabel>
														<Label>Usuario</Label>
					              		<Icon name="md-person" />
					              		<Input onChangeText={(text) => {
                                            	this.setState({ user: text })
                                        	}}/>
					            	</Item>
					            	<Item floatingLabel>
														<Label>Contraseña</Label>
					               		<Icon name="md-lock" />
														<Input 
																secureTextEntry={true} 
																onChangeText={(text) => {
                                            	this.setState({ password: text })
                                        	}}/>
					            	</Item>
					          	</Form>
				          	</Content>
			            </CardItem>
			            <CardItem>
						{isLoading && (
						<Content> 
							<Spinner color='#267093' /> 
						</Content>
						)}
						{!isLoading && (
			            <Content>
							<Button block
								onPress={() => this.SendAuthentification()}  
								style={{ margin: 15, marginTop: 50, backgroundColor:"#267093" }}>
								<Text>Iniciar Sesión</Text>
							</Button>
						</Content>
						)}
			            </CardItem>
			          </Card>
        		</Content>
        		</ScrollView>
        		</Image>
			</Container> 
		);
	}
}
 
export default Login;
