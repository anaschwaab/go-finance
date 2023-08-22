import { Form, Formik } from 'formik';
import './Login.css';
import { LogoContainer } from '../LogoContainer/LogoContainer';
import { Input } from '../Input/Input';
import emailIcon from '../../assets/email_icon.svg';
import senhaIcon from '../../assets/password_icon.svg';
import { Button } from '../Button/Button';
import axios from 'axios';
import * as yup from 'yup';

export interface PropsLogin {
    email: string,
    senha: string
}

async function handleSubmit(data: PropsLogin) {

    try {
        const response = await axios.post(`http://academy-react.rarolabs.com.br/v1/auth/login`, {
            email: data.email,
            password: data.senha
        });
        
        const { id, token } = response.data;

        const userResponse = await axios.get(`http://academy-react.rarolabs.com.br/v1/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const usuario = userResponse.data;

        localStorage.setItem('usuario', JSON.stringify(usuario));

    } catch (error) {
        console.error(error);
    }
}

const usuarioSchema = yup.object().shape({
    email: yup.string().email('Por favor, digite um e-mail válido').required('Por favor, digite seu e-mail'),
    senha: yup.string().required('Por favor, digite sua senha'),
})

const initialValuesForm = {email: '', senha: ''}

export function Login() {
    return (
        <div className="login-container">
            <LogoContainer />
            <div className="form-conteiner-login">
                <h1 className='form-title'>Login</h1>
                <p className="form-text">Entre ou <strong><a className="form-text-link" href="cadastro.html">faça seu cadastro</a></strong></p>
                <Formik<PropsLogin>
                    initialValues={initialValuesForm}
                    onSubmit={handleSubmit}
                    validationSchema={usuarioSchema}
                    >
                       
                    {({errors, touched}) => (
                        <Form className="form-content">
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='E-mail'
                            imgSrc={emailIcon}
                            erros={touched.email && errors.email}
                        >
                        </Input>
                        <Input
                            id='senha'
                            name='senha'
                            type='password'
                            placeholder='Senha'
                            imgSrc={senhaIcon}
                            erros={touched.senha && errors.senha}
                        >
                        </Input>
                        <Button text="Entrar" disabled={false}/>
                        <span className='login-span'>Esqueceu sua senha</span>
                    </Form>
                    )}  
                    
                </Formik>
            </div>
        </div>
    )
}