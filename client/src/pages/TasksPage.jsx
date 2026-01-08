import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";

const TasksPage = () => {
  const { getTasks, tasks } = useTasks();

  // apenas cargue el componente, que cargue las tareas
  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return <h1>No hay tareas</h1>;

  //le indico que quiero recorrer las tareas y por cada recorrido me muestre la lista de tareas que tiene cada usuario
  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id}>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TasksPage;
