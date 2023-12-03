import Feed from './Feed'

const Home = ({ posts, fetchError, loading }) => {
    return (
        <main className="Home">
            {loading && <p className='statusMsg'>Loading posts...</p>}
            {fetchError && <p className='statusMsg' style={{color: "red"}} >{fetchError}</p>} 
            {!loading && !fetchError && (posts.length > 0 ? (
                <Feed posts={posts} />
            ) : (
                <p className='statusMsg'>No posts to display</p>
            ))}
        </main>
    )
}

export default Home