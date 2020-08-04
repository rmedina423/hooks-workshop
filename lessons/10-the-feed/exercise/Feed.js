import React, {useState, useEffect} from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

function Feed() {
  const [limit, setLimit] = useState(3);
  const [posts, setPosts] = useState([])
  const [newPosts, setNewPosts] = useState([])
  const [timestamp, setTimestamp] = useState(Date.now())
  
  useEffect(() => {
    let isCurrent = true

    loadFeedPosts(timestamp, limit).then(posts => {
      if (isCurrent) {
        setPosts(posts)
      }
    })

    return () => {
      isCurrent = false
    }
  }, [timestamp, limit])

  useEffect(() => {
    return subscribeToNewFeedPosts(timestamp, newPosts => {
      setNewPosts(newPosts)
    })
  }, [timestamp])

  return (
    <div className="Feed">
      {newPosts.length > 0 && (
        <div className="Feed_button_wrapper">
          <button
            onClick={() => {
              // setNewPosts
              // setPosts(newPosts.concat(posts))
              setLimit(newPosts.length + limit)
              setTimestamp(Date.now())
            }}
            className="Feed_new_posts_button icon_button"
          >
            View {newPosts.length} New Posts
          </button>
        </div>
      )}

      {posts.map(post => <FeedPost key={post.id} post={post} />)}

      <div className="Feed_button_wrapper">
        <button onClick={() => setLimit(limit + 3)} className="Feed_new_posts_button icon_button">View More</button>
      </div>
    </div>
  )
}

// you can delete this
// const fakePost = {
//   createdAt: Date.now() - 10000,
//   date: "2019-03-30",
//   message: "Went for a run",
//   minutes: 45,
//   uid: "0BrC0fB6r2Rb5MNxyQxu5EnYacf2"
// }

