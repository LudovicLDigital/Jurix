export enum ROUTES {
  HOME = 'home',
  EXERCISES = 'exercises',
  ACCOUNT = 'account',
  EXERCISE_LIST = 'exerciseList',
  EXERCISE_DETAIL = 'exerciseDetail',
}

export enum COLORS {
  PRIMARY = '#FFC803',
  SECONDARY = '#676D75',
  MENUS = '#1D1F24',
}

export enum AUTH_ERRORS {
  EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use',
  INVALID_EMAIL = 'auth/invalid-email',
  WEAK_PASSWORD = 'auth/weak-password',
  WRONG_PASSWORD = 'auth/wrong-password',
  USER_NOT_FOUND = 'auth/user-not-found',
  INVALID_CREDENTIAL = 'auth/invalid-credential',
  INVALID_PASSWORD = 'auth/invalid-password',
}
