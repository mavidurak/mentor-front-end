import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../utils/useYupValidationResolver";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  username: yup.string().required().min(3).max(30),
  password: yup.string().required().min(8).max(30)
});

const LoginForm = () => {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver });

  const login = (data) =>{
    axios.post('/authentications/login/',data).then(res=>{
      localStorage.setItem("X-AccessToken",res.data.token.token_value)
    })
  }

  return (
    <form onSubmit={handleSubmit(data => login(data))}>
      <input {...register("username")} />
      <p>{errors.username?.message}</p>
      <input {...register("password")} />
      <p>{errors.password?.message}</p>
      <input type="submit" />
    </form>
  );
}

export default LoginForm