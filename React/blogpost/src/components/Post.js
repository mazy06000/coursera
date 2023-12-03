import { Link } from 'react-router-dom'

const Post = ({ post }) => {
    return (
        <article className="post">
            <Link to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
                <p className='postDate'>{post.datetime}</p>
            </Link>
            <p className='postBody'>{
                post.body.length > 25 ? (
                    post.body.substring(0, 25) + '...'
                ) : (
                    post.body
                )
            }</p>
        </article>
    )
}

export default Post