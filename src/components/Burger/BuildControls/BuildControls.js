import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {type: 'salad', label: 'Salad'},
    {type: 'bacon', label: 'Bacon'},
    {type: 'cheese', label: 'Cheese'},
    {type: 'meat', label: 'Meat'}
]

const BuildControls = props => {
    return (
        <div className='BuildControls'>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl  => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
            <button className='OrderButton' disabled={!props.purchasable} onClick={props.togglePurchasing}>ORDER NOW</button>
        </div>
    )
}

export default BuildControls