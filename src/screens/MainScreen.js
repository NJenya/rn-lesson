import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';

import { Card } from './../ui/Card';
import { AddModal } from '../components/AddModal';
import { EditModal } from '../components/EditModal';

export const MainScreen = ({ arrImg, addPhoto, editPhoto }) => {
	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [currentItem, setCurrentItem] = useState(null);
	// console.log('arrImg', arrImg);

	return (
		<View>
			{currentItem && (
				<EditModal
					showEditModal={showEditModal}
					setShowEditModal={setShowEditModal}
					currentItem={currentItem}
					onCancel={() => setShowEditModal(false)}
					editPhoto={editPhoto}
				/>
			)}
			<AddModal
				showAddModal={showAddModal}
				onCancel={() => setShowAddModal(false)}
				setShowAddModal={setShowAddModal}
				addPhoto={addPhoto}
			/>
			<View style={styles.content}>
				<View style={styles.addButton}>
					<Button
						// onPress={onPressLearnMore}
						title="Add card"
						color="#841584"
						onPress={() => setShowAddModal(true)}
					/>
				</View>
				<FlatList
					data={arrImg}
					renderItem={({ item }) => <Card setCurrentItem={setCurrentItem} img={item} setShowEditModal={setShowEditModal} />}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	addButton: {
		marginTop: 10,
	},
});
