//Gestire il redirect del backend quando aggiungo un account Google
import { useNavigate, useSearchParams } from "react-router"
import { useGoogleToken } from "../../hooks/useGoogleToken"
import { Button } from "@mui/material";

export const AddAccount=()=>{
    const [searchParams] = useSearchParams();
    const tokenParam = searchParams.get("token");
    const refreshTokenParam = searchParams.get("refreshToken");
    const expireDateParam = searchParams.get("expireDate");
    const {addGoogleToken, removeGoogleToken} = useGoogleToken();
    const navigate = useNavigate();
    if (tokenParam && expireDateParam){
        removeGoogleToken()
        addGoogleToken({
            token: tokenParam,
            refreshToken: refreshTokenParam!,
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
