import * as React from "react";
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
import { useRegister } from "../../hooks/useRegister";
import { useNavigate } from "react-router";
import "../../index.css";
import { JSX } from "react";
import { RegisterService } from "../../services/RegisterService";
import { UserDTO } from "../../services/dto/userDTO";

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

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignUp(): JSX.Element {
    const { registerUser, error } = useRegister(new RegisterService());
    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState("");
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState("");
    const [noEqualsPasswordMessage, setNoEqualsPasswordMessage] = React.useState("");
    const navigate = useNavigate();

    const validateInputs = (): boolean => {
        const username = document.getElementById("username") as HTMLInputElement;
        const password = document.getElementById("password") as HTMLInputElement;
        const confirmPassword = document.getElementById("confirmPassword") as HTMLInputElement;

        let isValid = true;

        // Controllo username
        if (!username.value) {
            setUsernameError(true);
            setUsernameErrorMessage("Please enter your username.");
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage("");
        }

        // Controllo password sicura
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password.value)) {
            setPasswordError(true);
            setPasswordErrorMessage(
                "Password must be at least 8 characters, include an uppercase, lowercase, number and special character."
            );
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage("");
        }

        // Controllo password uguali
        if (password.value !== confirmPassword.value) {
            setNoEqualsPasswordMessage("Passwords do not match.");
            isValid = false;
        } else setNoEqualsPasswordMessage("");

        // Controllo conferma password
        if (!confirmPassword.value) {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorMessage("Please confirm your password.");
            isValid = false;
        } else {
            setConfirmPasswordError(false);
            setConfirmPasswordErrorMessage("");
        }

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        if (validateInputs() === false) return;

        const data = new FormData(event.currentTarget);
        const user = new UserDTO(data.get("username") as string, data.get("password") as string);
        const result = await registerUser(user);
        if (result) await navigate("/signin", { state: { signupSuccess: true } });
    };

    return (
        <SignUpContainer direction="column" justifyContent="space-between">
            <Card variant="elevation">
                <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
                    Sign Up
                </Typography>
                {noEqualsPasswordMessage !== "" && <Alert severity="error">{noEqualsPasswordMessage}</Alert>}

                {noEqualsPasswordMessage === "" && error !== null && <Alert severity="error">{error.toString()}</Alert>}

                <Box
                    component="form"
                    onSubmit={(event) => void handleSubmit(event)}
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
                            data-cy="signup-username-input"
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
                            data-cy="signup-password-input"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <TextField
                            error={confirmPasswordError}
                            helperText={confirmPasswordErrorMessage}
                            name="confirmPassword"
                            placeholder="••••••"
                            type="password"
                            id="confirmPassword"
                            autoComplete="current-password"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={confirmPasswordError ? "error" : "primary"}
                            data-cy="signup-passwordConfirm-input"
                        />
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ backgroundColor: "var(--maincolor)" }}
                        data-cy="signup-submit"
                    >
                        Sign up
                    </Button>
                </Box>
                <Divider>or</Divider>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography sx={{ textAlign: "center" }}>
                        Already have an account? <CustomLink link="/signin" name="Sign in" color="main-color"></CustomLink>
                    </Typography>
                </Box>
            </Card>
        </SignUpContainer>
    );
}
