import {Profiler} from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import './Burger.css'

const Burger = props => {
    let transformedIngredients = null
    transformedIngredients = props.ingredients && Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey+i} type={igKey} />
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el) 
    }, [])

    if(!transformedIngredients || transformedIngredients.length === 0)
        transformedIngredients  =  <p>Please start adding ingredients</p>

    let callbackFn = (id, phase, actualTime, baseTime, startTime, commitTime) => {
        console.log('AAA', id)
        console.log('BBB', phase)
        console.log('actualTime', actualTime)
        console.log('baseTime', baseTime)
        console.log('EEE', startTime)
        console.log('FFF', commitTime)
    }

    return (
        <div className='Burger'>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}

export default Burger