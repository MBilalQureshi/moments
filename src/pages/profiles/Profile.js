import React from 'react'
import styles from '../../styles/Profile.module.css'
import btnStyles from '../../styles/Button.module.css'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import { Link } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import Button from 'react-bootstrap/Button'
import { useSetProfileData } from '../../contexts/ProfileDataContext'

const Profile = (props) => {
    const {profile, mobile, imageSize=55} = props
    // now destructure data from profile
    const {id, following_id, image, owner} = profile

    // is current user is owner of profile
    const currentUser = useCurrentUser()
    const is_owner = currentUser?.username === owner

    //well also import handleFollow function as well from userProfileData to hande follow
    const {handleFollow, handleUnfollow} = useSetProfileData()

  return (
    <div className={`my-3 d-flex align-items-center ${mobile && "flex-coloumn"}`}>
        <div>
            <Link to={`/profiles/${id}`} className='align-self-center'>
                <Avatar src={image} height={imageSize} />
            </Link>
        </div>
        {/* profile owner */}
        <div className={`mx-2 ${styles.WordBreak}`}>
            <strong>
                {owner}
            </strong>
        </div>

        <div className={`text-right ${!mobile && 'ml-auto'}`}>
            {/* ternary conditions + logical operators combined */}
            {/* We are only going to show our follow/unfollow  buttons in the desktop version of the  
                PopularProfiles component. We also only want to  show these buttons to users who are logged in.  
                Finally, we don’t want to show a follow button to  a user when the profile displayed is their own.
                So let’s add some logic for  these conditions.
                Inside the div, we’ll add the not-mobile condition to check  if we are on desktop, then we’ll check if  
                the currentUser exists so we know our user is  logged in. And finally, we’ll also check if the  
                user is not the owner of the profile because  our users won’t be able to follow themselves.
                Now we know we should display a button to our user  for this profile, but should it be the follow or  
                unfollow button? Well, if the logged in user has  followed the profile, then a following_id prop  
                from our API response won’t be null, so we can use  this in a ternary. If the following_id does exist,  
                we'll display our unfollow button,  auto-importing that from react-bootstrap.  
                And if the following_id doesn’t  exist we’ll show the follow button. */}
            {!mobile && currentUser && !is_owner && (
                following_id ? (
                    <Button className={`${btnStyles.Button} ${btnStyles.BlackOutline}`} onClick={()=>handleUnfollow(profile)}>unfollow</Button>
                ) : (
                    <Button className={`${btnStyles.Button} ${btnStyles.Black}`} onClick={()=>handleFollow(profile)}>follow</Button>
                )
            )}
        </div>
    </div>
  )
}

export default Profile