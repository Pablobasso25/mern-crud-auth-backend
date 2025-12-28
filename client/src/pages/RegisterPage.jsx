import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const { signup, user } = useAuth();
  console.log(user);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Usuario"
          />
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          <button
            type="submit"
            className="bg-sky-500 px-4 py-2 rounded-md my-2 w-full"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
