const Auth0Config = {
  domain: import.meta.env.VITE_DOMAIN,
  clientId: import.meta.env.VITE_CLIENT_ID,
  redirectUri: window.location.origin,
};

export default Auth0Config;