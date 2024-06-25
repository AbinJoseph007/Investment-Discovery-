const BASE_URL = process.env.BASE_URL;

export const endpoints = {

  // common
  LOGIN:`login/`,
  PROFILE:`profileview/`,
  EDIT_PROFILE:`user/profile/update/`,


// Investor
  INVESTOR_REGISTERATION:`invester/register/`,
  GET_PROJECTS:`projectview/`,
  ADD_INTEREST:`project/notify/`,


  // Innovator

  INNOVATOR_REGISTRATION:`innovator/register/`,
  GET_CATEGORY:`category/`,
  ADD_PROJECT:`project/`,
  GET_ALL_PROJECTS:`project/`,
  ADD_CATEGORY:`category/`,
  PROJECT_VIEW:`projectview/`,
  GET_INNOVATOR_PROJECTS:`project/`,
  DELETE_PROJECT:`project/`,
  UPDATE_PROJECT:`update/`,
  EDIT_PROJECT:`project/`,
  GET_NOTIFICATION:`notified/list/`
};
