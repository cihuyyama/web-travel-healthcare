import React from 'react'
import Sidebar, { SidebarItem } from './SideBar'
import { BarChartIcon, FileClock, FlaskConical, HomeIcon, UserIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

function SideBarList() {
    const pathname = usePathname()
    const firstPath = pathname.split('/')[1]

    return (
        <Sidebar>
            <SidebarItem active={firstPath==='diseases'} icon={<HomeIcon />} link="/diseases" text="Disease" />
            <SidebarItem active={firstPath==='endemics'} icon={<BarChartIcon />} link="/endemics" text="Endemicity" />
            <SidebarItem active={firstPath==='symptoms'} icon={<FlaskConical />} link="/symptoms" text="Symptom" />
            <SidebarItem active={firstPath==='logs'} icon={<FileClock />} link="/logs" text="Log" />
            {/* <SidebarItem active={pathname==='/users'} icon={<UserIcon />} link="#" text="Users" /> */}
        </Sidebar>
    )
}

export default SideBarList