import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { getCurrentUserPlaylists } from '../spotify';
import { catchErrors } from '../utils';
import { SectionWrapper, PlaylistsGrid } from '../components';

const Playlists = () => {
  const [playlistsData, setPlaylistsData] = useState(null); // state to hold data returned from API
  const [playlists, setPlaylists] = useState([]); // state to hold playlists to be displayed

  // useCallback to memoize the fetchMoreData function to avoid unnecessary re-renders
  const fetchMoreData = useCallback(async () => {
    if (playlistsData.next) { // if there are more playlists to fetch
      const { data } = await axios.get(playlistsData.next); // fetch next set of playlists
      setPlaylistsData(data); // update playlistsData state variable
    }
  }, [playlistsData]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserPlaylists(); // fetch user's playlists
      setPlaylistsData(data); // update playlistsData state variable
    };

    catchErrors(fetchData()); // catch any errors that occur during fetch
  }, []);

  useEffect(() => {
    if (!playlistsData) { // if playlistsData is null, return early
      return;
    }

    // Filter out any playlists that already exist in the playlists state variable
    // Add any new playlists to playlists state variable
    setPlaylists(prevPlaylists => {
      const newPlaylists = playlistsData.items.filter(
        playlist => !prevPlaylists.find(p => p.id === playlist.id)
      );
      return [...prevPlaylists, ...newPlaylists];
    });

    catchErrors(fetchMoreData()); // fetch more data (if there is any) and catch errors
  }, [playlistsData, fetchMoreData]); // only re-run effect if playlistsData or fetchMoreData change

  return (
    <main>
      <SectionWrapper title="Public Playlists" breadcrumb={true}>
        {playlists && <PlaylistsGrid playlists={playlists} />}
      </SectionWrapper>
    </main>
  );
};

export default Playlists;
