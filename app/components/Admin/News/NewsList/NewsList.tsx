import {SerializeFrom} from '@remix-run/node';
import {GetAllPostsType} from '~/service/post.server';
import PostCard from '../NewsCard/NewsCard';
import styles from './styles.module.css';
const NewsList = ({posts}: {posts: SerializeFrom<GetAllPostsType>}) => {
  return (
    <div className={styles.container}>
      {posts.map(post => {
        function prefetch() {
          const img = new Image();
          img.src = post.thumbnail;
        }
        prefetch();
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
};

export default NewsList;
