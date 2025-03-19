//Gestire il redirect del backend quando aggiungo un account Google
import { useSearchParams } from "react-router"

export const AddAccount=()=>{
    const [searchParams] = useSearchParams()
    const token = searchParams.getAll("token")
    const refreshToken = searchParams.getAll("refreshToken")
    const expireDate = searchParams.getAll("expireDate")

    return (
        <div>
            "Qua faccio il redirect"
            {token} 
            {refreshToken}
            {expireDate}
        </div>
    )
}