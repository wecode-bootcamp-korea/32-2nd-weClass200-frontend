export const MAIN_URL = "http://10.58.6.184:8000/";

export const config = {
  nav: `${MAIN_URL}products/nav`,
  list: `${MAIN_URL}products`,
  main: `${MAIN_URL}products/main`,
  like: `${MAIN_URL}users/like`,
};
export const REDIRECT_URI = "http://localhost:3000/kakaoauth";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const API_URL = "http://10.58.3.151:8000/users/kakao";

export const DETAIL_URL = "http://10.58.6.184:8000/";
export const DETAIL_API = {
  detail: `${DETAIL_URL}products/1/1`,
  review: `${DETAIL_URL}users/review`,
  like: `${DETAIL_URL}users/like`,
};
