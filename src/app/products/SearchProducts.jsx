'use client'
import { Button, Form } from '@heroui/react'
import { redirect } from 'next/navigation'
import React from 'react'

const SearchProducts = () => {
    const onSubmit=(e)=>{
        e.preventDefault()

        redirect(`/products?search=${e.target.search.value}`)

    }
    return (
        <div >
            <Form onSubmit={onSubmit}>
                <input name='search' type='search' className='p-1 rounded-xl border '></input>
                <Button type='submit' className={'rounded-xl '}>Search</Button>
            </Form>
        </div>
    )
}

export default SearchProducts