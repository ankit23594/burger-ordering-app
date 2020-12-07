import { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders'

import './ContactData.css'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            email: {
                type: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            street: {
                type: 'textarea',
                config: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            city: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            country: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            zipCode: {
                type: 'input',
                config: {
                    type: 'number',
                    placeholder: 'Zip code'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                touched: false
            },
            deliveryMethod: {
                type: 'select',
                config: {
                    options: [{
                        text: 'Fastest',
                        value: 'fastest'
                    },
                    {
                        text: 'Cheapest',
                        value: 'cheapest'
                    }]
                },
                value: '',
                valid: true,
                validation: {},
                touched: false
            },
        },
        loading: false,
        isFormValid: false
    }

    orderHandler = () => {
        this.setState({loading: true})

        const formData = {}

        for(let key in this.state.orderForm)
            formData[key] = this.state.orderForm[key].value

        const orders = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            orderData : formData
        }

        axios.post('/orders.json', orders)
            .then(response => {
                this.setState({loading: false})
                this.props.history.replace('/')

                console.log(response)
            })
            .catch(err => {
                this.setState({loading: false})
                console.log(err)
            })
    }

    CheckValidity = (rules, value) => {
        let isValid = true

        if(!rules || Object.keys(rules).length === 0)
            return true
        
        if(isValid && rules.required)
            isValid = value.trim() !== ''

        if(isValid && rules.minLength)
            isValid = value.length >= rules.minLength

        if(isValid && rules.maxLength)
            isValid = value.length <= rules.maxLength

        return isValid
    }

    onChangeInputHandler = (event, identifier) => {
        let updatedOrderForm = {...this.state.orderForm}

        let updatedElement = {...updatedOrderForm[identifier]}
        updatedElement.value = event.target.value
        updatedElement.touched = true
        updatedElement.valid = this.CheckValidity(updatedElement.validation, updatedElement.value)

        updatedOrderForm[identifier] = updatedElement

        let isFormValid = true

        for(let element in updatedOrderForm)
            isFormValid = isFormValid && updatedOrderForm[element].valid

        this.setState({orderForm: updatedOrderForm, isFormValid})
    }

    render() {
        const formData = []

        for(let key in this.state.orderForm) {
            formData.push({
                id: key,
                ...this.state.orderForm[key]
            })
        }

        const formElements = formData.map(element => {
            return (
                <Input
                    key={element.id}
                    type={element.type}
                    valid={element.valid}
                    touched={element.touched}
                    config={{
                        ...element.config,
                        value: element.value,               
                        onChange: event => this.onChangeInputHandler(event,element.id)
                    }}
                />
            )
        })

        const form = this.state.loading ?
            <Spinner /> :
            (
                <form>
                    {formElements}
                    <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.isFormValid}>ORDER</Button>
                </form>
            )

        return (
            <div className='ContactData'>
                <h2>Your Contact details</h2>
                {form}
            </div>
        )
    }
}

export default ContactData