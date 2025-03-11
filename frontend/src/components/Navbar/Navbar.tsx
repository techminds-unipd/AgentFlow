import { CustomLink } from '../CustomLink/CustomLink.tsx'
import { CustomButton } from '../CustomButton/CustomButton.tsx'


export const Navbar=()=>{
    return(
        <>
            Hello Navbar
            <CustomLink name='Home' link='/' />
            <CustomLink name='About Us' link='/aboutus' />
            <CustomButton name="Sign In" link="/signin" variant="contained"/>
            <CustomButton name="Sign Up" link="/signup" variant="outlined"/>
        </>
    )
}