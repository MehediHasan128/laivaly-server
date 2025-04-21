import jwt, { JwtPayload } from 'jsonwebtoken';


const decodedToken = (token: string, access_secret_token: string) => {
    
    return jwt.verify(token, access_secret_token) as JwtPayload;

};

export default decodedToken;