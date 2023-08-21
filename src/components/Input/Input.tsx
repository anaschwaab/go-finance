import { Field } from 'formik';
import './Input.css';
import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    imgSrc: string,
    erros?: string | false | undefined,
}

export function Input({imgSrc, erros, ...props}: InputProps) {
    return (
            <div className='container-input'>
                <label className="label-input">
                <img src={imgSrc}/>
                <Field className="label-field"{...props}/>
            </label>
            <span className="label-span">{erros}</span>
            </div>
    )
}