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

3. Construcción de la app
   ```shell
   sam build  
   ```
4. Arrancar DynamoDB en modo local
    ```shell
    docker run -p 8000:8000 amazon/dynamodb-local
    ```
5. Crear tabla authors
    ```shell
    aws dynamodb create-table --table-name authors --attribute-definitions AttributeName=authorid,AttributeType=S --key-schema AttributeName=authorid,KeyType=HASH --billing-mode PAY_PER_REQUEST --endpoint-url http://127.0.0.1:8000
    ```
6. Crear tabla books
   ```shell
     aws dynamodb create-table --table-name books --attribute-definitions AttributeName=bookid,AttributeType=S --key-schema AttributeName=bookid,KeyType=HASH --billing-mode PAY_PER_REQUEST --endpoint-url http://127.0.0.1:8000
   ```
7. Crear tabla reviews
   ```shell
     aws dynamodb create-table --table-name reviews --attribute-definitions AttributeName=reviewid,AttributeType=S --key-schema AttributeName=reviewid,KeyType=HASH --billing-mode PAY_PER_REQUEST --endpoint-url http://127.0.0.1:8000
   ```

8. Lanzamos la aplicación en local 
    ```shell
    sam local start-api 
    ```
9. Se comprueba que ejecutando en local las peticiones postman funcionan correctamente
10. Se despliega la aplicación en AWS
    ```shell
    sam deploy --guided
    ```
11. Una vez probados los endpoints se debe borrar el stack:
    * Desde la consola AWS se vacían los buckets creados
    * Desde la consola AWS se borran los stacks creados
    * Desde la consola AWS se borran los *logs groups*
    * Lanzamos el siguiente comando desde AWS Cli 
    ```shell
    aws cloudformation delete-stack  --stack-name sam-app --region us-east-1
    ```
    * El stack interno se deberá borrar a mano desde la consola AWS