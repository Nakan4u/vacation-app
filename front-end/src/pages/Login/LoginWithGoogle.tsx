import { type FC } from "react";
import Button from "@mui/material/Button";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { UserInfo, setUser } from "store/userSlice";
import { useAppDispatch } from "hooks/hooks";
import { BASE_API_URL, createUser } from "services/api";

const LoginWithGoogle: FC<{ users: UserInfo[] }> = ({ users }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onGoogleAuth = (data: any) => {
    const { access_token } = data;
    if (access_token) {
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
          },
        },
      )
        .then((res: any) => res.json())
        .then((data) => {
          const userData: UserInfo = {
            firstName: data.given_name,
            lastName: data.family_name,
            email: data.email,
            birthDate: "1991-08-24", // user will provide it later
            phoneNumber: "911911", // user will provide it later
            role: "WORKER",
            organization: `${BASE_API_URL}/organizations/1`, // "ITstep",
            _links: data._links,
          };
          // check if user exists in DB
          const userFromDB = users.find(
            (user: UserInfo) => user.email === data.email,
          );
          if (userFromDB) {
            return userFromDB;
          } else {
            createUser(userData);
            return userData;
          }
        })
        .then((data: UserInfo) => {
          dispatch(setUser(data));
          navigate("/dashboard");
        })
        .catch((err: any) => console.log(err));
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse: any) => onGoogleAuth(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <Button variant="contained" onClick={() => login()}>
      Sign In with Google
    </Button>
  );
};

export default LoginWithGoogle;
