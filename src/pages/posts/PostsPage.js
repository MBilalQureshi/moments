import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/PostsPage.module.css";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import NoResults from '../../assets/no-results.png'
import Asset from "../../components/Asset";

function PostsPage({message, filter = ""}) {
    // Setting fetched post
    const [posts, setPosts] = useState({
        results: []
    })
    // check if all data is loaded
    const [hasLoaded, setHasLoaded] = useState(false)
    // load posts again when user clicks home, feed , liked pages. to detect change we'll use useLoaction router hook that returns data where user is currently on
    const { pathname } = useLocation()

    // query as in search bar
    const [query, setQuery] = useState("")
    useEffect(()=>{
        const fetchPosts = async () => {
            try{
                // const {data} = await axiosReq.get(`/posts/?${filter}`) incorporating search as well below
                const {data} = await axiosReq.get(`/posts/?${filter}search=${query}`);
                setPosts(data)
                setHasLoaded(true)
            }catch(err){
                console.log(err)
            }
        }
        setHasLoaded(false)

        // every key stroke on search is causing search request and it's not good practice apply one sec time out after a key stroke to fetchpost function as good practice
        const timer = setTimeout(()=>{
            fetchPosts();
        },1000)
        return () => {
            clearTimeout();
        }
        // we'll run this every time pathname or filter changes, also we'll set has Loaded to false as well so that loading spinner is shown to our users
        // added query as well so that each time user search a request can be made
    },[filter, pathname, query])


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form className={styles.SearchBar} onSubmit={(event) => event.preventDefault()}>
            <Form.Control type="text" className="mr-sm-2" placeholder="Search posts"
            value={query} onChange={(event) => setQuery(event.target.value)} />
        </Form>
        {hasLoaded ? (
            <>
                {posts.results.length ? (
                    posts.results.map(post => (
                        <Post key={post.id} {...post} setPosts={setPosts}/>
                    ))
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset src={NoResults} message={message}/>
                    </Container>
                )}
            </>
        ) : (
            <Container className={appStyles.Content}>
                <Asset spinner />
            </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default PostsPage;