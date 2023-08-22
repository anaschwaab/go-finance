import { Form, Formik, Field } from 'formik';
import { LogoContainer } from '../LogoContainer/LogoContainer';
import emailIcon from '../../assets/email_icon.svg';
import senhaIcon from '../../assets/password_icon.svg';
import userIcon from '../../assets/user_icon.svg';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { PropsLogin } from '../Login/Login';
import './Cadastro.css';
import { useState } from 'react';
import axios from "axios";
import * as yup from 'yup';

interface PropsCadastro extends PropsLogin {
    nomeSobrenome: string,
    confirmaSenha: string,
    aceiteTermos: boolean,
}

async function handleSubmit(data: PropsCadastro) {
    try {
        const response = await axios.post(`http://academy-react.rarolabs.com.br/v1/users`, {
            name: data.nomeSobrenome,
            email: data.email,
            password: data.senha,
            password_confirmation: data.confirmaSenha
        });

        console.log(`Usuário registrado: ${response.data}`)
    } catch (error) {
        console.error(error);
    }
}


const usuarioSchema = yup.object().shape({
    nomeSobrenome: yup.string().required('Por favor, digite seu nome completo').test(
        'testa-nome-sobrenome',
        'Por favor, digite seu nome e sobrenome',
        (value) => {
            const nomeSobrenome = value.split(' ').filter((nomeSobrenome) => nomeSobrenome.trim() != '');
            return nomeSobrenome.length >= 2
        }),
    email: yup.string().email('Por favor, digite um e-mail válido').required('Por favor, digite seu e-mail'),
    senha: yup.string().min(8, 'A senha deve ter no mínimo 8 caracteres').required('Por favor, digite uma senha')
        .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
        .matches(/\W+/gm, 'A senha deve conter pelo menos um carácter especial'),
    confirmaSenha: yup.string().test(
        'testa-senhas-iguais',
        'Por favor, verifique sua senha',
        (value, context) => {
            return value === context.parent.senha
        }
    ).required('Por favor, confirme sua senha'),
    aceiteTermos: yup.bool().oneOf([true], 'É necessário aceitar os termos para cadastrar'),
});

const initialValuesForm = {
    nomeSobrenome: '',
    email: '',
    senha: '',
    confirmaSenha: '',
    aceiteTermos: false
}


export function Cadastro() {
    const [aceiteTermos, setAceiteTermos] = useState(false);
    return (
        <div className="login-container">
            <LogoContainer />
            <div className="form-container">
                <h1 className='form-title'>Cadastro</h1>
                <p className="form-text">para iniciar</p>
                <Formik<PropsCadastro>
                    initialValues={initialValuesForm}
                    onSubmit={handleSubmit}
                    validationSchema={usuarioSchema}
                >

                    {({ setFieldValue, errors, touched, isValid, isSubmitting, dirty }) => (

                        <Form className="form-content">
                            <Input
                                id='nomeSobrenome'
                                name='nomeSobrenome'
                                type='text'
                                placeholder='Nome e Sobrenome'
                                imgSrc={userIcon}
                                erros={touched.nomeSobrenome && errors.nomeSobrenome}
                            />
                            <Input
                                id='email'
                                name='email'
                                type='email'
                                placeholder='E-mail'
                                imgSrc={emailIcon}
                                erros={touched.email && errors.email}
                            />
                            <Input
                                id='senha'
                                name='senha'
                                type='password'
                                placeholder='Senha'
                                imgSrc={senhaIcon}
                                erros={touched.senha && errors.senha}
                            />
                            <Input
                                id='confirmaSenha'
                                name='confirmaSenha'
                                type='password'
                                placeholder='Confirma senha'
                                imgSrc={senhaIcon}
                                erros={touched.confirmaSenha && errors.confirmaSenha}
                            />
                            <div className='form-checkbox'>
                                <div className="form-checkbox-input">
                                    <Field
                                        className="checkbox"
                                        id="html"
                                        type="checkbox"
                                        name='aceiteTermos'
                                        checked={aceiteTermos}
                                        onChange={() => {
                                            setFieldValue('aceiteTermos', !aceiteTermos);
                                            setAceiteTermos(!aceiteTermos);
                                        }}
                                    />
                                    <label htmlFor="html">Declaro que li e concordo com os termos e condições de uso.</label>
                                </div>
                                <span className='checkbox-error-message'>{touched.aceiteTermos && errors.aceiteTermos}</span>
                            </div>
                            <Button 
                                disabled={!isValid || isSubmitting || !dirty }
                                text="Cadastrar"
                            /> 
                            <span className="cadastro-span">Voltar</span>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}