import { createAction, handleActions } from 'redux-actions';

// handles situation where a logout is dispatched while an authentication is in
// progress

export default (app, options = {}) => {
  const defaults = {
    isError: 'isError',
    isLoading: 'isLoading', // s/b compatible with feathers-reduxify-service::getServicesStatus
    isSignedIn: 'isSignedIn',
    user: 'user',
    token: 'token',
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED',
    isUserAuthorized: (/* user */) => true,
    assign: {
      verifyExpires: undefined,
      verifyToken: undefined,
      resetExpires: undefined,
      resetToken: undefined,
    },
  };
  const opts = Object.assign({}, defaults, options);

  const reducer = {
    [`SERVICES_AUTHENTICATION_AUTHENTICATE_${opts.PENDING}`]: (state, action) => ({
      ...state,
      [opts.isError]: null,
      [opts.isLoading]: true,
      [opts.isSignedIn]: false,
      [opts.user]: null,
      [opts.token]: null,
      ignorePendingAuth: false,
    }),

    [`SERVICES_AUTHENTICATION_AUTHENTICATE_${opts.FULFILLED}`]: (state, action) => {
      const user = action.payload.data;

      if (state.ignorePendingAuth) {
        // A logout was dispatched between the authentication being started and
        // completed
        app.logout();

        return {
          ...state,
          [opts.isError]: null,
          [opts.isLoading]: false,
          [opts.isSignedIn]: false,
          [opts.data]: null,
          [opts.token]: null,
          ignorePendingAuth: false,
        };
      }

      if (!opts.isUserAuthorized(user)) {
        // feathers authenticated the user but the app is rejecting
        app.logout();

        return {
          ...state,
          [opts.isError]: new Error('User is not verified.'),
          [opts.isLoading]: false,
          [opts.isSignedIn]: false,
          [opts.data]: null,
          [opts.token]: null,
          ignorePendingAuth: false,
        };
      }

      return {
        ...state,
        [opts.isError]: null,
        [opts.isLoading]: false,
        [opts.isSignedIn]: true,
        [opts.user]: Object.assign({}, user, opts.assign),
        [opts.token]: action.payload[opts.token],
        ignorePendingAuth: false,
      };
    },

    [`SERVICES_AUTHENTICATION_AUTHENTICATE_${opts.REJECTED}`]: (state, action) => ({
      ...state,
      // action.payload = { name: "NotFound", message: "No record found for id
      // 'G6HJ45'",   code:404, className: "not-found" }
      [opts.isError]: action.payload,
      [opts.isLoading]: false,
      [opts.isSignedIn]: false,
      [opts.data]: null,
      [opts.token]: null,
      ignorePendingAuth: false,
    }),

    [`SERVICES_AUTHENTICATION_LOGOUT_${opts.PENDING}`]: (state, action) => {
      console.log('logout pending')
      return {
        ...state,
        [opts.isLoading]: true,
      };
    },

    [`SERVICES_AUTHENTICATION_LOGOUT_${opts.FULFILLED}`]: (state, action) => 
    // console.log('logout fullfiled')
      ({
        ...state,
        [opts.isError]: null,
        [opts.isLoading]: null,
        [opts.isSignedIn]: false,
        [opts.user]: null,
        [opts.token]: null,
        // Ignore the result if an authentication has been started
        ignorePendingAuth: state.isLoading,
      })
    ,

    [`SERVICES_AUTHENTICATION_LOGOUT_${opts.REJECTED}`]: (state, action) => 
    // console.log('logout rejected')
      ({
        ...state,
        [opts.isError]: null,
        [opts.isLoading]: null,
        [opts.isSignedIn]: false,
        [opts.user]: null,
        [opts.token]: null,
        // Ignore the result if an authentication has been started
        ignorePendingAuth: state.isLoading,
      })
    ,
    SERVICES_AUTHENTICATION_USER: (state, action) => {

      let user = state[opts.user];
      if (user) {
        user = {
          ...user,
          ...action.payload,
        };
      }

      return ({
        ...state,
        [opts.isError]: null,
        [opts.isLoading]: null,
        // [opts.isSignedIn]: false,
        [opts.user]: user,
        // A logout may be dispatched between the authentication being started and
        // completed
        ignorePendingAuth: false,
      });
    },

    SERVICES_AUTHENTICATION_SIGNED_IN: (state, action) => ({
      ...state,
      [opts.isError]: null,
      [opts.isLoading]: null,
      [opts.isSignedIn]: action.payload,
      // A logout may be dispatched between the authentication being started and
      // completed
      ignorePendingAuth: false,
    }),
  };

  // ACTION TYPES

  const AUTHENTICATE = 'SERVICES_AUTHENTICATION_AUTHENTICATE';
  const LOGOUT = 'SERVICES_AUTHENTICATION_LOGOUT';
  const USER = 'SERVICES_AUTHENTICATION_USER';
  const SIGNED_IN = 'SERVICES_AUTHENTICATION_SIGNED_IN';

  return {
    // ACTION CREATORS
    // Note: action.payload in reducer will have the value of .data below
    authenticate: createAction(AUTHENTICATE, (p) => ({
      promise: app.authenticate(p),
      data: undefined,
    })),
    logout: createAction(LOGOUT, () => ({
      promise: app.logout(),
    })),
    user: createAction(USER),
    signedIn: createAction(SIGNED_IN),

    // REDUCER
    reducer: handleActions(reducer, {
      [opts.isError]: null,
      [opts.isLoading]: false,
      [opts.isSignedIn]: false,
      [opts.user]: null,
      ignorePendingAuth: false,
    }),
  };
};