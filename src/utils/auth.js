const Token_key = "user_token";
const User_key = "user";
export const getToken = ()=>localStorage.getItem(Token_key);
export const setToken = (token)=>localStorage.setItem(Token_key,token);
export const removeToken = ()=>localStorage.removeItem(Token_key);
export const getUser = ()=>{
    try{
        return JSON.parse(localStorage.getItem(User_key) || "null");
    }catch{
        console.log("No user data is found in local storage");
        return null;
    }
}
export const setUser =(user)=>{
    localStorage.setItem(User_key,JSON.stringify(user))
}
export const removeUser = ()=> localStorage.removeItem(User_key);
export const clearAuth = ()=>{
    removeToken();
    removeUser();
}