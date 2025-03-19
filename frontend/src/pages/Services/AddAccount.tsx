//Gestire il redirect del backend quando aggiungo un account Google
import { useNavigate, useSearchParams } from "react-router"
import { useGoogleToken } from "../../hooks/useGoogleToken"
import { Button } from "@mui/material";

export const AddAccount=()=>{
    const [searchParams] = useSearchParams();
    const tokenParam = searchParams.get("token");
    const expireDateParam = searchParams.get("expireDate");
    const {addGoogleAccount, removeGoogleAccount} = useGoogleToken();
    const navigate = useNavigate();
    if (tokenParam && expireDateParam){
        removeGoogleAccount()
        addGoogleAccount({
            token: tokenParam,
            expireDate: expireDateParam
        })
        navigate("/services")
    }
    
    return (
        <div>
            <Button href="/services">If the automatic redirect isn't working, click here.</Button>
        </div>
    )
}