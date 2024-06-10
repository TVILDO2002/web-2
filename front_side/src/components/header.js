import { Link } from 'react-router-dom';

function Header(){


    return(
        <header>
            <nav>
                <ul>
                    <li><Link to={'/'}>Movies</Link></li>
                    <li><Link to={'/add'}>Add Movie</Link></li>
                </ul>
            </nav>

        </header>
    )
}

export default Header