import { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{}

export function Button({...props}: ButtonProps) {
    return(
        <button type="submit" className='button-form' {...props}>
            
        </button>
    )
}