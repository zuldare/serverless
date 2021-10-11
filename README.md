# Práctica Serverless

## Enunciado
El objetivo de esta práctica consiste en implementar una API REST con las tecnologías
serverless ofrecidas por AWS. En concreto, se utilizarán las siguientes:
* API Gateway
* Lambda
* DynamoDB
* SAM

La aplicación deberá ofrecer una API REST que permitirá gestionar libros, autores y
revisiones de los libros:
* Las entidades que gestionará la aplicación son Libro, Autor y Revisión
* Las operaciones de la API serán:
     * Crear un libro (título, resumen, editorial, año de publicación, id del autor)
     * Obtener un listado con el identificador y el título de cada uno de los libros.
     * Obtener toda la información de un libro determinado. Debe incluir todos los
datos de su autor y todas las revisiones del mismo.
     * Borrar un libro por su Id. Se deberán borrar sus revisiones.
     * Crear un autor (nombre, biografía, año nacimiento)
     * Obtener un listado de autores (sin libros).
     * Obtener toda la información de un autor determinado (con la información de
sus libros, pero sin los comentarios).
     * Borrar un autor.
     * Crear una revisión asociada a un libro (texto de la revisión).
     * Borrar una revisión asociada a un libro.

Para el desarrollo de la práctica se puede obtener inspiración del ejemplo
https://github.com/MasterCloudApps/3.4.Aplicaciones-nativas-de-la-nube.T2-Serverless/tree
/master/sections/4-Databases

Se deberá entregar una colección Postman con las operaciones ofrecidas por la API REST.

Se deberán entregar un README con las instrucciones necesarias para desplegar la
aplicación usando comandos SAM. También se deberán incluir las instrucciones para borrar
completamente la aplicación

Se deberá entregar un vídeo demostrativo del uso de Postman y cómo los datos acaban en
la DynamoDB.

## Resolución

### Estructura del proyecto

### Pasos
1. Crear la app mediante SAM CLI
    ```shell 
   sam init
    ```
2. Creación de las funciones necesarias, modificación de templates, etc hasta crear la estructura anteriormente descrita.