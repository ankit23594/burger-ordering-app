import './Input.css'

const Input = props => {
    let inputElement = null

    const inputClasses = ['InputElement']

    if(props.touched && !props.valid)
        inputClasses.push('Invalid')

    switch(props.type) {
        case 'input':
            inputElement = <input className={inputClasses.join(' ')} {...props.config} />
        break

        case 'textarea':
            inputElement = <textarea className={inputClasses.join(' ')} {...props.config} />
        break

        case 'select':
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    {...props.config}
                >
                    {props.config.options.map(item => {
                        return <option key={item.value} value={item.value}>{item.text}</option>
                    })}
                </select>
            )
        break

        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.config} />
    }

    return (
        <div className='Input'>
            {inputElement}
        </div>
    )
}

export default Input