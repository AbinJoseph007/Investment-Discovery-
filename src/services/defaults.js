const BASE_URL = process.env.BASE_URL;

export const endpoints = {
  // common
  LOGIN: `login/`,
  PROFILE: `profileview/`,
  EDIT_PROFILE: `user/profile/update/`,

  // Investor
  INVESTOR_REGISTERATION: `invester/register/`,
  GET_PROJECTS: `projectview/`,
  ADD_INTEREST: `project/notify/`,
  GET_PROJECT_UPDATE: `get/updation/`,
  INVEST_IN_PROJECT: `make/payment/`,
  PAYMENT_HISTORY: `transaction/history/`,
  ADD_INVESTMENT: `Add/Investment/`,
  GET_INVESTMENTS: `Investment/done/`,
  SEND_FIRST_MESSAGE: `send/investor/message/`,
  SEND_NOTIFICATION: `project/notify/`,

  // Innovator

  INNOVATOR_REGISTRATION: `innovator/register/`,
  GET_CATEGORY: `category/`,
  ADD_PROJECT: `project/`,
  GET_ALL_PROJECTS: `project/`,
  ADD_CATEGORY: `category/`,
  PROJECT_VIEW: `projectview/`,
  GET_INNOVATOR_PROJECTS: `project/`,
  DELETE_PROJECT: `project/`,
  UPDATE_PROJECT: `update/`,
  EDIT_PROJECT: `project/`,
  GET_NOTIFICATION: `notified/list/`,
  GET_INVESTOR_LIST: `payed/user/list/`,
  SEND_MESSAGE: `send/message/`,
  GET_NOTIFICATIONS: `notification/view`,
  GET_CHAT_HISTORY: `/Chat/History/`
};
