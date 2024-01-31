import React from 'react'
import styles from '../../styles/Post.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar'

const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        image,
        updated_at,
        postPage,
      } = props;

    // get current user
    const currentUser = useCurrentUser();

    // check if post belong to current user
    const is_owner = currentUser?.username === owner
  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className='align-items-center justify-content-between'>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />{owner}
          </Link>
          <div className='d-flex align-items-center'>
            <span>{updated_at}</span>
            {/* as we want to show edit, delete options to owner only we need to check if its owner and postPage prop exits as true */}
            {is_owner && postPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {/* we'll check if title and content props have been passed before render respective bootstarp components */}
        {title && <Card.Title className='text-center'>{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {
            is_owner ? (
              <OverlayTrigger placement='top' overlay={<Tooltip>You can't like your own post!</Tooltip>}>
                <i className='far fa-heart' />
              </OverlayTrigger>
            ) : /*now  ternery will check like_id exists if it does user had already liked the post*/ like_id ? (
              <span onClick={()=>{}}>
                <i className={`fas fa-heart ${styles.Heart}`} />
              </span>
            ) : /*check user is logged in if they are give them ability to like the post*/ currentUser ?(
              <span onClick={()=>{}}>
                <i className={`far fa-heart ${styles.Heart.Outline}`} />
              </span>
            ) : /* final part if user not logged in*/ (
              <OverlayTrigger placement='top' overlay={<Tooltip>Log in to like posts!</Tooltip>}>
                <i className='far fa-heart' />
              </OverlayTrigger>
            )
          }
          {/* display likes count */}
          {likes_count}
          {/* display comments link */}
          <Link to={`/posts/${id}`}>
            <i className='far fa-comments'/>
          </Link>
          {/* display comments count */}
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  )
}

export default Post