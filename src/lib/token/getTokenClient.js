import { authClient } from "../auth-client";

export const getTokenClient=async()=>{
    const {data:tokeData}=await authClient.token()
    return tokeData.token;
}