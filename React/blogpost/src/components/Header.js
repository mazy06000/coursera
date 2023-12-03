import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa'

const Header = ({ title, width }) => {
    return (
        <header className="Header">
            <h1>{ title }</h1>
            { width > 768 ? <FaLaptop /> : width > 576 ? <FaTabletAlt /> : <FaMobileAlt />}
        </header>
    )
}

export default Header