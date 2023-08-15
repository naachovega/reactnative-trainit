export default {
    spotify: {
      clientId: 'ab571106566542f8806e0bbb22b05e89',
      clientSecret: 'f9e100bfbdad4f1390aaa9ac862a3bfd',
      redirectUrl: 'exp://localhost:19000',
      scopes: ['user-read-email', 'user-library-read'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
        revocationEndpoint: 'https://accounts.spotify.com/api/token',
      },
    },
  };