
// Se exporta una función llamada 'validateSchema'. Esta es una función de orden superior (higher-order function),
// lo que significa que es una función que devuelve otra función.
// Recibe como parámetro un 'schema' de Zod, que define la estructura y las reglas de validación de los datos esperados.
export const validateSchema = (schema) => (req, res, next) => {
  try {
    // Aquí se intenta validar el cuerpo de la solicitud (`req.body`) contra el esquema de Zod proporcionado.
    // El método `.parse()` de Zod hace dos cosas:
    // 1. Si los datos en `req.body` son válidos (cumplen con las reglas del `schema`), la ejecución continúa sin problemas.
    // 2. Si los datos son inválidos, `.parse()` lanza una excepción (un error) que será capturada por el bloque `catch`.
    schema.parse(req.body);

    // Si la validación fue exitosa y no se lanzó ningún error, se llama a `next()`.
    // `next()` es una función de Express que pasa el control al siguiente middleware en la cadena,
    // que usualmente es el controlador final de la ruta (por ejemplo, `register`, `login`, etc.).
    next();
  } catch (error) {
    // Este bloque se ejecuta solo si `schema.parse()` falla y lanza un error.
    // El objeto `error` que Zod genera contiene una propiedad `issues`, que es un array con detalles
    // sobre cada uno de los campos que no pasaron la validación.

    // Se responde al cliente con un código de estado HTTP 400 (Bad Request),
    // indicando que la solicitud no se pudo procesar debido a datos incorrectos enviados por el cliente.
    // En el cuerpo de la respuesta (en formato JSON), se envía un array de mensajes de error.
    // Esto se logra mapeando el array `error.issues` y extrayendo únicamente el mensaje (`error.message`) de cada problema,
    // lo que resulta en un formato limpio y fácil de usar para el frontend.
    // Ejemplo de respuesta: ["El nombre de usuario es requerido", "La contraseña debe tener al menos 6 caracteres"]
    return res.status(400).json(error.issues.map((error) => error.message));
  }
};
