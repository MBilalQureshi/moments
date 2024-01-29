import React from 'react'
import styles from '../styles/Avatar.module.css'

const Avatar = ({ src, height = 45, text }) => {
    //https://zaiste.net/posts/javascript-destructuring-assignment-default-values/
    //1. const { src, height = 45, text } = props;  OR 2. we can move it in (props) above directly
  return (
    <span>
        <img 
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt='avatar' />
        {text}
    </span>
  )
}

export default Avatar