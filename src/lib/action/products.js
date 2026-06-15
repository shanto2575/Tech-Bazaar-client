'use server'

import { headers } from "next/headers"
import { auth } from "../auth"

// import { authClient } from "../auth-client"

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const AddProducts=async(product)=>{
    // const {data:tokeData}=await authClient.token()
    // console.log(tokeData.token)
    const {token}=await auth.api.getToken({
        headers:await headers()
    })
    const res=await fetch(`${baseUrl}/seller/products`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            authorization:`Bearer ${token}`
        },
        body:JSON.stringify(product)
    })
    const Data=await res.json()
    return Data;
}