import { BookmarkIcon, DashboardIcon, PersonIcon } from "@radix-ui/react-icons";
import { ActivitySquare, Axe, BrickWall, Building, Settings, Star } from "lucide-react";
import { BookmarkCheckFill } from "react-bootstrap-icons";

export const adminNavLinks=[
    {
        name:"Dashboard",
        href:"/dashboard",
        hasChildren:false,
        icon:DashboardIcon
    },
    {
        name:"Add Admin",
        href:"/admin",
        hasChildren:false,
        icon:PersonIcon
    },
    {
        name:"Tools",
        href:"/tools",
        hasChildren:true,
        icon:Axe,
        searchable:true,
        children:[
            "merge-pdf",
            "compress-pdf",
            "rotate-pdf-pages",
            "remove-pdf-pages",
            "organize-pdf-pages",
            "grayscale-pdf",
            "extract-pdf-pages",
            "repair-pdf",
            "jpg-to-pdf",
            "png-to-pdf",
            "bmp-to-pdf",
            "tiff-to-pdf",
            "word-to-pdf",
            "pptx-to-pdf",
            "txt-to-pdf",
            "excel-to-pdf",
            "pdf-to-jpg",
            "pdf-to-png",
            "pdf-to-bmp",
            "pdf-to-tiff",
            "pdf-to-word",
            "pdf-to-pptx",
            "pdf-to-txt",
            "pdf-to-zip",
            "protect-pdf",
            "unlock-pdf",
        ]
    },
    {
        name:"Pages",
        href:"/pages",
        hasChildren:true,
        icon:BookmarkIcon,
        children:[
            "home",
  "about",
  "privacy-policy",
  "terms-and-conditions",
  "contact-us",
  "blogs"
        ]
    },
    {
        name:"Choose Us",
        href:"/choose-us",
        hasChildren:false,
        icon:ActivitySquare
    },
    {
        name:"Reviews",
        href:"/reviews",
        hasChildren:false,
        icon:Star
    },
    {
        name:"Companies Image",
        href:"/companies",
        hasChildren:false,
        icon:Building
    },
    {
        name:"Seo Settings",
        href:"/seo",
        hasChildren:false,
        icon:Settings,
        
    },

    {
        name:"Blogs",
        href:"/blogs",
        hasChildren:true,
        icon:BrickWall,
        children:[
       "categories",
       "all-blogs",
       "comments"
        ]
    },
   
    
    
]

