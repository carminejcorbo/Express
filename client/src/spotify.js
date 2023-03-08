const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const accessToken = urlParams.get('access_token');
    console.log(accessToken);
    return accessToken;
  };
  
  export const accessToken = getAccessToken();