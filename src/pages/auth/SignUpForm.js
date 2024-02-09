import React ,{useState} from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {

  useRedirect('loggedIn') //now try sign in/out when logged in by adding in url

    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: '',
    });
  
  const { username, password1, password2} = signUpData
  // this is to redirect from signup to sign in, we'll use useHistory hook
  const history = useHistory();
  
  const [errors, setErrors] = useState({});

  const handleChange = (event) =>{
    setSignUpData({
        ...signUpData,
        // we can use below function to handle any change by user we we do not need to write them seprately this is know as "Computed properties"
        [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await axios.post('/dj-rest-auth/registration/', signUpData)
      history.push('/signin')
    } catch(err){
      // This code with the question mark is called  optional chaining. What it does is check if  
      // response is defined before looking for the data.  So if response isn’t defined, it won’t throw an error.
      setErrors(err.response?.data);

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
            {/* Show username errors here */}
            {errors.username?.map((message, idx)=> (
              <Alert variant="warning" key={idx}>{message}</Alert>
              ) )}

            <Form.Group controlId="password1">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password1"
                className={styles.Input} 
                value={password1}
                onChange={handleChange} />
            </Form.Group>
            {/* Show pass1 errors here */}
            {errors.password1?.map((message,idx)=>(
              <Alert variant="warning" key={idx}>{message}</Alert>
            ))}
    
            <Form.Group controlId="password2">
                <Form.Label className="d-none">Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password2"
                className={styles.Input} 
                value={password2}
                onChange={handleChange} />
            </Form.Group>
            {/* Show pass2 errors here */}
            {errors.password2?.map((message, idx)=>(
              <Alert variant="warning" key={idx}>{message}</Alert>
            ))}

            <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
                Sign Up
            </Button>

            {/* Add non_fields_erros like if password does not match */}
            {errors.non_field_errors?.map((message, idx)=>(
              <Alert variant="warning" key={idx} className="mt-3">{message}</Alert>
            ))}
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