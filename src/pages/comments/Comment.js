import React, { useState } from 'react'
import styles from '../../styles/Comment.module.css'
import { Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { MoreDropdown } from '../../components/Moredropdown'
import { axiosRes } from '../../api/axiosDefaults'
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
    const {
        content,
        owner,
        profile_id,
        profile_image,
        updated_at,

        id,
        setPost,
        setComments,
    } = props

    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner

    // EDIT COMMENT
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete = async () => {
        
        try{
            /**
             * Inside the try block, we’ll auto-import and use  the axiosRes instance to make a delete request  
            to the /comments/:id endpoint, so we’ll pass  in the id of the comment we want to delete.
            If everything goes well with the request,  we’ll need to update the post results  
            array with our new comments count. Which  function should we use to return an object  
            with the updated post results array?
            If you answered the setPost function, well done!
            Inside the array, we’ll spread the previous  post object and reduce its comments_count by one.
             */
            await axiosRes.delete(`/comments/${id}/`)
            setPost((prevPost)=>({
                results: [
                    {
                        ...prevPost.results[0],
                        comments_count: prevPost.results[0].comments_count -1,
                    },
                ],
            }))
            /**
            With the comments count on the post updated, we  need to remove the deleted comment from our state.  
            Which function would we use for this?
            Yes, setComments it is.
            So, we’ll call the setComments function and return  an object, where we’ll only update the results array.
            We want to remove the comment that matches  our id here. So we’ll call the filter function to  
            loop over the previous comments’ results array.  If the id is for the comment we want to remove,  
            our filter method will not return  it into the updated results array.
            Now that our handleDelete function is complete,  
         */
           setComments((prevComments)=>({
            ...prevComments,
            results: prevComments.results.filter((comment) => comment.id !== id)
           })) 

        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
          <hr />
          <Media>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} />
            </Link>
            <Media.Body className="align-self-center ml-2">
              <span className={styles.Owner}>{owner}</span>
              <span className={styles.Date}>{updated_at}</span>
              {showEditForm ? (
                <CommentEditForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
              ) : (
                <p>{content}</p>
              )}
            </Media.Body>
            {is_owner && !showEditForm && (
              <MoreDropdown
                handleEdit={() => setShowEditForm(true)}
                handleDelete={handleDelete}
              />
            )}
          </Media>
        </>
      );
    }
//   return (
//     <div>
//         <hr />
//         <Media>
//             <Link to={`/profiles/${profile_id}`}>
//                 <Avatar src={profile_image} />
//             </Link>
//             <Media.Body className='align-self-center ml-2'>
//                 <span className={styles.Owner}>
//                     {owner}
//                 </span>
//                 <span className={styles.Date}>
//                     {updated_at}
//                 </span>
//                 <p>
//                     {content}
//                 </p>
//             </Media.Body>
//             {/* if is_owner true we import MoreDropdown */}
//             {is_owner && (
//                 <MoreDropdown handleEdit={()=>{}} handleDelete={handleDelete} />
//             )}
//         </Media>
//     </div>
//   )
// }
export default Comment