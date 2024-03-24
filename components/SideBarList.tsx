import React from 'react'
import Sidebar, { SidebarItem } from './SideBar'
import { BarChartIcon, FileClock, FlaskConical, HomeIcon, UserIcon } from 'lucide-react'

function SideBarList() {
    return (
        <Sidebar>
            <SidebarItem icon={<HomeIcon />} link="/diseases" text="Disease" />
            <SidebarItem icon={<BarChartIcon />} link="/endemics" text="Endemicity" />
            <SidebarItem icon={<FlaskConical />} link="/symptoms" text="Symptom" />
            <SidebarItem icon={<FileClock />} link="/logs" text="Log" />
            <SidebarItem icon={<UserIcon />} link="#" text="Users" />
        </Sidebar>
    )
}

export default SideBarList