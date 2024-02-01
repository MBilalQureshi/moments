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
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

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
                    // 1. Firstly we’ll set the dataLength prop,  which tells the component how many posts  
                    // are currently being displayed. We’ll  set its value to posts.results.length.

                    // 2. Next we’ll set the loader prop,  and we’ll pass that to our Asset  
                    // component with the spinner prop attached.

                    // 3.  Next, the hasMore prop tells the InfiniteScroll  
                    // component whether there is more data to load on  reaching the bottom of the current page of data.  
                    // Our posts object from the API contains  a key called ‘next’ which is a link to  
                    // the next page of results. If we’re on  the last page, that value will be null.  
                    // So we can use this to determine if  another page of results exists.  
                    // The hasMore prop will only accept a boolean value  of true or false, so we’ll use a clever JavaScript  
                    // logical operator called the double not operator,  sometimes called the double bang because of its  
                    // double exclamation marks. This operator returns  true for truthy values, and false for falsy values.
                    // If you’d like to learn more about the double not operator, you can check out the link under the video.

                    // 4. The final prop that our InfiniteScroll  component needs is the next prop.  
                    // This prop accepts a function that will be  called to load the next page of results  
                    // if the hasMore prop is true.
                    //  For now we’ll  set this prop to an empty arrow function.
                    // We’re going to write the function to pass our  ‘next’ prop in a separate utils folder. Then  
                    // we’ll be able to reuse it later on for fetching  other paginated data, like comments and profiles.
                    // So let’s create a new folder called utils in our  src directory, and inside it a utils.js file.  
                    // Inside, we’ll export an async  function and call it fetchMoreData.  go to utils >utils.js
                    <InfiniteScroll 
                    children = {
                        posts.results.map(post => (
                            <Post key={post.id} {...post} setPosts={setPosts}/>
                        ))
                    }
                    dataLength={posts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!posts.next}
                    next={()=> fetchMoreData(posts, setPosts)} />
                    
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