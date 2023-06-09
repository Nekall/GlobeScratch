import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

// Context
import {AuthContext} from '../../context/Auth';

// Utils
import {sleep} from '../../utils/sleep';

const UpdateProfile = ({navigation}: any) => {
  const {userInfo, updateUser, deleteUser} = useContext(AuthContext);
  const [email, setEmail] = useState(userInfo.email);
  const [firstname, setFirstname] = useState(userInfo.firstname);
  const [lastname, setLastname] = useState(userInfo.lastname);
  const [country, setCountry] = useState(userInfo.country);
  const [saveInProgress, setSaveInProgress] = useState(false);

  const handleUpdate = async () => {
    setSaveInProgress(true);
    updateUser({
      email,
      firstname,
      lastname,
      country,
    });

    await sleep(2000);
    navigation.navigate('profile');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Supprimer mon compte',
      'Êtes-vous sûr de vouloir supprimer votre compte ?',
      [
        {
          text: 'Annuler',
          style: 'cancel',
        },
        {
          text: 'Supprimer',
          onPress: async () => {
            await deleteUser();
            await sleep(2000);
            navigation.navigate('login');
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Mon compte</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email*"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom*"
          value={firstname}
          onChangeText={setFirstname}
        />
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom*"
          value={lastname}
          onChangeText={setLastname}
        />
        <Text style={styles.label}>Pays</Text>
        <TextInput
          style={styles.input}
          placeholder="Pays*"
          value={country}
          onChangeText={setCountry}
        />
      </View>
      <View style={styles.buttonSaveBox}>
        {saveInProgress ? (
          <Text>Sauvegarde en cours...</Text>
        ) : (
          <TouchableOpacity style={styles.buttonSave} onPress={handleUpdate}>
            <Text style={styles.textButtonSave}>Sauvegarder</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.hrDangerZone} />
      <View style={styles.buttonDeleteBox}>
        <TouchableOpacity
          style={styles.buttonDelete}
          onPress={handleDeleteAccount}>
          <Text style={styles.textButtonDelete}>Supprimer mon compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#242424',
  },
  section: {
    flex: 1,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  buttonSaveBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonSave: {
    backgroundColor: '#CBA365',
    padding: 10,
    borderRadius: 5,
  },
  textButtonSave: {
    color: '#141311',
    fontSize: 16,
  },
  buttonDeleteBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonDelete: {
    backgroundColor: '#8a000093',
    padding: 10,
    borderRadius: 5,
  },
  textButtonDelete: {
    color: '#ffffff',
    fontSize: 16,
  },
  hrDangerZone: {
    borderBottomWidth: 2,
    borderBottomColor: '#8a000093',
    width: '100%',
    marginBottom: 16,
    marginTop: 48,
  },
});

export default UpdateProfile;
