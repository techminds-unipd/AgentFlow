import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { CustomLink } from "../CustomLink/CustomLink";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router";
import "../../index.css";
import React, { JSX } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "100px",
    [theme.breakpoints.up("sm")]: { maxWidth: "450px" },
    boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px"
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    //height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: { padding: theme.spacing(4) },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(0, 6.10%, 90.40%), hsl(0, 0.00%, 100.00%))",
        backgroundRepeat: "no-repeat"
    }
}));

export default function SignIn(): JSX.Element {
    const { user, loginUser, error } = useAuth();
    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (error === null && user) void navigate("/dashboard");
    }, [error, navigate, user]);

    interface LocationState {
        signupSuccess?: boolean;
    }

    const location = useLocation();
    const state = location.state as LocationState | null;
    const signupSuccess = state?.signupSuccess;

    React.useEffect(() => {
        if (signupSuccess === true) setOpenSnackbar(true);
    }, [signupSuccess]);

    const handleCloseSnackbar = (): void => {
        setOpenSnackbar(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (usernameError || passwordError) return;

        const data = new FormData(event.currentTarget);
        const username = data.get("username") as string;
        const password = data.get("password") as string;

        await loginUser(username, password);
    };

    const validateInputs = (): boolean => {
        const username = document.getElementById("username") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;

        let isValid = true;

        if (!username.value) {
            setUsernameError(true);
            setUsernameErrorMessage("Please enter your username.");
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage("");
        }

        //  password.value.length < 6 --> per il sign up facciamo questo controllo
        if (!password.value) {
            setPasswordError(true);
            setPasswordErrorMessage("Please enter your password.");
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage("");
        }

        return isValid;
    };

    return (
        <SignInContainer direction="column" justifyContent="space-between">
            <Card variant="elevation">
                <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
                    Sign in
                </Typography>
                {/* Snackbar per il successo del SignUp */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <MuiAlert onClose={handleCloseSnackbar} severity="success" variant="filled">
                        Account created successfully! You can now log in.
                    </MuiAlert>
                </Snackbar>
                {error !== null && <Alert severity="error">{error.toString()}</Alert>}
                <Box
                    component="form"
                    onSubmit={(event) => {
                        void handleSubmit(event);
                    }}
                    noValidate
                    sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
                >
                    <FormControl>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <TextField
                            error={usernameError}
                            helperText={usernameErrorMessage}
                            id="username"
                            type="username"
                            name="username"
                            placeholder="your username"
                            autoComplete="username"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={usernameError ? "error" : "primary"}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            name="password"
                            placeholder="••••••"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={passwordError ? "error" : "primary"}
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={validateInputs}
                        sx={{ backgroundColor: "var(--maincolor)" }}
                    >
                        Sign in
                    </Button>
                </Box>
                <Divider>or</Divider>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography sx={{ textAlign: "center" }}>
                        Don&apos;t have an account? <CustomLink link="/signup" name="Sign up" color="main-color"></CustomLink>
                    </Typography>
                </Box>
            </Card>
        </SignInContainer>
    );
}
