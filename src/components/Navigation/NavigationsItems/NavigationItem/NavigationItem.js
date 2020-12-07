import { NavLink } from 'react-router-dom'
import './NavigationItem.css'

const NavigationItem = props => {
    return (
        <li className='NavigationItem'>
            <NavLink
                exact
                to={{
                    pathname: props.link
                }}
            >
                {props.children}
            </NavLink>
        </li>
    )
}

export default NavigationItem