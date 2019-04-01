// storing JWT as a cookie and using HTTPS for all web transactions.
// never store JWT in LocalStorage malicious attackers will not be able to
// steal our user’s JWT using XSS.
import dotenv from "dotenv";
dotenv.config();

export const jwtOptions = {
  jwtFromRequest: req => req.cookies.jwt,
  secretOrKey: 'wdiInfinity'
};

export const localOptions = {
  usernameField: "email",
  passwordField: "password"
};
