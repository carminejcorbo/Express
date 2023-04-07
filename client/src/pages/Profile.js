import { useState, useEffect } from 'react';
import { catchErrors } from '../utils';
import {
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks
} from '../spotify';
import {
  SectionWrapper,
  ArtistsGrid,
  TrackList,
  PlaylistsGrid
} from '../components';
import { StyledHeader } from '../styles';

const Profile = () => {
  //state
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);


// Fetch data from Spotify API
useEffect(() => {
  const fetchData = async () => {
    const userProfile = await getCurrentUserProfile();
    const userPlaylists = await getCurrentUserPlaylists();
    const userTopArtists = await getTopArtists();
    const userTopTracks = await getTopTracks();
   
    // Destructure data from responses
    const { data: userProfileData } = userProfile;
    const { data: userPlaylistsData } = userPlaylists;
    const { data: userTopArtistsData } = userTopArtists;
    const { data: userTopTracksData } = userTopTracks;

    // Update state with fetched data
    setProfile(userProfileData);
    setPlaylists(userPlaylistsData);
    setTopArtists(userTopArtistsData);
    setTopTracks(userTopTracksData);
    
  };

  catchErrors(fetchData());
}, []);

const areDataLoaded = () => {
  return topArtists && topTracks && playlists;
};

const formatPlaylistText = (playlists) => {
  const playlistCount = playlists.total;
  const playlistText = playlistCount === 1 ? 'Playlist' : 'Playlists';
  return `${playlistCount} ${playlistText}`;
};

const renderFollowerCount = (count) => {
  const pluralized = count === 1 ? '' : 's';
  return `${count} Follower${pluralized}`;
};

const renderProfileImage = (images) => (
  images.length && images[0].url &&
  <img className="header__img" src={images[0].url} alt="Avatar" />
);
  return (
    <>
      {profile && (
        <>
          <StyledHeader type="user">
            <div className="header__inner">
            {renderProfileImage(profile.images)}
            <div>
              <div className="header__overline">Profile</div>
                <h1 className="header__name">{profile.display_name}</h1>
                <p className="header__meta">
                {playlists && ( <span>{formatPlaylistText(playlists)}</span>)}
                <span>{renderFollowerCount(profile.followers.total)}</span>
                </p>
              </div>
            </div>
          </StyledHeader>

          {areDataLoaded() && 
            (
              <main>
                <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                  <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
                </SectionWrapper>

                <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
                  <TrackList tracks={topTracks.items.slice(0, 10)} />
                </SectionWrapper>

                <SectionWrapper title="Playlists" seeAllLink="/playlists">
                  <PlaylistsGrid playlists={playlists.items.slice(0, 10)} />
                </SectionWrapper>
              </main>
            )}
          </>
      )}
    </>
  )
};

export default Profile;