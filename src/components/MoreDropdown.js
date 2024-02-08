import styles from '../styles/MoreDropdown.module.css'
import Dropdown from 'react-bootstrap/Dropdown'
import React from 'react';
//Add the following import.
import { useHistory } from "react-router";

// https://react-bootstrap-v4.netlify.app/components/dropdowns/#custom-dropdown-components'


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu

// https://legacy.reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components 
// the ref can’t be treated like a  standard prop. Just like the key prop,  
// ref is handled differently by react compared  to standard props. So to get around this,  
// React-Bootstrap uses the forwardRef method to pass  the ref into our function as a second argument.
// ForwardRef is quite extensively used in reusable  component libraries like react bootstrap.
//"Ref forwarding is an opt-in feature that lets some components take a ref they receive, and pass it further down (in other words, “forward” it) to a child."
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
      className='fas fa-ellipsis-v'
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));
  
// creating menu for our drop down
export const MoreDropdown = ({handleEdit, handleDelete}) => {
    return (
        <Dropdown className='ml-auto' drop="left">
        <Dropdown.Toggle as={ThreeDots}>
            Custom toggle
        </Dropdown.Toggle>
        {/* To be sure that the position of the dropdown menu is consistent across browsers, we need to add a popperConfig prop to our Dropdown.Menu component.
        'popper' is a 3rd party library used by React-Bootstrap. Here we are passing a config object to make sure the dropdown menus position is fixed on all browsers. */}
        <Dropdown.Menu className="text-center" popperConfig={{ strategy: "fixed" }}>
            <Dropdown.Item 
                className={styles.DropdownItem}
                onClick={handleEdit}
                aria-label='edit'
            >
                <i className='fas fa-edit' />
            </Dropdown.Item>
            <Dropdown.Item
                className={styles.DropdownItem}
                onClick={handleDelete}
                aria-label='delete'
            >
                <i className='fas fa-trash-alt' />
            </Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
    )
}

//Add and export the ProfileEditDropdown component
export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" />
          change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" />
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}