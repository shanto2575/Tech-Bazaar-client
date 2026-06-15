const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL

export const getProducts=async()=>{
    const res=await fetch(`${baseUrl}/seller/products`)
    const data=await res.json()
    return data;
}