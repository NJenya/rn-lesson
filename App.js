import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Platform, StyleSheet } from 'react-native';

import { Navbart } from './src/components/Navbar';
import AsyncStorage from '@react-native-community/async-storage';
import { MainScreen } from './src/screens/MainScreen';

const App = () => {
	const STORAGE_KEY = 'save_images';
	const [arrImg, setArrImg] = useState([]);

	const fetchData = async () => {
		const res = await fetch('https://jsonplaceholder.typicode.com/photos', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await res.json();
		const shortData = data.slice(0, 49);
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(shortData));
	};

	const readData = async () => {
		// await AsyncStorage.clear();
		const dataImg = await AsyncStorage.getItem(STORAGE_KEY);
		if (!dataImg) {
			return fetchData();
		}
		const parsedImg = JSON.parse(dataImg);
		setArrImg(parsedImg);
	};

	useEffect(() => {
		readData();
	}, []);

	const addPhoto = (photo) => {
		AsyncStorage.getItem(STORAGE_KEY).then((data) => {
			data = JSON.parse(data);
			const newData = [photo, ...data];
			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
		});
		// readData();
	};

	const editPhoto = (photo) => {
		AsyncStorage.getItem(STORAGE_KEY).then((data) => {
			const newData = JSON.parse(data).map((item) => {
				if (item.id === photo.id) {
					item.title = photo.title;
				}
				return item;
			});
			// console.log('newData', newData);
			// const newData = [photo, ...data];
			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
		});
		readData();
	};

	// console.log('arrImg', arrImg);

	return Platform.OS === 'ios' ? (
		<SafeAreaView style={styles.topSpacingApp} forceInset={{ top: 'always' }}>
			<StatusBar hidden={false} barStyle={'dark-content'} />
			{/* ios */}
			<Navbart />
			<MainScreen arrImg={arrImg} addPhoto={addPhoto} editPhoto={editPhoto} />
		</SafeAreaView>
	) : (
		<>{/* android */}</>
	);
};

const styles = StyleSheet.create({
	topSpacingApp: {
		flex: 1,
		paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
	},
	content: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

export default App;
