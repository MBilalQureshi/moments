import React ,{useState} from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    });
    
  const { username, password1, password2} = signUpData
  // this is to redirect from signup to sign in
  const history = useHistory();
  const handleChange = (event) =>{
    setSignUpData({
        ...signUpData,
        // we can use below function to handle any change by user we we do not need to write them seprately this is know as "Computed properties"
        [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await axios.post('/dj-rest-auth/registration/', signUpData)
      history.push('/signin')
    } catch(err){

    }
  }
    return (
    <Row className={styles.Row}>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
                <Form.Label className="d-none">username</Form.Label>
                <Form.Control type="text" placeholder="username" name='username'
                className={styles.Input}
                value={username} 
                onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="password1">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password1"
                className={styles.Input} 
                value={password1}
                onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="password2">
                <Form.Label className="d-none">Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password2"
                className={styles.Input} 
                value={password2}
                onChange={handleChange} />
            </Form.Group>

            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
                Sign Up
            </Button>
        </Form>

        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"
          }
        />
      </Col>
    </Row>
  );
};

export default SignUpForm;