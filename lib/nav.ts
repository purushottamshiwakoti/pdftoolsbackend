import { BookmarkIcon, DashboardIcon, PersonIcon } from "@radix-ui/react-icons";
import { BookmarkCheckFill } from "react-bootstrap-icons";

export const adminNavLinks=[
    {
        name:"Dashboard",
        href:"/dashboard",
        icon:DashboardIcon
    },
    {
        name:"Add Admin",
        href:"/admin",
        icon:PersonIcon
    },
    {
        name:"Pages",
        href:"/pages",
        icon:BookmarkIcon
    },
    {
        name:"Other Pages",
        href:"/other-pages",
        icon:BookmarkCheckFill
    },
   
    
    
]

