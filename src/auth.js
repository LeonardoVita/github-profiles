export const isAuthenticated = () => {

  const access_token = window.localStorage.getItem('access_token');

  const isLoged = (access_token === null) ? false : true
  return isLoged
}