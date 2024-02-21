import React from 'react'
import Sidebar, { SidebarItem } from './SideBar'
import { BarChartIcon, HomeIcon, UserIcon } from 'lucide-react'

function SideBarList() {
    return (
        <Sidebar>
            <SidebarItem icon={<HomeIcon />} link="/diseases" text="Disease" />
            <SidebarItem icon={<BarChartIcon />} link="/endemics" text="Endemicity" />
            <SidebarItem icon={<UserIcon />} link="#" text="Users" />
        </Sidebar>
    )
}

export default SideBarList