import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function PostsPage({message, filter = ""}) {
    // Seeting fetched post
    const [posts, setPosts] = useState({
        results: []
    })
    // check if all data is loaded
    const [hasLoaded, setHasLoaded] = useState(false)
    // load posts again when user clicks home, feed , liked pages. to detect change we'll use useLoaction router hook that returns data where user is currently on
    const { pathname } = useLocation()

    useEffect(()=>{
        const fetchPosts = async () => {
            try{
                const {data} = await axiosReq.get(`/posts/${filter}`)
                setPosts(data)
                setHasLoaded(true)
            }catch(err){
                console.log(err)
            }
        }

        setHasLoaded(false)
        fetchPosts()
        // we'll run this every time pathname or filter changes, also we'll set has Loaded to false as well so that loading spinner is shown to our users
    },[filter, pathname])


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {hasLoaded ? (
            <>
                {posts.results.length ? (
                    console.log('map over post and render each one')
                ) : (
                    console.log('show no results assets')
                )}
            </>
        ) : (
            console.log('show loading spinner')
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PostsPage;