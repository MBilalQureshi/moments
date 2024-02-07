import { createContext, useContext, useEffect, useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import { axiosReq, axiosRes } from "../api/axiosDefaults";

/* 1
Create 2 context objects:
One for profileData, e.g. ProfileDataContext
One for the functions to update it e.g. SetProfileDataContext
*/
export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

/* 2
Create two custom hooks for each context object above:
e.g. useProfileData
e.g. useSetProfileData
*/
export const useProfileData = () => useContext(ProfileDataContext)
export const useSetProfileData = () => useContext(SetProfileDataContext)

// 3 Export and define a ProfileDataProvider function component. Pass it children as props.
export const ProfileDataProvider = ({children}) => {
    // 4 Identify and copy all the stateful logic from PopularProfiles.js
    const [profileData, setProfileData] = useState({
        //we'll use pageProfile later!
        pageProfile : { results: [] },
        popularProfiles : { results: [] },
    })
    // 4.1 Below code is removed when coping from PopularProfiles to here, Note: We won’t use the destructured popularProfiles because,
    // eventually, we’ll pass the entire profileData object as the value prop in the ProfileDataContext.Provider.
    // But we’ll need the useState and useEffect hooks here, so that the data is fetched on mount.
    // const { popularProfiles } = profileData

    const handleFollow = async (clickedProfile) => {
        try{
            // the data we'll send is what profile user just followed basically user id  -> followed: clickedProfile.id
            const {data} = await axiosRes.post('/followers/',{followed: clickedProfile.id})
        }catch(err){
            console.log(err)
        }
    }

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
        /* 5
        In the return statement:
            Add your ProfileDataContext.Provider and expose the profileData value.
            Add your SetProfileDataContext.Provider and expose the setProfileData value.
        */
        <ProfileDataContext.Provider value={profileData}>
            {/* Ok, now we have to expose the handleFollow function in the ProfileDataContext.Provider
                so that the Profile components have access to it when the follow button is clicked.
                
                Now that we are sending 2 functions, we’ll need to send them as an object, so we’ll
                add an extra pair of curly braces, and then add in our handleFollow function.*/}
            <SetProfileDataContext.Provider value={{setProfileData, handleFollow}}>
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    )
}