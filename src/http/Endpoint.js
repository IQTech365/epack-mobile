export const SIGNIN = `/users/login`;
export const SIGNUP = `/users/register`;
export const BANNER = `/banner/read`;
export const CATEGORIES = `/category/read`;
export const CATEGORY = (id) => `/category/read/${id}`;
export const VIDEOS = `/video/read`;
export const VIDEO = (id) => `/video/read/${id}`;
export const SEARCH_VIDEO = (title) => `/video/search/${title}`;
export const PINCODE = (pincode) => `https://api.postalpincode.in/pincode/${pincode}`;