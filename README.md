# Sistema de Votaciones

## Descripción 

Crea un API RESTful para gestionar un sistema de votaciones. El sistema debe manejar a los votantes y los candidatos, asegurar que cada votante pueda emitir un único voto, y proporcionar estadísticas sobre los resultados de la votación.
## Requerimientos
 1.  Lenguaje y Frameworks: Nodejs Express
 2.  Base de Datos:  Utiliza una base de datos SQL (MySQL, PostgreSQL) o NoSQL (MongoDB).
 3.  Modelo de Datos:

-  Voter (Votante):
  id: ID único (autogenerado).
  name: Nombre del votante (cadena, obligatorio).
  email: Correo electrónico único (cadena, obligatorio).
  has_voted: Booleano que indica si ya ha votado (por defecto: false).

-  Candidate (Candidato):
  id: ID único (autogenerado).
  name: Nombre del candidato (cadena, obligatorio).
  party: Partido político del candidato (cadena, opcional).
  votes: Número de votos recibidos (por defecto: 0).

- Vote (Voto):
  id: ID único (autogenerado).
  voter_id: ID del votante (relación).
  candidate_id: ID del candidato seleccionado (relación).
  
4. Restricciones:
- Un votante no puede ser registrado como candidato y viceversa.
- Cada votante puede emitir un único voto.
- Los votos deben ser contados correctamente en las estadísticas.

## Modelo relacional de la base de datos

![ModeloER](https://github.com/user-attachments/assets/3caacc32-7d00-4745-a440-7901707dcb4d)

## Resultados
Más ejemplos adjuntos al final del archivo

### Endpoints de la APIRestFul
![image](https://github.com/user-attachments/assets/9d61fd79-0b9e-4f76-851b-d9694f5305d1)

## Despliegue
El proyecto fue desplegado en AWS, el cual se puede encontrar en 
[sistema de votaciones](http://54.87.130.78/v1/api/docs/) SUJETO A DISPONIBILIDAD

## Ejecucion del proyecto

### Consideraciones:
- Tener docker instalado y ejecutando en la máquina

Para ejecutar el proyecto solo es ejecutar el siguiente comando desde el cmd en la carpeta raíz

```sh
docker-compose up
```
### Configurar BD:
Luego de esto se creará una base de datos a la cual se puede acceder desde un SGBD como heidi SQL o SQLWorkbench. 
- Los credenciales están en el archivo .env
Ejecutar el script en la base de datos. (src/scripts)

### Probar el proyecto
Si todo salió bien, el proyecto está corriendo en [localhost:3000](http://localhost:3000/).
Para acceder a la documentación entras a [/v1/api/docs/#/](http://localhost:3000/v1/api/docs/#/)

### Ejemplos
Obtener Candidatos
![image](https://github.com/user-attachments/assets/f18dbbdd-6a27-47d0-b2c3-5d3f1ee8ce4d)

Obtener Votantes
![image](https://github.com/user-attachments/assets/cb0e3675-d22f-465a-ac7b-e6728ac4fe01)

Obtener votos realizados
![image](https://github.com/user-attachments/assets/e880a915-59fd-4bf3-8279-81db2e5469bc)

Iniciar sesión
![auth](https://github.com/user-attachments/assets/5593bfda-b2dc-4005-b525-48569d701458)

Obtener estadisticas (debe enviar bearer token)
![image](https://github.com/user-attachments/assets/811c92c4-fd74-4a76-8174-9e029a0b087f)







