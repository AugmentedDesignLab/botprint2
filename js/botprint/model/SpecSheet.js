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
		height: 5,
		holeEdge: 20,
		punchHoleRadius: 5,
		holeDistance: 20
	},

	parts : {
		microcontroller: [
			{name: "MC", width:20, height:15}
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
			{name: "BP1", width:45, height:35}
		],

		motor: [
			{name: "MT1", width:15, height:15}
		]
	}
};
