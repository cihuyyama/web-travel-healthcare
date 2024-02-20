import React from 'react'
import Sidebar, { SidebarItem } from './SideBar'
import { BarChartIcon, HomeIcon, UserIcon } from 'lucide-react'

function SideBarList() {
    return (
        <Sidebar>
            <SidebarItem icon={<HomeIcon />} link="/dashboard" text="Disease" active />
            <SidebarItem icon={<BarChartIcon />} link="#" text="Endemicity" />
            <SidebarItem icon={<UserIcon />} link="#" text="Users" />
        </Sidebar>
    )
}

export default SideBarList