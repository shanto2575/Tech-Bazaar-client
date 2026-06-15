import DashboardSideBar from '@/components/dashboard/DashboardSideBar'
import React from 'react'

const DashboardLayout = ({children}) => {
    return (
        <div className='flex h-screen overflow-hidden'>
            <div className='w-64 border border-right-1 px-4 py-4'>
                <DashboardSideBar/>
            </div>
            <div className='flex-1 overflow-y-auto'>
                <div className='w-full border border-blue-400 p-3'>
                    <h2>Navbar</h2>
                </div>
                <main className='p-3'>
                    {children}
                </main>
            </div>

        </div>
    )
}

export default DashboardLayout
