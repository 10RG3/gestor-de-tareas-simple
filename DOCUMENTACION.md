# DOCUMENTACIÓN

## 1. Descripción del problema

El desafío consiste en desarrollar una aplicación web denominada "Gestor de Tareas Simple" que permita visualizar proyectos y gestionar las tareas asociadas a cada uno. La solución debe constar de:

- **Backend**: Una API REST desarrollada con Node.js que implemente la arquitectura hexagonal, con almacenamiento en memoria para la persistencia de datos.
- **Frontend**: Una interfaz de usuario desarrollada con Nuxt.js que interactúe con la API para presentar y manipular la información.

Los datos se estructuran en dos entidades principales:
- **Proyecto**: Entidad que contiene un identificador y un nombre.
- **Tarea**: Entidad que contiene identificador, proyecto al que pertenece, título, descripción (opcional), estado y etiquetas.

## 2. Análisis de la complejidad

### Complejidad conceptual
- **Arquitectura hexagonal**: Requiere un nivel de abstracción mayor y una comprensión clara de los principios de diseño orientado a puertos y adaptadores.
- **Gestión de relaciones entre entidades**: Es necesario mantener la integridad entre proyectos y tareas.
- **Operaciones con colecciones de datos**: Especialmente en el endpoint para encontrar tareas con etiquetas compartidas, que requiere operaciones de filtrado, intersección y unión.

### Complejidad técnica
- **Backend**: La implementación de la arquitectura hexagonal exige una estructura clara de directorios y una separación adecuada de responsabilidades.
- **Frontend**: La gestión del estado a través de un store y la actuación sobre los componentes en función de las acciones del usuario.
- **Integración frontend-backend**: La comunicación entre ambas capas debe ser fluida y manejar correctamente estados de carga y errores.

## 3. Análisis de eficiencia técnica

### Backend

#### Eficiencia de operaciones
- **Repositorios en memoria**: Para este ejercicio se utilizan colecciones en memoria, lo que proporciona un acceso rápido pero sin persistencia real. En un entorno de producción, se podría reemplazar por un adaptador de base de datos sin modificar la lógica de negocio.
- **Búsqueda por ID**: Se implementa mediante métodos `find` y `findIndex` de arrays, que tiene una complejidad O(n) en el peor caso. Para grandes volúmenes de datos, sería recomendable utilizar estructuras más eficientes como Map.
- **Operación de tareas con etiquetas compartidas**: Tiene una complejidad de O(n²) en el peor caso, donde n es el número de tareas. Para optimizar, se utilizan conjuntos (Set) para reducir el tiempo de búsqueda de tags compartidos.

#### Estructura de capas
- La arquitectura hexagonal permite:
  - Cambiar fácilmente la implementación de repositorios sin afectar a la lógica de negocio.
  - Testear la lógica de negocio de forma aislada mediante mocks de los adaptadores.
  - Mantener el dominio libre de detalles de infraestructura.

### Frontend

#### Eficiencia de renderizado
- **Componentes reutilizables**: Se han diseñado componentes Vue independientes y reutilizables, reduciendo la duplicación de código.
- **Uso de props y eventos**: La comunicación entre componentes se realiza mediante props (de padre a hijo) y eventos (de hijo a padre), siguiendo las mejores prácticas de Vue.
- **Estado centralizado con Pinia**: Permite acceder al estado desde cualquier componente sin prop drilling, lo que mejora la legibilidad y mantenibilidad.
- **Framework CSS Bulma**: Se implementó Bulma para proporcionar un sistema de diseño consistente y responsivo, acelerando el desarrollo de la interfaz sin sacrificar personalización.
- **Estilos visuales coherentes**: El uso de las clases y componentes de Bulma garantiza una interfaz visualmente coherente y profesional en toda la aplicación.

#### Eficiencia en la experiencia de usuario
- **Feedback visual**: Implementación de estados visuales distintivos para las diferentes etapas de las tareas (pendiente, en progreso, completada) mediante los componentes y clases de Bulma.
- **Navegación intuitiva**: Estructura de página clara con sidebars, tarjetas y notificaciones que aprovechan el sistema de componentes de Bulma.
- **Diseño responsivo**: Uso del sistema de grid de Bulma (columns) para asegurar que la aplicación se visualice correctamente en diferentes tamaños de pantalla.

#### Eficiencia en llamadas API
- **Carga bajo demanda**: Las tareas se cargan solo cuando se selecciona un proyecto, evitando cargar datos innecesarios.
- **Estado de carga**: Se muestran indicadores de carga durante las operaciones asíncronas para proporcionar feedback al usuario.
- **Manejo de errores**: Se capturan y muestran errores de forma amigable para el usuario.

## 4. Justificación de la solución

### Diseño arquitectónico del Backend (Arquitectura Hexagonal)

La arquitectura hexagonal, también conocida como "Puertos y Adaptadores", se ha implementado con la siguiente estructura:

#### Dominio
- **Entidades**: Representan los objetos del negocio (Project y Task).
- **Repositorios**: Definen la interfaz (puertos) para la persistencia de datos.

