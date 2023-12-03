import { Link } from 'react-router-dom'

const Missing = () => {
    return (
        <main className='Missing'>
            <h2>Page not found!</h2>
            <p>
              Try going back to the <Link to="/">homepage</Link>
            </p>
        </main>
    )
}

export default Missing