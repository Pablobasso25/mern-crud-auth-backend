import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).populate("user"); // Busca todas las tareas del usuario autenticado
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description, date } = req.body; //  Extrae los campos 'title', 'description' y 'date' del body de la solicitud.
  // Asume que el cliente envió JSON como { "title": "Mi tarea", "description": "Descripción", "date": "2023-12-27" }.
  // Si falta algún campo, será undefined.

  const newTask = new Task({
    // Crea una nueva instancia del modelo Task con los datos extraídos.
    title, // Asigna title
    description, // Asigna description
    date, // Asigna date
    user: req.user.id,
  });
  // newTask es un objeto temporal, aún no guardado en DB.
  const savedTask = await newTask.save(); // Guarda la nueva tarea en la DB.
  // await espera a que se complete. savedTask es la tarea guardada (con _id generado por MongoDB).
  res.json(savedTask); // Envía la tarea guardada como JSON al cliente.
  // El cliente recibe la tarea completa, incluyendo el ID.
};

export const getTask = async (req, res) => {
  // Función asíncrona para obtener una tarea por ID.
  // req: Solicitud del cliente. req.params.id contiene el ID de la URL (ej: /api/tasks/123).
  // res: Respuesta al cliente.
  const task = await Task.findById(req.params.id); // Busca en la DB la tarea con el ID especificado en la URL.
  // findById() es un método de Mongoose que busca por _id (MongoDB).
  // await espera la consulta. Si encuentra, task es el objeto; si no, null.
  if (!task) return res.status(404).json({ message: "tarea no encontrada" }); // Si no se encontró la tarea (task es null/false),
  // responde con error 404 (Not Found) y un mensaje JSON.
  res.json(task); //Si se encontró, envía la tarea como JSON al cliente.
  // El cliente recibe los detalles de esa tarea específica.
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "tarea no encontrada" });
  res.json(task);
};

export const deteleTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "tarea no encontrada" });
  res.json(task);
};