#### Aplicación
- **Casos de uso**: Contienen la lógica de negocio específica para cada operación.
- Los casos de uso utilizan los puertos del dominio y no dependen de detalles de implementación.

#### Infraestructura
- **Adaptadores de repositorio**: Implementan los puertos definidos en el dominio (MemoryProjectRepository y MemoryTaskRepository).
- **API**: Controladores y rutas que exponen la funcionalidad al exterior.
- **Servidor**: Configuración y puesta en marcha del servidor Express.

Esta arquitectura permite:
1. **Independencia de frameworks**: La lógica de negocio no depende de Express ni de la forma de almacenamiento.
2. **Testabilidad**: Es fácil hacer pruebas unitarias de los casos de uso mediante mocks de los repositorios.
3. **Flexibilidad**: Se puede cambiar la implementación de los repositorios (por ejemplo, a una base de datos SQL o NoSQL) sin modificar la lógica de negocio.

### Tecnologías y librerías utilizadas

#### Backend
- **Express**: Framework minimalista para crear APIs REST con Node.js. Se eligió por su simplicidad y flexibilidad.
- **CORS**: Middleware para permitir peticiones desde diferentes orígenes (necesario para la comunicación frontend-backend en entorno de desarrollo).
- **TypeScript**: Implementado para proporcionar tipado estático, mejorando la robustez del código y facilitando el mantenimiento a largo plazo.

#### Frontend
- **Nuxt.js**: Framework basado en Vue.js que proporciona una estructura de proyecto, enrutamiento automático y otras características útiles.
- **Pinia**: Gestor de estado para Vue, elegido por su integración con la Composition API y su simplicidad comparado con Vuex.
- **Composition API**: API de Vue 3 que permite una organización del código más orientada a funciones y facilita la reutilización de lógica.
- **Bulma**: Framework CSS modular y ligero que proporciona componentes y utilidades prediseñados sin imponer JavaScript. Elegido por su flexibilidad, simplicidad y su capacidad para integrarse perfectamente con frameworks como Vue.
- **TypeScript**: Implementado para proporcionar tipado estático, mejorando la robustez del código y facilitando el mantenimiento a largo plazo.

### Implementación del endpoint GET /api/tasks/with-shared-tags

Este endpoint es el más complejo del sistema y su implementación se basa en los siguientes pasos:

1. **Obtención de tareas**: Se recuperan las tareas de ambos proyectos.
2. **Extracción de tags**: Se crea un conjunto (Set) con todos los tags de cada proyecto.
3. **Filtrado de tareas**: Se seleccionan las tareas del proyecto A que comparten al menos un tag con alguna tarea del proyecto B, y viceversa.
4. **Combinación de resultados**: Se combinan ambos conjuntos de tareas, evitando duplicados.

El algoritmo en pseudocódigo es:

```
function findTasksWithSharedTags(projectAId, projectBId):
    tasksA = tareas del proyecto A
    tasksB = tareas del proyecto B
    
    tagsA = conjunto de todos los tags de tasksA
    tagsB = conjunto de todos los tags de tasksB
    
    tasksFromAWithSharedTags = tareas de A donde al menos un tag está en tagsB
    tasksFromBWithSharedTags = tareas de B donde al menos un tag está en tagsA
    
    return combinar(tasksFromAWithSharedTags, tasksFromBWithSharedTags) sin duplicados
```

Esta implementación tiene una complejidad temporal de O(n + m), donde n es el número de tareas del proyecto A y m el número de tareas del proyecto B. El uso de conjuntos (Set) para los tags mejora la eficiencia de las operaciones de búsqueda.

## 5. Conclusiones

### Logros
- Se ha implementado una aplicación funcional que cumple con todos los requisitos del desafío.
- La arquitectura hexagonal en el backend proporciona una separación clara de responsabilidades y facilita el mantenimiento y la extensión.
- La interfaz de usuario es intuitiva y responde dinámicamente a las acciones del usuario.

### Dificultades encontradas
- La implementación correcta de la arquitectura hexagonal requiere una comprensión profunda de sus principios y una estructura de directorios bien organizada.
- El manejo del estado en el frontend y la sincronización con el backend después de operaciones de creación o actualización.
- La implementación eficiente del algoritmo para encontrar tareas con etiquetas compartidas, especialmente la optimización para evitar redundancias y mejorar el rendimiento.

### Posibles mejoras y extensiones
- **Persistencia real de datos**: Implementar adaptadores para utiliazar algún motor de bases de datos.
- **Autenticación y autorización**: Añadir un sistema de usuarios con diferentes niveles de acceso.
- **Mejoras en la UI**: Añadir funcionalidades como drag & drop para cambiar el estado de las tareas o filtros avanzados.
- **Pruebas unitarias y de integración**: Implementar tests para garantizar la calidad del código y facilitar el mantenimiento.
- **Despliegue en la nube**: Configurar CI/CD y desplegar la aplicación en servicios como AWS, GCP, etc.