import jwt from "jsonwebtoken"
import { getJwt, setJwt } from "./redis.helper.js";

export const accessJwtToken = async (email, _id) => {
    try {
        const accessJWT = await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
          expiresIn: "1d",
        });

        await setJwt(accessJWT, _id)
    
        return Promise.resolve(accessJWT);
      } catch (error) {
        return Promise.reject(error);
      }

    
}

export const refreshJwtToken = async (payload) => {
    try {
        const refreshJWT = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, {
          expiresIn: "30d",
        });
    
        return Promise.resolve(refreshJWT);
      } catch (error) {
        return Promise.reject(error);
      }
}