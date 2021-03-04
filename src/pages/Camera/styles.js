import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },

  preview: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  buttonsPreview: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 40,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: "#3CB371",
    marginHorizontal: 20,
    marginBottom: 15,
  },

  buttonTakePicture: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 40,
    borderRadius: 20,
    elevation: 2,
    backgroundColor: "#3CB371",
    marginHorizontal: 60,
    marginBottom: 15,
  },

  buttonChangePositionCam: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderRadius: 50,
    elevation: 2,
    backgroundColor: "#F8F8F8",
    marginBottom: 15,
  },

  buttonFlashCam: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderRadius: 50,
    elevation: 2,
    backgroundColor: "#F8F8F8",
    marginBottom: 15,
  },
});

export default styles;