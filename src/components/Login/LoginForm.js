import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import TextInput from "../core/Input/TextInput";
import { TitleWrapper, Button } from "../../molecules"
import { Box, Flex, Form } from "../../elements";
import { useContext } from "react";
import {UserContext}from "../../helpers/UserProvider";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  username: yup.string().required().min(3).max(30),
  password: yup.string().required().min(8).max(30)
});

const LoginForm = () => {

  let navigate = useNavigate();

  const {setLoggedIn} = useContext(UserContext)

  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver });

  const login = (data) => {
    axios.post('/authentications/login/', data).then(res => {
      localStorage.setItem("X-AccessToken", res.data.token.token_value)
      setLoggedIn(true)
      navigate('/')
    })
  }
  return (
    <Box >
      <Flex>
        <TitleWrapper>
          Login
        </TitleWrapper>
      </Flex>
      <Form onSubmit={handleSubmit(data => login(data))}>
        <TextInput
          label={"Username"}
          {...register("username")}
          errorMessage={errors.username?.message}
        />
        <TextInput
          label={"Password"}
          {...register("password")}
          errorMessage={errors.password?.message}
          type="password"
        />
        <Button type="submit" variant='secondary' mt='2' size='medium'>Login</Button>
      </Form>
    </Box>
  );
}

export default LoginForm