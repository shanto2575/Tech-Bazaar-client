import AddProductModal from '@/components/dashboard/seller/addProductsModal'
import React from 'react'

const ProductsSellerPage = () => {
    return (
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-bold '>Products</h1>
            <AddProductModal/>
        </div>
    )
}

export default ProductsSellerPage