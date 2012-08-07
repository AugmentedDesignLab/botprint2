/**
 * Specification of each part
 * @author Zhongpeng Lin
 */
var SpecSheet = {
	wheel: {
		width: 30,
		radius: 30
	},

	chassis: {
		height: 50
	},

	parts : {
		microcontroller: [
			{name: "MC", width:100, height:80}
		],

		sensor: {
			light:  [
				{name: "LS1", width:20, height:10},
				{name: "LS2", width:20, height:10},
				{name: "LS3", width:20, height:10},
				{name: "LS4", width:20, height:10},
				{name: "LS5", width:20, height:10},
				{name: "LS6", width:20, height:10},
				{name: "LS7", width:20, height:10},
				{name: "LS8", width:20, height:10},
				{name: "LS9", width:20, height:10},
				{name: "LS10", width:20, height:10}

			],

			motion: [
				{name: "MS1", width:30, height:10},
				{name: "MS2", width:30, height:10},
				{name: "MS3", width:30, height:10},
				{name: "MS4", width:30, height:10},
				{name: "MS5", width:30, height:10}
			]
		},

		power: [
			{name: "PA1", width:20, height:10},
			{name: "PA2", width:20, height:10},
			{name: "PA3", width:20, height:10}
		],

		batteryPack: [
			{name: "BP1", width:100, height:80},
			{name: "BP2", width:100, height:80}
		],

		motor: [
			{name: "MT1", width:70, height:40},
			{name: "MT2", width:70, height:40},
			{name: "MT3", width:70, height:40},
			{name: "MT4", width:70, height:40}
		]
	}
};
