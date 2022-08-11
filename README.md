# **Personal Portfolio**
**Page:** https://uriel-spiridione.web.app/  
**API:** https://uspiri-backend.herokuapp.com/  
**FrontEnd:** https://github.com/USpiri/Portfolio_ArgPrograma/  
**BackEnd:** https://github.com/USpiri/Portfolio_ArgPrograma_Backend/  
**Backend without Image Managment:** https://github.com/USpiri/Portfolio_Backend_NoImage/  
**Preview:** https://uspiri.github.io/  
**Dev Journal:** https://github.com/USpiri/Portfolio_ArgPrograma/tree/master/Bit%C3%A1cora  
#

Este repositorio es parte de un proyecto **Full Stack**, este es la implementación de un FrontEnd hecho en Angular para el curso #YoProgramo de Argentina Programa implementando librerías como Bootstrap y SwiperJS. Esta diseñado para obtener los datos y trabajar en conjunto con la [***API Portfolio BackEnd***](https://github.com/USpiri/Portfolio_ArgPrograma_Backend/), poder iniciar sesión en caso de ser el usuario administrador y una vez logeado poder editar los datos.  
El proyecto cuenta con 9 componentes principales en donde se muestra información de la persona, los componentes tienen botones para editar la información que solo son visibles al logearse con el usuario correcto. El penúltimo componente tiene la funcionalidad (útil junto con la API) de mandar mails al correo de la persona en caso de que quien entre el Portfolio se quiera comunicar.  
También posee los Servicios necesarios para comunicarse con la API, gestionar los métodos de autenticación e intercepción de peticiones.  
Los datos de usuario para logearse, y mail ***desde*** el cual llegan los mails a nuestra cuenta se especifican dentro de la API. Solo el mail ***hacia*** el cual se mandan los datos es brindado en el Modal del componente About.  
El funcionamiento de todo el proyecto fue pensado para una rápida ejecución, sin la necesidad de registrarse en páginas de terceros, programas extra como PostMan y/o tener que introducir datos desde otro lado. Y poder adaptarse a la mayoría de los dispositivos.  

## **Diseño**  
#

![ImageAPU](/Bit%C3%A1cora/resources/uspiri.github.io.png)  

## **Getting Started with Portfolio FrontEnd**  
#

Una vez descargado el repositorio desde Github, o clonado mediante:
`gh repo clone USpiri/Portfolio_ArgPrograma`. Va a ser necesaria la instalación de la carpeta ng_modules con todos los componentes de Angular, esto ejecutando dentro de la carpeta de descarga el comando: `npm install`.

## Development server

Ejecutar `ng serve` para el servidor de desarrollo y previsualización de la app. Al finalizar la ejecución esta te brinda el url, usualmente es `http://localhost:4200/`. La aplicación se actualizará automáticamente al guardar los cambios realizados.  

## Conexión BackEnd

Para la conexión con el BackEnd es necesario brindarle la **URL** al FrontEnd en el archivo *environment.ts* ubicado en ***``src/environments/environment.ts``*** y reemplazar la url:
```typescript
export const environment = {
  production: false,
  api: "http://localhost:8080/" //  <<== YOUR API URL
};
```  

## **FrontEnd**
#

Una vez ejecutado el BackEnd y puesto en marcha el FrontEnd, lo primero es iniciar sesión y rellenar los datos.  

## Inicio de sesión y About

Para iniciar sesión se encuentra un **icono en la barra o menú** de navegación (Parte superior de la página) que abre una ventana en donde se deben ingresar el usuario y contraseña especificados al ejecutar el BackEnd. Al acceder con éxito se mostrarán botón de edición en todo el portfolio. El principal se encuentra en el componente ***“About”***, allí se podrán poner todos los datos personales, una descripción pequeña para el componente ***“Header”***, otra más larga para ***“About”***, subir dos imágenes para estos componentes, rellenar las redes sociales y el último campo es para rellenar con un link de descarga para el CV (Por ejemplo, un link de descarga por Google Drive).  
Las redes sociales están predefinidas y son: Facebook, Twitter, Instagram, Github y Linkedin.  
El botón *“Save changes”* se encargará de guardar los datos en el servidor y actualizarlos en la página.  

## Componentes Experiencia, Educación y Habilidades

El siguiente componente es ***“Experience”*** en este aparece un botón + para añadir una nueva tarjeta en el modal emergente. Antes de añadir una nueva experiencia es importante seleccionar los tipos de trabajo (JobTypes), para esto existe un botón dentro del modal de ***“Experience”*** que dirige hacia otra ventana en donde aparece una Tabla con Tipos de trabajo y un campo para añadir nuevos. Al añadirlos estos se actualizan automáticamente.  
Con tipo de trabajos se hace referencia a que si son a tiempo completo (Full-Time), medio tiempo (Part-Time), estacional (Seasonal), etc.  
Ahora sí se pasa a agregar la tarjeta de experiencia, en caso de ser actual se clickea el checkbox y tanto la interfaz como los datos van a tomar este cambio y acomodarse a ello. También es posible subir una imagen y un link del establecimiento donde se obtuvo experiencia si es que lo tiene. Nuevamente, el botón *“Save Changes”* se encarga de actualizar los datos. 
Cada tarjeta cuenta con dos botones, uno para eliminar y otro para editar. El proceso de eliminación es directo y el de edición es mediante un nuevo modal.  
El componente ***“Education”*** es bastante similar al de experiencia, con la única salvedad que este no tiene “tipos de trabajo” o variables obligatorias del estilo.  
Para ***“Skills”*** (Habilidades), es mas simple. El botón “+” es para agregar una nueva habilidad. En ella se pide un Icon (Icono) que debe ser buscado en la página [Fontawesome](https://fontawesome.com/). Por ejemplo, si se quiere agregar un icono de reloj, lo primero que habría que hacer es buscarlo en esta página y ella nos va a devolver el siguiente componente:  

```html
<i class="fa-solid fa-alarm-clock"></i>
```  

Del cual **solo se debe agregar la clase**, es decir: **`fa-solid fa-alarm-clock`**.  
El botón de edición abre una ventana para cambiar los datos y en la misma ventana es posible eliminar la tarjeta de habilidad.  

## Componente Proyectos  

Este componente cuenta con un carrusel en donde se van a mostrar automáticamente los diferentes proyectos que se agreguen. Para agregar un nuevo proyecto, al lado del título existe el botón que abre el Modal de proyectos. Para editar o eliminar dentro del Modal existe un botón que nos lleva a otra ventana con una lista de proyectos en donde es posible realizar estas acciones.  

## Componentes Contacto y Footer

En estos últimos componentes **no se edita información**, solo se obtiene y/o se actualiza de los componentes anteriores.  
***“Contact”*** tiene la finalidad de que, para quien visite el Portfolio y quiera, contactarse con el dueño pueda hacerlo desde este lugar. La implementación de este componente se complementa con el BackEnd, a que este último el que se encarga de hacer el envío con la información que se ponga en el formulario de contacto.  
Y por último ***“Footer”*** que contiene los links de las redes sociales especificadas en ***“About”***.

## Construcción

Ejecutar `ng build` para compilar el proyecto, este se guarda en `/dist/`.

## Más Angular  

Para obtener más información sobre el funcionamiento de Angular, dirigirse a ["Angular CLI Overview and Command Reference"](https://angular.io/cli) o ejecutar `ng help`.