import './BuildControl.css';

const BuildControl = props => {
    return (
        <div className='BuildControl'>
            <div className='Label'>{props.label}</div>
            <button
                className='button Less'
                onClick={props.removed}
                disabled={props.disabled}
            >
                Less
            </button>
            <button
                className='button More'
                onClick={props.added}>
                More
            </button>
        </div>
    )
}

export default BuildControl