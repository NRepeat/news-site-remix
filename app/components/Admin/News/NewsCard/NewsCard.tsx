import {SerializeFrom} from '@remix-run/node';
import {Link} from '@remix-run/react';
import {FaEdit} from 'react-icons/fa';
import {PostWithTags} from '~/service/post.server';
import styles from './styles.module.css';

function extractImageUrls(content: string) {
  const regex = /<img.*?src=["'](.*?)["']/g;
  const imageUrls = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    imageUrls.push(match[1]);
  }

  return imageUrls;
}

function prefetch(content: string) {
  const parsedContent = JSON.parse(content);
  const imgS = extractImageUrls(parsedContent);
  const img = new Image();
  for (const src of imgS) {
    img.src = src;
  }
}

const NewsCard = ({post}: {post: SerializeFrom<PostWithTags>}) => {
  const data = new Date(post.createdAt)
    .toISOString()
    .split('T')[0]
    .replace(/-/g, '/');
  return (
    <Link
      prefetch="intent"
      onMouseEnter={() => prefetch(post.content)}
      to={`/admin/news/${post.id}/edit`}
      className={styles.container}
    >
      <div className={styles.tags}>
        {post.tags.map(tag => (
          <Link to={'/admin'} key={tag.id}>
            {tag.name}
          </Link>
        ))}
      </div>
      {/* <img className={styles.thumbnail} src={post.thumbnail} alt={post.title} /> */}
      <img
        className={styles.thumbnail}
        src={'/uploads/1.jpg'}
        alt={post.title}
      />
      <div className={styles.info}>
        <p className={styles.data}>{data}</p>
        <p className={styles.title}>{post.title}</p>
        <p className={styles.description}>{post.description}</p>
        <Link className={styles.edit} to={`/admin/news/${post.id}/edit`}>
          {' '}
          Edit <FaEdit />
        </Link>
      </div>
    </Link>
  );
};

export default NewsCard;
