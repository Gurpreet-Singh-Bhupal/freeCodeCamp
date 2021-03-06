const pathsOfNoReturn = [
  'link',
  'auth',
  'login',
  'logout',
  'signin',
  'signup',
  'fonts',
  'favicon',
  'js',
  'css'
];

const pathsAllowedList = ['challenges', 'map', 'commit'];

const pathsOfNoReturnRegex = new RegExp(pathsOfNoReturn.join('|'), 'i');
const pathsAllowedRegex = new RegExp(pathsAllowedList.join('|'), 'i');

export default function addReturnToUrl() {
  return function(req, res, next) {
    // Remember original destination before login.
    var path = req.path.split('/')[1];

    if (
      req.method !== 'GET' ||
      pathsOfNoReturnRegex.test(path) ||
      !pathsAllowedRegex.test(path) ||
      /hot/i.test(req.path)
    ) {
      return next();
    }
    req.session.returnTo = req.originalUrl.includes('/map')
      ? '/'
      : req.originalUrl;
    return next();
  };
}
