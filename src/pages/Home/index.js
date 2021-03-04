import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image
} from 'react-native';

import styles from './styles';
import RNFS from 'react-native-fs';
import Mailer from 'react-native-mail';
import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive';

export default function Home({ navigation }) {

  const [data, setData] = useState([]);

  const directoryImages = `${RNFS.DocumentDirectoryPath}/image`;

  const navigateToCamera = () => navigation.navigate("Camera");
  const navigateToGallery = () => navigation.navigate("Gallery");

  const getPhotos = () => {    
    RNFS.exists(directoryImages)
      .then(
        RNFS.readDir(directoryImages)
          .then((result) => {
            if (result.length != 0) {
              const resultFilter = [];
              result.filter((item) => {
                resultFilter.push(item.path);
              })

              const updateData = [...data];
              updateData.push(resultFilter);
              setData(resultFilter);
              zipFile();
            }
          })
          .catch((err) => alert(err.message))
      )
      .catch(err => {
        console.log(err.message)
        alert('Diretório não encontrado')
      })
  }

  const zipFile = () => {
    const zipPath = `${RNFS.DocumentDirectoryPath}/myFile.zip`;

    zip(data, zipPath)
      .then(
        Mailer.mail({
          subject: 'test',
          recipients: ['yourEmail@sysnova.com.br'],
          body: 'Backup',
          isHTML: true,
          attachments: [{
            path: zipPath,  // The absolute path of the file from which to read data.
            type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf, csv
            // mimeType - use only if you want to use custom type
            name: '',   // Optional: Custom filename for attachment
          }]
        }, (error) => { alert(error.message) })
      )
      .catch((error) => {
        console.error(error.message)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Tittle}>Welcome!</Text>
      <Image source={require("../../assets/Camera.png")} />
      <TouchableOpacity style={styles.Button} onPress={navigateToCamera} >
        <Text style={styles.TextButton}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={navigateToGallery} >
        <Text style={styles.TextButton}>Galeria de Fotos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={getPhotos} >
        <Text style={styles.TextButton}>Zipar Fotos</Text>
      </TouchableOpacity>
    </View>
  );
}