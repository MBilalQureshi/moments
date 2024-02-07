import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";

import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

function PostPage() {
    // useParams will fetch id from URL and the paramter we set in route inside app.js
    const { id } = useParams();
    const [post, setPost] = useState({
        // we are setting it to array so that if we have one post or multiple the data type would be same
        results : [],
    })

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

    useEffect(()=>{
        const handleMount = async () => {
            try{
                // we will be making two requests 1. posts 2. comments ...right now just posts. SO in advance we'll handle it like below

                // destructing data property returned from API and renaming it to post....LATER SAME WILL BE DONE TO COMMENTS
                // destructing like [{data: post}] is new and gives our variable more meaningful name

                //What Promise.all does is it accepts an array of  promises and gets resolved when all the promises  
                // get resolved, returning an array of data.([{data: post}]=>array of resolved data ,[axiosReq.get(`/posts/${id}`)]=> array of promises) 
                // If any of the promises in the array fail,  
                // Promise.all gets rejected with an error.
                // In our case the data returned  is the post we requested.
                // The reason we’re using Promise.all here  is that in a later video we’ll add a  
                // second API request inside it, to fetch  data about the post comments.
                const [{data: post}, {data: comments}] = await Promise.all([
                  axiosReq.get(`/posts/${id}`),
                  axiosReq.get(`/comments/?posts=${id}`)
                ])
                setPost({results: [post]})
                setComments(comments)

                // detched data can be see n in console.log
                // console.log(post)
            } catch(err){
                console.log(err)
            }
        }
        // now lets call handleMount and call it every time id in URL changes
        handleMount()
    },[id])

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <PopularProfiles mobile />
        <Post {...post.results[0]} /*<- key value pairs are passed in as props */ setPosts={setPost} /*<- use it later to handle likes*/ postPage /*<- we don;t need value for it simply applying means it'll retun as truthy value*//>
        <Container className={appStyles.Content}>
          {currentUser ? (
          <CommentCreateForm
          profile_id={currentUser.profile_id}
          profileImage={profile_image}
          post={id}
          setPost={setPost}
          setComments={setComments}
        />
        ) : comments.results.length ? (
          "Comments"
        ) : null}

          {comments.results.length ? (
            // Add infinite scroll for comments here
            <InfiniteScroll 
              children = {
                comments.results.map(comment => (
                  <Comment key={comment.id} {...comment} setPost={setPost} setComments={setComments}/>
                ))
              }
              //Set the dataLength of the InfiniteScroll component to the length of the comments results array
              dataLength={comments.results.length}
              //Set the loader prop to the Asset component, passing the Asset component a spinner prop
              loader={<Asset spinner/>}
              // Set the hasMore prop to the correct boolean value, based on if the comments object contains a next value or not
              hasMore={!!comments.next}
              // Set the next prop to an arrow function that calls the fetchMoreData function we built in the utils file.
              next={()=>fetchMoreData(comments,setComments)}
            />
              
            ): /*if no commnets check crrent user logged in, if so encourge them to comment*/ currentUser ? (
              <span>No comments yet, add comment</span>
            ) : (
              <span>No comments yet</span>
            )
          }

        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
      <PopularProfiles />
      </Col>
    </Row>
  );
}

export default PostPage;