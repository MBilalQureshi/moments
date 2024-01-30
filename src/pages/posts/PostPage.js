import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function PostPage() {
    // useParams will fetch id from URL and the paramter we set in route inside app.js
    const { id } = useParams();
    const [post, setPost] = useState({
        // we are setting it to array so that if we have one post or multiple the data type would be same
        results : [],
    })

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
                const [{data: post}] = await Promise.all([axiosReq.get(`/posts/${id}`)])
                setPost({results: [post]})
                // detched data can be see n in console.log
                console.log(post)
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
        <p>Popular profiles for mobile</p>
        <p>Post component</p>
        <Container className={appStyles.Content}>
          Comments
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default PostPage;