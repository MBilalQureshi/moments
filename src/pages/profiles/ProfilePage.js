import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Post from "../posts/Post";
import NoResults from "../../assets/no-results.png";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const [profilePosts, setProfilePosts] = useState({
    results : []
  })

  // fetch which profile to display id from url
  const {id} = useParams();

  // we need to destructure the below hook and also add handlfollow function
  const {setProfileData, handleFollow, handleUnfollow} = useSetProfileData();

  // once we did our API request now lest render data in browser
  const {pageProfile} = useProfileData()
  //line 26 in ProfileDataContext.js pageProfile : { results: [] }, this will get data from line pageProfile : {results : [pageProfile]} back
  const [profile] = pageProfile.results;
  //console.log(pageProfile.results)    contsians profile data

  //Now to have user follow other
  const is_owner = currentUser?.username === profile?.owner

  // fetch profile data
  useEffect(() => {
    const fetchData = async () => {
        try{
            const [{data : pageProfile},{data : profilePosts}] = await Promise.all([
              axiosReq.get(`/profiles/${id}`),
              axiosReq.get(`/posts/?owner__profile=${id}`)    
          ])
            // setProfileData is part of ProfileDataContext.js
            setProfileData(prevState => ({
                ...prevState,
                pageProfile : {results : [pageProfile]}
            }))
            setProfilePosts(profilePosts)
            setHasLoaded(true);
        }catch(err){
            console.log(err)
        }
    }
    fetchData()
  },[id, setProfileData])

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image className={styles.ProfileImage}
           roundedCircle
        //    below JSX is try to render image before API response causing bug 
        //    src={profile.image} />
        // Apply conditional chaining ?. to prevent this below is solution
        src={profile?.image} />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
                <div>
                    {profile?.posts_count}
                </div>
                <div>posts</div>
            </Col>
            <Col xs={3} className="my-2">
                <div>
                    {profile?.follower_count}
                </div>
                <div>followers</div>
            </Col>
            <Col xs={3} className="my-2">
                <div>
                    {profile?.following_count}
                </div>
                <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
        {currentUser && !is_owner && 
            (profile?.following_id ? (
                <Button className={`${btnStyles.Button} ${btnStyles.BlackOutline}`} onClick={()=>handleUnfollow(profile)}>unfollow</Button>
            ) : (
                <Button className={`${btnStyles.Button} ${btnStyles.Black}`} onClick={()=>handleFollow(profile)}>follow</Button>
            )
        )}
        </Col>
        {profile?.content && <Col className="p-3">{profile?.content}</Col>}
      </Row>
    </>
  );

  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll 
          children={
            /*a. Did you set a "children" prop, did you map over the profilePosts.results array and for each 
              "post" in the array, return a Post component? Did you add a "key" prop, a "setPosts" prop and spread in the 
              rest of the props from the "post" you are currently iterating over?
              b. Did you add a "dataLength" prop passing the value of the length of the results array from ProfilePosts?
              c. Did you add a "loader" prop, giving it the value of an Asset component with a prop of "spinner"?
              d. Did you add a "hasMore" prop, setting the value as the profilePosts.next boolean?
              e. Did you add a "next" prop, did you set it's value to an anonymous arrow function that calls the fetchMoreData function?
              f. Did you pass the arguments profilePost and setProfilePosts to the fetchMoreData function?*/
            profilePosts.results.map(post => (
              <Post key={post.id} {...post} setPosts={setProfilePosts}/>
            ))
          }
          dataLength={profilePosts.results.length}
          loader={ <Asset spinner/>}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts,setProfilePosts)}          
        />
      ) : (
      //4. Did you add a "src" prop to the Asset component and give it the value of "NoResults" (hint: the imported graphic)? e.g
      <Asset src={NoResults} message={`No results found, ${profile?.owner} hasn't posted yet.`}/>
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <PopularProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;