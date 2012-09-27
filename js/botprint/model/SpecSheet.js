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
				{name: "LS1", width:20, height:10}
			],

			motion: [
				{name: "MS1", width:30, height:10}
			]
		},

		power: [
			{name: "PA1", width:20, height:10}
		],

		batteryPack: [
			{name: "BP1", width:100, height:80}
		],

		motor: [
			{name: "MT1", width:70, height:40}
		]
	}
};
