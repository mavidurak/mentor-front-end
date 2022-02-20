import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../../utils/useYupValidationResolver";

const validationSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required")
});

const LoginForm = () => {
  const resolver = useYupValidationResolver(validationSchema);
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver });

  const login = (data) =>{
    console.log(data)
    axios.post('/authentications/login/',data).then(res=>{
      console.log("asd")
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <form onSubmit={handleSubmit(data => login(data))}>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>
      <input {...register("lastName")} />
      <p>{errors.lastName?.message}</p>
      <input type="submit" />
    </form>
  );
}

export default LoginForm