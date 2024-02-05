import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import appStyles from '../../App.module.css'
import { axiosReq } from '../../api/axiosDefaults'
import { useCurrentUser } from '../../contexts/CurrentUserContext'
import Asset from '../../components/Asset'

const PopularProfiles = () => {

    const [profileData, setProfileData] = useState({
        //we'll use pageProfile later!
        pageProfile : { results: [] },
        popularProfiles : { results: [] },
    })
    const { popularProfiles } = profileData
    const currentUser = useCurrentUser()

    useEffect(() => {
        const handleMount = async () => {
            try{
                // fetching in decending order so that most followed profile is at the top
                const {data} = await axiosReq.get(
                    '/profiles/?ordering=-followers_count'
                )
                setProfileData((prevState)=>({
                    ...prevState,
                    popularProfiles: data,
                }))
            } catch(err){
                console.log(err)
            }
        }
        handleMount()
        /*Now the question is, when do we run this  effect? Well, every user has to make different  
        requests to follow and unfollow people,  so we’ll need to re-fetch popularProfiles  
        depending on the state of the current user. So, let’s define the currentUser variable 
        */
    },[currentUser])
  return (
    <Container className={appStyles.Content}>
         <p>Most Viewed profiles</p>
        {popularProfiles.results.length ? (
        <>
            {popularProfiles.results.map(profile => (
            <p key={profile.id}>
                {profile.owner}
            </p>
        ))}
        </>
        ) : (
        <Asset spinner />
        )}
    </Container>
  )
}

export default PopularProfiles