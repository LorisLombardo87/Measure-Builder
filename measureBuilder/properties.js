define( [], function () {
	'use strict';

	
	var testSetting = {
		ref: "props.test",
		label: "Test Setting",
		type: "string",
		expression: "optional",
		show: true
	};

	// ****************************************************************************************
	// Property Panel Definition
	// ****************************************************************************************

	// Appearance Panel
	var appearancePanel = {
		uses: "settings",
		items: {
			settings: {
				type: "items",
				label: "Settings",
				items: {
					testSetting: testSetting
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
