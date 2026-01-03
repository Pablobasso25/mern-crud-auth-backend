import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Consumimos signin, isAuthenticated y los errores del contexto
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Si el login es exitoso, lo enviamos a tareas
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {/* Errores del Backend (Contraseña incorrecta, usuario no existe, etc) */}
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
            {error}
          </div>
        ))}

        <h1 className="text-2xl font-bold text-white mb-4">Login</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">El email es requerido</p>
          )}

          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">La contraseña es requerida</p>
          )}

          <button
            type="submit"
            className="bg-sky-500 text-white px-4 py-2 rounded-md my-4 w-full font-bold"
          >
            Ingresar
          </button>
        </form>
        <p className="flex gap-x-2 justify-between">
        Crear una cuenta <Link to= "/register" className="text-sky-500">Registrarse</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
