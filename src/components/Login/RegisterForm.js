import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../utils/useYupValidationResolver";

const validationSchema = yup.object({
  username: yup.string().required().min(3).max(30),
  password: yup.string().required().min(8).max(30),
  name: yup.string().required().min(3).max(30),
  email: yup.string().email().required()
});

const RegisterForm = () => {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver });

  const login = (data) =>{
    axios.post('/authentications/register/',data).then(res=>{

    })
  }
  console.log()
  return (
    <form onSubmit={handleSubmit(data => login(data))}>
      <input {...register("username")} />
      <p>{errors.username?.message}</p>
      <input {...register("password")} />
      <p>{errors.password?.message}</p>
      <input {...register("name")} />
      <p>{errors.name?.message}</p>
      <input {...register("email")} />
      <p>{errors.email?.message}</p>
      <input type="submit" />
    </form>
  );
}

export default RegisterForm