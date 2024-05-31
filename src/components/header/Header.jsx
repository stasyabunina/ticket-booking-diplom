import './Header.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isHomePage = pathname === '/';

    const scrollToEl = (e) => {
        e.preventDefault();
        !isHomePage && navigate('/');
        const hashLink = e.target.getAttribute('href').slice(1);
        isHomePage && window.scrollTo({
            top: document.querySelector(hashLink).offsetTop,
            behavior: 'smooth',
        });
    }

    return (
        <header className='header'>
            <div className='header__logo-wrapper'>
                <div className='container'>
                    <a href='/' className='header__logo'>Лого</a>
                </div>
            </div>
            <nav className='header__nav'>
                <div className='container'>
                    <ul className='header__nav-list'>
                        <li className='header__nav-item'>
                            <NavLink to='#about' className='header__nav-link' onClick={scrollToEl}>О нас</NavLink>
                        </li>
                        <li className='header__nav-item'>
                            <NavLink to='#process' className='header__nav-link' onClick={scrollToEl}>Как это работает</NavLink>
                        </li>
                        <li className='header__nav-item'>
                            <NavLink to='#reviews' className='header__nav-link' onClick={scrollToEl}>Отзывы</NavLink>
                        </li>
                        <li className='header__nav-item'>
                            <NavLink to='#contacts' className='header__nav-link' onClick={scrollToEl}>Контакты</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header >
    )
}

export default Header;