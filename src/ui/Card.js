import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export const Card = ({ img, setShowEditModal, setCurrentItem }) => {
	// console.log('img', img);
	return (
		<TouchableOpacity
			onPress={() => {
				setCurrentItem(img);
				setShowEditModal(true);
			}}
		>
			<View style={styles.container}>
				<View style={styles.wrapper}>
					<View>
						<Image style={styles.img} source={{ uri: img.thumbnailUrl || img.uri }} />
					</View>
					<View>
						<Text style={styles.text}>{img.title}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		// height: 100,
		// flexDirection: 'row',
	},
	wrapper: {
		padding: 10,
		// flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: 'black',
		borderWidth: 1,
		margin: 10,
		width: 150,
		height: 200,
	},
	img: {
		height: 120,
		width: 120,
	},
	text: {
		height: 30,
		margin: 5,
	},
});
