import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import TextInput from "../core/Input/TextInput";
import { TitleWrapper, Button } from "../../molecules"
import { Box, Flex, Form } from "../../elements";

const validationSchema = yup.object({
  username: yup.string().required().min(3).max(30),
  password: yup.string().required().min(8).max(30),
  name: yup.string().required().min(3).max(30),
  email: yup.string().email().required()
});

const RegisterForm = () => {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver });

  const login = (data) => {
    axios.post('/authentications/register/', data).then(res => {

    })
  }

  return (
    <Box >
      <Flex>
        <TitleWrapper>
          Register
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
        <TextInput
          label={"Name"}
          {...register("Name")}
          errorMessage={errors.name?.message}
        />
        <TextInput
          label={"email"}
          {...register("email")}
          errorMessage={errors.email?.message}
          type="email"
        />
        <Button type="submit" variant='secondary' mt='2' size='medium'>Register</Button>
      </Form>
    </Box>
  );
}

export default RegisterForm