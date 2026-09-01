import { createContext, useMemo, useState } from 'react';
import {getToken,setToken,getUser,setUser as saveUser,clearAuth} from './../utils/auth';
import userService from "../services/userService"


export const AuthContext = createContext(null);

export function AuthProvider({children}){
    const [token,setAuthToken]  = useState(getToken());
    const [user,setAuthUser] = useState(getUser());

    const updateUser = (userData)=>{
        setAuthUser(userData);
        saveUser(userData);
    }

    const login = async (credentials)=>{
        const result = await userService.login(credentials);
        if(result.token){
            setToken(result.token);
            setAuthToken(result.token);
        }else{
            throw new Error("No token is received from the server");
        }
        if(result.user){
            updateUser(result.user)
        }
        return result;
    }
    const logout = ()=>{
        clearAuth();
        setAuthToken(null);
        setAuthUser(null);
    }
    const value = useMemo(
        ()=>(
                {
                login,logout,token,user,isAuthenticated:Boolean(token),setUser:updateUser
            }
        ),[token,user]
    )
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
