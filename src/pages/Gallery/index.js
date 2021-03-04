import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Modal
} from 'react-native';

import styles from './styles';
import RNFS from 'react-native-fs';

export default GetPhotos = () => {

  const [source, setSource] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteImage, setDeleteImage] = useState(null);

  const directory = `${RNFS.DocumentDirectoryPath}/image`;

  useEffect(() => {
    if (Platform.OS === 'android') {
      const requestLocationPermission = async () => {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Permissão de Acesso à galeria de fotos",
          },
        );

        /* Se a permissão for consedida chama loadPhoto */
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          /* Verifica se directory existe */
          RNFS.exists(directory)
            .then(loadPhoto())
            .catch(err => { 
              console.log(err.message) 
              alert('Diretório não encontrado')
            })
        }
        else {
          alert('Acesso a Galeria negada.');
        }
      }
      requestLocationPermission();
    }
  }, []);

  /* Faz a leitura do directory e se for diferente de 0
  passamos por cada item do array, filtrando cada item pelo seu path e 
  atribuindo no setSource */
  const loadPhoto = () => {
    RNFS.readDir(directory)
      .then((result) => {
        if (result.length != 0) {
          const resultFilter = [];
          result.filter((item) => {
            resultFilter.push(item.path);
          })

          setSource(resultFilter);
        }
      })
      .catch((err) => alert(err.message))
  }

  const deletePhoto = () => {
    const imagePath = 'file://' + deleteImage.item;
    const imageIndex = deleteImage.index

    RNFS.unlink(imagePath)
      .then(() => {
        const newSource = [...source];
        newSource.splice(imageIndex, 1);
        setSource(newSource);
        alert('Imagem excluída!');
      })
      .catch((err) => {
        alert(err.message);
      });

    setDeleteImage(null);
    setModalVisible(false);
  }

  const showModal = (item, index) => {
    setModalVisible(true);
    setDeleteImage({ item, index });
  }

  const cancelDeleteImg = () => {
    setModalVisible(false);
    setDeleteImage(null);
  }

  /* Renderização de cada imagem presente no useState source */
  const renderImage = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        delayLongPress={1000}
        onLongPress={() => showModal(item, index)}
        style={{
          width: '33%',
          height: 150,
          margin: 1
        }}
      >
        <Image
          source={{ uri: 'file://' + item }}
          style={{
            width: '100%',
            height: 150
          }}
        />
      </TouchableOpacity>
    )
  }

  return (
    <View>
      <FlatList
        data={source}
        numColumns={3}
        renderItem={renderImage}
      />

      {/* Confirmação para o usuário se realmente queres excluir a imagem */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Deseja remover esta imagem?</Text>
            <View style={styles.modalViewButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => deletePhoto()}
              >
                <Text style={styles.textStyle}>Remover</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => cancelDeleteImg()}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}