import AddProductModal from '@/components/dashboard/seller/addProductsModal'
import { getProducts } from '@/lib/api/products'
import React from 'react'

const ProductsSellerPage = async() => {
    const products=await getProducts()
    // console.log(products)
    return (
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold '>Products</h1>
            <AddProductModal/>
        </div>
    )
}

export default ProductsSellerPage