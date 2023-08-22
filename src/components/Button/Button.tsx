import './Button.css';

interface ButtonProps {
    disabled: boolean,
    text: string
}

export function Button({ disabled, text }: ButtonProps) {
    return(
        <button type="submit" className='button-form' disabled={disabled}>
            {text}
        </button>
    )
}