import { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: true,
        loading: false,
        error: false
    }

    componentDidMount(){
        console.log(this.props)
        axios.get('https://react-my-burger-bb362.firebaseio.com/ingredients.json')
            .then(response => this.setState({ingredients: response.data}, this.updatePurchasable))
            .catch(e=> this.setState({error: true}))
    }

    updatePurchasable = () => {
        let sum = Object.values(this.state.ingredients).reduce((acc, el) => (acc+el),0)

        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        let updatedCount = this.state.ingredients[type] + 1

        let updatedIngredients = {
            ...this.state.ingredients,
            [type]: updatedCount
        }

        let updatedPrice = this.state.totalPrice + INGREDIENT_PRICE[type]

        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice}, this.updatePurchasable)
    }

    removeIngredientHandler = type =>  {
        let updatedCount = this.state.ingredients[type] - 1

        let updatedIngredients = {
            ...this.state.ingredients,
            [type]: updatedCount
        }

        let updatedPrice = this.state.totalPrice - INGREDIENT_PRICE[type]

        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice}, this.updatePurchasable)
    }

    purchasingHandler = () => {
        this.setState({purchasing: false})
    }

    purchasingCancelHandler = () => {
        this.setState({purchasing: true})
    }

    purchasingContinueHandler = () => {
        // this.setState({loading: true})

        const queryParams = []

        for(let i in this.state.ingredients)
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))

        queryParams.push(encodeURIComponent('price') + '=' + encodeURIComponent(this.state.totalPrice))

        const queryString = queryParams.join('&')

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    renderOrderSummary = () => {
        let orderSummary = null

        if (this.state.loading)
            orderSummary = <Spinner />

        else if (this.state.ingredients)
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCanceled={this.purchasingCancelHandler}
                    purchaseContinue={this.purchasingContinueHandler}
                />
            )

        return orderSummary
    }

    renderBurger = () => {
        let burger = null

        if (this.state.error)
            burger = <p style={{textAlign: 'center'}}>Ingredients can't be loaded!</p>

        else if (this.state.ingredients) {
            const disabledInfo = {...this.state.ingredients}

            for(let key in disabledInfo)
                disabledInfo[key] = disabledInfo[key] <= 0
            
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        togglePurchasing={this.purchasingHandler}
                    />
                </>
            )
        }
        else
            burger = <Spinner />

        return burger
    }

    render() {
        return (
            <>
                <Modal show={!this.state.purchasing} modalClosed={this.purchasingCancelHandler}>
                    {this.renderOrderSummary()}
                </Modal>
                {this.renderBurger()}
            </>
        )
    }
}

export default BurgerBuilder