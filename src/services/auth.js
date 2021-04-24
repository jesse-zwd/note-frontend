import { toast } from "react-toastify";
import http from "./http";

class AuthService {
    login(payload) {
        return http.post("login/", payload).then((res) => {
            
            const user = res.data
            const theme = "light"
            localStorage.setItem("user", JSON.stringify({...user, theme}))
            
            toast.success("login successfully")
            return {...user, theme}
        }).catch((error) => {
            toast.error(error)
        })
    }

    signup(payload) {
        return http.post("signup/", payload).then(() => {
            toast.success("sign up successfully，please login")
        }).catch((error) => {
            toast.error(error)
        })
    }
}

export default new AuthService()