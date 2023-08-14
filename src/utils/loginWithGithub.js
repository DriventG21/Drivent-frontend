export function loginWithGithub() {
  window.location.assign(`
    https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`);
}
