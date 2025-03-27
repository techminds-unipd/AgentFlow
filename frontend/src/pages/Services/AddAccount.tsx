//Gestire il redirect del backend quando aggiungo un account Google
import { useNavigate, useSearchParams } from "react-router";
import { useGoogleToken } from "../../hooks/useGoogleToken";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { JSX } from "react";
import { CustomButton } from "../../components/CustomButton/CustomButton";

export const AddAccount = (): JSX.Element => {
    const [searchParams] = useSearchParams();
    const tokenParam = searchParams.get("token");
    const refreshTokenParam = searchParams.get("refreshToken");
    const expireDateParam = searchParams.get("expireDate");
    const { addGoogleToken, removeGoogleToken } = useGoogleToken();
    const navigate = useNavigate();
    let error: string | null = null;
    if (tokenParam !== null && expireDateParam !== null) {
        removeGoogleToken();
        addGoogleToken({ token: tokenParam, refreshToken: refreshTokenParam!, expireDate: expireDateParam });
        void navigate("/services");
    } else error = "There was an error while adding your Google account";

    return (
        <main>
            <Grid container direction="column" alignItems="center" justifyContent="center" marginTop={6}>
                <Grid>
                    <CustomButton
                        link="/services"
                        name="If the automatic redirect isn't working, click here."
                        variant="outlined"
                    />
                </Grid>
                <Grid marginTop={3}>
                    <Typography color="red">{error}</Typography>
                </Grid>
            </Grid>
        </main>
    );
};
