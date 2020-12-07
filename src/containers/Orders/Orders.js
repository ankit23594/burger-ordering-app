import { Component } from 'react'
import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true})

        axios.get('orders.json')
            .then(res => {
                const fetchedData = []

                for(let key in res.data)
                    fetchedData.push({
                        ...res.data[key],
                        id: key
                    })

                this.setState({ orders: fetchedData, loading: false})
            })
            .catch(e => this.setState({loading: false}))
    }

    render() {
        const orders = this.state.loading ?
            <Spinner/> : 
            this.state.orders.map(order => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        totalPrice={order.price}
                    />
                )
            })

        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)