import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import { toast } from "react-toastify";
import TextInput from "../core/Input/TextInput";
import styled from "styled-components";
import { TitleWrapper,Button } from "../../molecules"
import { Box, Flex} from "../../elements";

const validationSchema = yup.object({
  username: yup.string().required().min(3).max(30),
  password: yup.string().required().min(8).max(30)
});

const LoginForm = () => {


  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver });

  const login = (data) => {
    axios.post('/authentications/login/', data).then(res => {
      localStorage.setItem("X-AccessToken", res.data.token.token_value)
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
        <Button type="submit" color='custom' variant='secondary' size='large'>Submit</Button>
      </Form>
    </Box>
  );
}

export default LoginForm


const Form = styled.form`

`;