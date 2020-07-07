import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Navbart = () => (
	<View style={styles.wrapper}>
		<Text style={styles.title}>Lessons App</Text>
	</View>
);

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: 'black',
		height: 70,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: 'white',
		fontSize: 22,
	},
});
