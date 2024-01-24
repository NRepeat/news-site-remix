import { SerializeFrom } from "@remix-run/node"
import { Link } from "@remix-run/react"
import { PostWithTags } from "~/service/post.server"

const Posts = ({ posts }: { posts: SerializeFrom<PostWithTags[]> }) => {
	return (
		<main>
			<div>
				<p>Posts</p>
				<button>Add new post </button>
			</div>
			<div>
				<p>All ()</p>
				<div>
					<input type="search" />
					<button type="submit">Search</button>
				</div>
			</div>
			<table>
				{posts.map(post => <Link to={`/admin/posts/post/${post.id}/edit`} key={post.id}>{post.title}</Link>)
				}
			</table>
		</main>
	)
}

export default Posts