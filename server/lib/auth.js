export default (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Please log in or register to complete this operation.');
  }
};
