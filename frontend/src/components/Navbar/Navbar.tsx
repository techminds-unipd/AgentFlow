import {CustomLink} from '../CustomLink/CustomLink.tsx'

export const Navbar=()=>{
    return(
        <>
            Hello Navbar
            <CustomLink name='Home' link='/'/>
            <CustomLink name='About Us' link='/aboutus'/>
        </>
    )
}