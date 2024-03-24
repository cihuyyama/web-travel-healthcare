import React from 'react'
import Sidebar, { SidebarItem } from './SideBar'
import { BarChartIcon, FileClock, FlaskConical, HomeIcon, UserIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

function SideBarList() {
    const pathname = usePathname()

    return (
        <Sidebar>
            <SidebarItem active={pathname==='/diseases'} icon={<HomeIcon />} link="/diseases" text="Disease" />
            <SidebarItem active={pathname==='/endemics'} icon={<BarChartIcon />} link="/endemics" text="Endemicity" />
            <SidebarItem active={pathname==='/symptoms'} icon={<FlaskConical />} link="/symptoms" text="Symptom" />
            <SidebarItem active={pathname==='/logs'} icon={<FileClock />} link="/logs" text="Log" />
            <SidebarItem active={pathname==='/users'} icon={<UserIcon />} link="#" text="Users" />
        </Sidebar>
    )
}

export default SideBarList