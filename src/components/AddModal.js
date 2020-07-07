import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Image, Button, Modal } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export const AddModal = ({ showAddModal, onCancel, addPhoto, setShowAddModal }) => {
	const [title, setTitle] = useState('');
	const [uri, setUri] = useState(' ');
	const [id, setId] = useState('');
	// console.log('uri', uri);
	// console.log('title', title);
	// console.log('id', id);

	const addPhotoHandler = async () => {
		const options = {
			noData: true,
		};
		await ImagePicker.launchImageLibrary(options, (response) => {
			setUri(response.uri);
			setId(Date.now().toString());
		});
	};

	const savePhoto = () => {
		const photo = { id, uri, title };
		addPhoto(photo);
		setShowAddModal(false);
	};

	return (
		<Modal visible={showAddModal} animationType="slide" transparent={false}>
			<View style={styles.wrap}>
				<Image source={{ uri: uri }} style={styles.image} />
				<View style={styles.inputWrap}>
					<TextInput style={styles.input} value={title} onChangeText={setTitle} />
					<Button title="Add photo" onPress={addPhotoHandler} />
				</View>
				<View style={styles.buttons}>
					<Button title="Cancel" onPress={onCancel} color="red" />
					<Button title="Save" onPress={savePhoto} />
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 300,
		height: 300,
		marginBottom: 10,
	},
	inputWrap: {
		width: '80%',
		margin: 10,
		flexDirection: 'row',
	},
	input: {
		padding: 10,
		borderBottomColor: 'black',
		borderBottomWidth: 2,
		width: '80%',
	},
	buttons: {
		width: '100%',
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});
