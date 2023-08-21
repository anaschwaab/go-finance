import './LogoContainer.css';
import logo from '../../assets/ellipses.svg';

export function LogoContainer(){
    return (
        <section className="logo-container">
            <div className="logo">
                <h1 className="logo-title">GoFinance</h1>
                <p className="logo-text">O empréstimo ponto a ponto mais popular do mundo</p>
                <button className="button-login">Read More</button>
            </div>
            <figure className="logo-figure">
                <img src={logo} alt="figura-logo"/>
            </figure>
        </section>
    )
}