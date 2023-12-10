import Feed from './Feed'
import { useStoreState } from 'easy-peasy'

const Home = ({ fetchError, loading }) => {
    const searchResults = useStoreState(state => state.searchResults)
    
    return (
        <main className="Home">
            {loading && <p className='statusMsg'>Loading posts...</p>}
            {fetchError && <p className='statusMsg' style={{color: "red"}} >{fetchError}</p>} 
            {!loading && !fetchError && (searchResults.length > 0 ? (
                <Feed posts={searchResults} />
            ) : (
                <p className='statusMsg'>No posts to display</p>
            ))}
        </main>
    )
}

export default Home