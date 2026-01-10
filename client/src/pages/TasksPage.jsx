import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";

const TasksPage = () => {
  const { getTasks, tasks } = useTasks();

  // apenas cargue el componente, que cargue las tareas
  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return <h1>No hay tareas</h1>;

  //le indico que quiero recorrer las tareas y por cada recorrido me muestre la lista de tareas que tiene cada usuario
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-1">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
};

export default TasksPage;
