import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import { toast } from "react-toastify";
import TextInput from "../core/Input/TextInput";
import styled from "styled-components";

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
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default LoginForm

const Button = styled.button`
  padding: 10px;
  margin: 1em;
  font-weight: 900;
  border:0px;
  border-radius: 5px;
  &:active {
        outline: none;
        box-shadow: 0px 0px 2px gray;
    }
`;

const Form = styled.form`
  padding: 10px;
  margin: 10px;
`;