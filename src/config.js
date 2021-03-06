export const MAIN_URL = "http://10.58.6.184:8000/";

export const config = {
  nav: `${MAIN_URL}products/nav`,
  list: `${MAIN_URL}products`,
  main: `${MAIN_URL}products/main`,
  like: `${MAIN_URL}users/like`,
  privateBest: `${MAIN_URL}products/private?type_name=Best`,
  publicBest: `${MAIN_URL}products/public?type_name=Best`,
  privateSale: `${MAIN_URL}products/private?type_name=Sale`,
  publicSale: `${MAIN_URL}products/public?type_name=Sale`,
  privateNew: `${MAIN_URL}products/private?type_name=New`,
  publicNew: `${MAIN_URL}products/public?type_name=New`,
  detail: `${MAIN_URL}products`,
  review: `${MAIN_URL}users/review`,
};

export const REDIRECT_URI = "http://localhost:3000/kakaoauth";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const API_URL = "http://10.58.6.184:8000/users/kakao";

export const MYPAGE_URL = "http://10.58.6.184:8000/users/mypage";
