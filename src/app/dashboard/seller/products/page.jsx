import { ProductsTable } from '@/components/dashboard/products/ProductsTable'
import AddProductModal from '@/components/dashboard/seller/addProductsModal'
import { getProducts } from '@/lib/api/products'
import React from 'react'

const ProductsSellerPage = async ({searchParams}) => {
    const params=await searchParams;
    // console.log(params)
    const products = await getProducts(params.page)
    console.log(products)
    return (
        <div className='flex flex-col space-y-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl font-bold '>Products</h1>
                <AddProductModal />
            </div>
            <ProductsTable productsData={products}/>
        </div>
    )
}

export default ProductsSellerPage