import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import { View, TextInput, StyleSheet, Modal, Button, Image } from 'react-native';

export const EditModal = ({ showEditModal, editPhoto, setShowEditModal, currentItem, onCancel }) => {
	// console.log('currentItem', currentItem);
	const [title, setTitle] = useState(currentItem.title);
	const [uri, setUri] = useState(null);
	const id = currentItem.id;

	const changePhotoHandler = async () => {
		const options = {
			noData: true,
		};
		await ImagePicker.launchImageLibrary(options, (response) => {
			setUri(response.uri);
			// setId(Date.now().toString());
		});
	};

	const savePhoto = () => {
		const photo = { id, uri, title };
		editPhoto(photo);
		setShowEditModal(false);
	};

	return (
		<Modal visible={showEditModal}>
			<View style={styles.wrap}>
				<Image source={{ uri: uri || currentItem.uri || currentItem.url }} style={styles.image} />
				<View style={styles.inputWrap}>
					<TextInput style={styles.input} value={title} onChangeText={setTitle} />
					<Button title="Add photo" onPress={changePhotoHandler} />
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
});
