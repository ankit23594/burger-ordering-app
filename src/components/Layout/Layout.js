import Aux from '../../hoc/Aux'
import './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

const Layout = props => {
    return (
        <>
            <Toolbar />
            <main className="Content">
                {props.children}
            </main>
        </>
    )
}

export default Layout