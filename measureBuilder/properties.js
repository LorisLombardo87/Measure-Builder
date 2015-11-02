define( [], function () {
	'use strict';

	
	var lang = {
		ref: "props.lang",
		label: "Select Language",
		type: "string",
		show: true,
		component: 'dropdown',
		defaultValue: 'd',
		options: [
			{
				value: "d",
				label: "Autodetect Language"
			}, 
			{
				value: "en",
				label: "English"
			}, 
			{
				value: "es",
				label: "Spanish"
			}, 
			{
				value: "de",
				label: "German"
			}, 
			{
				value: "fr",
				label: "French"
			}, 
			{
				value: "it",
				label: "Italian"
			}, 
			{
				value: "nl",
				label: "Dutch"
			}
		]
	};

	// ****************************************************************************************
	// Property Panel Definition
	// ****************************************************************************************

	// Appearance Panel
	var appearancePanel = {
		items: {
			settings: {
				type: "items",
				label: "Settings",
				items: {
					lang: lang
				}
			}
		}
	};

	// Return values
	return {
		type: "items",
		component: "accordion",
		items: {
			appearance: appearancePanel

		}
	};

} );
