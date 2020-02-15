// @ts-ignore
import React from "react";
// @ts-ignore
import {connect} from 'react-redux';
import {Alert,Jumbotron,Container,Row,Col,Button, Form,Spinner} from 'react-bootstrap'
import {getCityWeatherInfo} from '../Actions/action';
import WeatherInfo from './weatherInfo';


export interface City { id?: string; name?: string; displayName?:string }

let p:any;

export const LandingPage = (props: any) =>{

    const {loading,cities,cityWI,error} = props.data
    return(
        <Jumbotron>
            <Container>
                <Row>
                    <Col>
                        <h3>Select City to see weather information</h3>
                    </Col>
                </Row>
                <br/> 
                <Row>
                    <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select" onChange={e => p=e.target}>
                            {
                                cities.map( (city:City)=>(
                                    <option value = {city.name} key = {city.id}>
                                    {city.displayName}
                                    </option>
                                ))
                            }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        {!loading?
                        <Button variant="dark" onClick={()=>props.search(p? p.value: cities[0].name)}>Search</Button> :
                        <Button variant="dark" disabled>
                            <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />
                            Loading...
                        </Button>
                        }
                    </Col>
                </Row>
                
            </Container>
            <Container>
                    {error ? <Alert variant="danger">
                           Error occured! please try again!!
                        </Alert> : null}
                    {cityWI ? 
                        <WeatherInfo data={cityWI}></WeatherInfo>
                    : null}
              
            </Container>
         </Jumbotron>
        
    )
}

const mapStateToProps = (state:any) =>{
    return {
        data : state.w_data
    }
}
const mapActionToProps = (dispatch:any) => {
    return {
        search: (city:any)=> dispatch(getCityWeatherInfo(city))
    }
}

export default connect(mapStateToProps, mapActionToProps)(LandingPage);