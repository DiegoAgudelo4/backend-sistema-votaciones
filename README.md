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
Endpoints de la APIRestFul
![image](https://github.com/user-attachments/assets/b216f7f8-6513-45c2-82e1-e164980e23e2)


Ver votos realizados
![image](https://github.com/user-attachments/assets/fb9d55d6-5fd2-48fa-b1e5-e4df4b72440a)






