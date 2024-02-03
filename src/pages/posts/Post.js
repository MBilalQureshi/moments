import React from 'react'
import styles from '../../styles/Post.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Card, Media, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '../../components/Avatar'
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/Moredropdown';

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

        setPosts,
      } = props;

    // get current user
    const currentUser = useCurrentUser();

    // check if post belong to current user
    const is_owner = currentUser?.username === owner

    // use history to rediredct user to edit their post
    const history = useHistory()
    const handleEdit = () => {
      history.push(`/posts/${id}/edit`)
    }

    const handleLike = async () => {
      try{
        // At the moment we’re just reaching out for a single post for our Post page, however,
        // our Post component will also live in pages where we’ll display multiple posts one after another.
        // So eventually this function will have to handle checking if it has
        // the right post id before applying the like to it.

        // Now, using setPosts, we’ll pass it a function with the prevPosts argument.
        // Inside we’ll spread the previousPosts in the object and update the results array only.
        // We’ll map over it, and inside, we’ll use a ternary to check if post id matches the
        // id of the post that was liked. If it does match, we’ll return the post object with
        // the likes count incremented by one, and the like_id set to the id of the response data.
        // If the id doesn’t match, we’ll just return the post and we won’t do anything with it
        // so that our map can move on to the next post in the prevPosts results array.
        const { data } = await axiosRes.post('/likes/', { post :id })
        setPosts((prevPosts) =>({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id} : post;
          })
        }))
      }catch(err){
        console.log(err)
      }
    }
    
    const handleUnlike = async () => {
      try {
        await axiosRes.delete(`/likes/${like_id}`)
        setPosts((prevPosts) => ({
          ...prevPosts,
          results: prevPosts.results.map((post) => {
            return post.id === id
              ? { ...post, likes_count: post.likes_count - 1, like_id: null }
              : post;
          }),
        }));
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleDelete = async () => {
      try{
        await axiosRes.delete(`/posts/${id}/`)
        history.goBack()
      }catch(err){
        console.log(err)
      }
    }

//Conditional (ternary) operator chaining: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator#conditional_chains
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
            {is_owner && postPage && <MoreDropdown handleEdit={handleEdit} handleDelete={handleDelete} />}
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
              <span onClick={handleUnlike}>
                <i className={`fas fa-heart ${styles.Heart}`} />
              </span>
            ) : /*check user is logged in if they are give them ability to like the post*/ currentUser ?(
              <span onClick={handleLike}>
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