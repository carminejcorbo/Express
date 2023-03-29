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

const Test = () => {
  return (<> <h1>Spotify Information</h1></> )
};

export default Test;