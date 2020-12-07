import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../../Navigation/NavigationsItems/NavigationItems'

const Toolbar = props => {
    return (
        <div className='Toolbar'>
            <div>MENU</div>
            <Logo/>
            <NavigationItems />
        </div>
    )
}

export default Toolbar