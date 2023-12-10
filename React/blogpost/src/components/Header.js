import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa'
import useWindowSize from '../hooks/useWindowSize';

const Header = ({ title }) => {
    const { width } = useWindowSize()
    
    return (
        <header className="Header">
            <h1>{ title }</h1>
            { width > 768 ? <FaLaptop /> : width > 576 ? <FaTabletAlt /> : <FaMobileAlt />}
        </header>
    )
}

export default Header