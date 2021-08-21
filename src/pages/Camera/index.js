import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
  PermissionsAndroid,
  Platform,
  Image
} from "react-native";
import { RNCamera } from "react-native-camera";
import RNFS from 'react-native-fs';
import styles from './styles';

export default Camera = () => {

  const [camera, setCamera] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(RNCamera.Constants.FlashMode.off);
  const [imageFlash, setImageFlash] = useState(require("../../assets/flash.png"));

  // Funcao que captura a imagem
  const takePicture = async () => {
    if (camera) {
        const options = {
          quality: 0.5,
          base64: true,
          forceUpOrientation: true,
          fixOrientation: true
        };
      
        const data = await camera.takePictureAsync(options);
        setImageUri(data.uri);
      }
  }

  /* 
   * Funcao que após o preview, se o usuario desejar salvar a foto,
   * é chamada, pedindo autotização para acesso a galeria. 
   */
  const submitPicture = async () => {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      // Se o acesso para salva arquinos no dispositivo for autorizado
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const DirectoryPath = `${RNFS.DocumentDirectoryPath}/image`;

        // Cria a pasta image no diretorio de documentos
        RNFS.mkdir(DirectoryPath)
        .then(res => {
          const nameImage = imageUri.replace('file:///data/user/0/com.testlibfs/cache/Camera', '');
          const destinationPath = DirectoryPath + nameImage;

          // Se obtivermos sucesso na criação doDirectoryPath verificamos o SO
          if (Platform.OS === 'ios') {
            RNFS.copyAssetsFileIOS(imageUri, destinationPath)
              .then(res => alert('Foto salva!'))
              .catch(err => alert(err.message));
          }
          else {
            RNFS.moveFile(imageUri, destinationPath)
              .then(res => alert('Foto salva!'))
              .catch(err => { alert(err.message, err.code) });
          }
        })
        .catch(err => alert(err.message))
      }
      else alert('Permissão negada');

    setImageUri(null);
  };

  const changeCameraType = () => {
    if (cameraType === RNCamera.Constants.Type.back) setCameraType(RNCamera.Constants.Type.front); 
    else setCameraType(RNCamera.Constants.Type.back);
  }

  const changeCameraFlash = () => {
    if (cameraFlash === RNCamera.Constants.FlashMode.off) setCameraFlash(RNCamera.Constants.FlashMode.on);
    else setCameraFlash(RNCamera.Constants.FlashMode.off);

    if (imageFlash === require("../../assets/flash.png")) setImageFlash(require("../../assets/FlashOn.png"));
    else setImageFlash(require("../../assets/flash.png"));
  }

  return !!imageUri ? (
    /* Preview da imagem... 
     * Onde podemos salva-la, chamando a função submitPicture().
     * Ou podemos tirar uma outra foto, atribuindo null ao imageUri
     * e retornando para a camera 
     */
    <>
      <ImageBackground style={styles.preview} source={{ uri: imageUri }}>
        <View style={styles.buttonsPreview}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setImageUri(null)}
          >
            <Text style={styles.buttonText} >Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => submitPicture()}
          >
            <Text style={styles.buttonText} >Salvar</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  ) : (
      /* Camera */
      <RNCamera
        ref={(camera) => setCamera(camera)}
        style={styles.camera}
        type={cameraType}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={cameraFlash}
      >
        {/* Botão responsável por disparar a função takePicture()
        responsável por capturar a imagem */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={changeCameraFlash} style={styles.buttonFlashCam}>
            <Image source={imageFlash} />
          </TouchableOpacity>

          <TouchableOpacity onPress={takePicture} style={styles.buttonTakePicture}>
            <Text style={styles.buttonText}> Capturar </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={changeCameraType} style={styles.buttonChangePositionCam}>
            <Image source={require("../../assets/Daco.png")} />
          </TouchableOpacity>
        </View>
      </RNCamera>
    );
}
