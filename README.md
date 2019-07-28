# Reponic_App
App to Request Services From Reponic


# Instrucciones para testear

1) Tener descargado y configurado React-Native para el desarrollo de Apps en Android. Seguir la guía de React-Native CLI para Android en este link: http://facebook.github.io/react-native/docs/getting-started

2) Descargar google-services.json del proyecto en Firebase y pegarlo en la carpeta android/app del proyecto. Ver la sección "Cómo obtener el archivo de configuración de tu app de Android" de este link: https://support.google.com/firebase/answer/7015592?hl=es-419

3) Preparar el dispositivo Android donde se vaya a probar (emulador o físico). Si es físico, asegurarse que USB Debugging esté activado en la configuración del teléfono. Ver este link y la sección "Depuración": https://developer.android.com/studio/debug/dev-options?hl=es-419

4) Abrir en el root del proyecto una consola (cmd) y ejecutar el comando "react-native run-android" y esperar a que se haga build de la aplicación. Al ejecutar el comando debería abrirse otra consola donde está el servidor que permite compilar los cambios en tiempo real. Si al probarlo con un dispositivo físico por alguna razón esta consola se cierra sola, ejecutar en el root del proyecto el comando "adb reverse tcp:8081 tcp:8081" y ejecutar nuevamente "react-native run-android"

5) Una vez terminado el build, realizar Sign Up/Login en la App y verificar que la autenticación del usuario se guarde en la sección "Authentication" de Firebase y que la información del formulario se guarde en la sección "Databases" de Firebase.