import './Logo.css'
import burgerLogo from '../../assets/images/burger-logo.png'

const Logo = props => {
    return (
        <div className='Logo'>
            <img alt='MyBurger' src={burgerLogo} />
        </div>
    )
}

export default Logo