# Reponic_App
App to Request Services From Reponic


# Instrucciones para testear

1) Tener descargado y configurado React-Native para el desarrollo de Apps en Android. Seguir la guía de React-Native CLI para Android en este link: http://facebook.github.io/react-native/docs/getting-started

2) Descargar google-services.json del proyecto en Firebase y pegarlo en la carpeta android/app del proyecto. Ver la sección "Cómo obtener el archivo de configuración de tu app de Android" de este link: https://support.google.com/firebase/answer/7015592?hl=es-419

3) Preparar el dispositivo Android donde se vaya a probar (emulador o físico). Si es físico, asegurarse que USB Debugging esté activado en la configuración del teléfono. Ver este link y la sección "Depuración": https://developer.android.com/studio/debug/dev-options?hl=es-419

4) Abrir en el root del proyecto una consola (cmd) y ejecutar el comando "react-native run-android" y esperar a que se haga build de la aplicación. Al ejecutar el comando debería abrirse otra consola donde está el servidor que permite compilar los cambios en tiempo real. Si al probarlo con un dispositivo físico por alguna razón esta consola se cierra sola, ejecutar en el root del proyecto el comando "adb reverse tcp:8081 tcp:8081" y ejecutar nuevamente "react-native run-android"

5) Una vez terminado el build, realizar Sign Up/Login en la App y verificar que la autenticación del usuario se guarde en la sección "Authentication" de Firebase y que la información del formulario se guarde en la sección "Databases" de Firebase.

# Instrucciones para hacer build del release APK

Antes de poder hacer el primer build del APK, fue necesario crear un key que contenga información acerca de la app (nombre, por quien fue realizada, contraseña, etc), ya que cada app que vaya a ser subida a Google Play Store debe estar firmada con una key. Para crear la key, se corrió el siguiente comando en la carpeta C:\Program Files\Java\*TuVersionDeJava*\bin:

keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

El archivo generado "my-release-key.keystore" fue añadido al directorio /android/app de la aplicación. Luego de esto, desde el directorio /android del proyecto, se ejecutó el comando "gradlew/assembleRelease" para crear el archivo APK que se generó en el directorio android/app/build/outputs/apk/release/app-release.apk

Cabe destacar que no es necesario generar una key cada vez que se quiera hacer un nuevo build. Una vez la primera key es añadida al directorio mencionado anteriormente, simplemente se hace "gradlew assembleRelease" para hacer un nuevo build del APK.
