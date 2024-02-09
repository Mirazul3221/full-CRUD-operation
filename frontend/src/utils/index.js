import {jwtDecode} from "jwt-decode"
export const decode_token = (token) => {
    if (token) {
       try {
           const jwt_decoded = jwtDecode(token)
           const exp = new Date(jwt_decoded.exp * 1000)
           if (new Date() > exp) {
               localStorage.removeItem("crud_token")
               return ""
           } else {
               return jwt_decoded
           }
       } catch (error) {
        
       }
    } else {
        return ""
    }
}