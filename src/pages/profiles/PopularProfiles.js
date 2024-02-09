import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import appStyles from '../../App.module.css'
import Asset from '../../components/Asset'
import Profile from './Profile'
import { useProfileData } from '../../contexts/ProfileDataContext'

const PopularProfiles = ({ mobile }) => {
    /* 7
        Replace the code you copied from Popular Profiles, and call your new useProfileData context to destructure your popularProfiles state.
        Important: Don't forget to tidy up your imports e.g. adding new imports, removing unused imports, making sure file paths are accurate.
    */ 
    const { popularProfiles } = useProfileData();
    return (
        <Container
          className={`${appStyles.Content} ${
            mobile && "d-lg-none text-center mb-3"
          }`}
        >
          {popularProfiles.results.length ? (
            <>
              <p>Most followed profiles.</p>
              {mobile ? (
                <div className="d-flex justify-content-around">
                    {/* for mobile */}
                  {popularProfiles.results.slice(0, 4).map((profile) => (
                    // <p key={profile.id}>{profile.owner}</p>
                    <Profile key={profile.id} profile={profile} mobile />
                  ))}
                </div>
              ) : (
                // for desktop
                popularProfiles.results.map((profile) => (
                //   <p key={profile.id}>{profile.owner}</p>
                    <Profile key={profile.id} profile={profile} />
                ))
              )}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      );
    };

export default PopularProfiles