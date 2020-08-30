export const Moves: {[k: string]: ModdedMoveData} = {
	// DG-Normal Moves //
	"machjab": {
		num: -100,
		accuracy: 90,
		basePower: 0,
		damage: 20,
		category: "Physical",
		desc: "Deals 20 HP of damage to the target. Contact move.",
		shortDesc: "Always does 20 HP of damage. Contact move.",
		id: "machjab",
		name: "Mach Jab",
		pp: 20,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "sonicboom", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "DG-Normal",
	},
	"sonicjab": {
		num: -101,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		desc: "Priority +1. Contact move.",
		shortDesc: "Priority +1. Contact move.",
		id: "sonicjab",
		name: "Sonic Jab",
		pp: 30,
		priority: 1,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "quickattack", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "DG-Normal",
	},
	"tremor": {
		num: -102,
		accuracy: 85,
		basePower: 25,
		category: "Physical",
		desc: "Hits two to five times. Has a 1/3 chance to hit two or three times. If one of the hits breaks the target's substitute, it will take damage for the remaining hits. If the user has the Skill Link Ability, this move will always hit five times.",
		shortDesc: "Hits adjacent foe(s) 2-3 times in one turn.",
		id: "tremor",
		name: "Tremor",
		pp: 20,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "ancientpower", target);
		},
		flags: { protect: 1, mirror: 1 },
		multihit: [2, 3],
		secondary: null,
		target: "alladjacentfoes",
		type: "DG-Normal",
	},
	"dynamitekick": {
		num: -103,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "If this attack does not miss, the effects of Reflect, Light Screen, and Aurora Veil end for the target's side of the field before damage is calculated.",
		shortDesc: "Destroys screens, unless the target is immune.",
		id: "dynamitekick",
		name: "Dynamite Kick",
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onTryHit(pokemon) {
			// will shatter screens through sub, before you hit
			if (pokemon.runImmunity('Fighting')) {
				pokemon.side.removeSideCondition('reflect');
				pokemon.side.removeSideCondition('lightscreen');
				pokemon.side.removeSideCondition('auroraveil');
			}
		},
		secondary: null,
		target: "normal",
		type: "DG-Normal",
	},
	"spinattack": {
		num: -104,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		shortDesc: "No additional effect. Contact move.",
		id: "spinattack",
		name: "Spin Attack",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "rapidspin", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "DG-Normal",
	},
	"megatonpunch": {
		num: -105,
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		shortDesc: "10% chance to flinch the target. Contact move.",
		id: "spinattack",
		name: "Megaton Punch",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "megapunch", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "DG-Normal",
	},
	sprialdriver: {
		num: -106,
		accuracy: 90,
		basePower: 130,
		category: "Physical",
		desc: "If this attack is not successful, the user loses half of its maximum HP, rounded down, as crash damage. Pokemon with the Magic Guard Ability are unaffected by crash damage. Contact move.",
		shortDesc: "User is hurt by 50% of its max HP if it misses. Contact move.",
		id: "sprialdriver",
		name: "Sprial Driver",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "crosschop", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1, gravity: 1 },
		hasCustomRecoil: true,
		onMoveFail(target, source, move) {
			this.damage(source.baseMaxhp / 2, source, source, this.dex.getEffect('High Jump Kick'));
		},
		secondary: null,
		target: "normal",
		type: "DG-Normal",
	},
	fightingaura: {
		num: -107,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move.",
		shortDesc: "User cannot move next turn.",
		id: "fightingaura",
		name: "Fighting Aura",
		pp: 5,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "aurasphere", target);
		},
		flags: { recharge: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: {
			chance: 10,
			self: {
				boosts: {
					spa: 1,
				},
			},
		},
		target: "normal",
		type: "DG-Normal",
	},
	busterdive: {
		num: -108,
		accuracy: 100,
		basePower: 200,
		category: "Physical",
		desc: "This attack charges on the first turn and executes on the second. Raises the user's Defense by 1 stage on the first turn. If the user is holding a Power Herb, the move completes in one turn. Contact move.",
		shortDesc: "Raises user's Defense by 1 on turn 1. Hits turn 2. Contact move.",
		id: "busterdive",
		name: "Buster Dive",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "skullbash", target);
		},
		flags: { contact: 1, charge: 1, protect: 1, mirror: 1 },
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			this.boost({ def: 1 }, attacker, attacker, move);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: null,
		target: "normal",
		type: "DG-Normal",
	},

	// DG-Fire Moves //

	"spitfire": {
		num: -109,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "Has a 10% chance to burn the target.",
		shortDesc: "10% chance to burn the target.",
		id: "spitfire",
		name: "Spit Fire",
		pp: 25,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "ember", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "normal",
		type: "DG-Fire",
	},
	"heatlaser": {
		num: -110,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Has a 10% chance to burn adjacent foe(s).",
		shortDesc: "10% chance to burn adjacent foe(s).",
		id: "heatlaser",
		name: "Heat Laser",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "heatwave", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "alladjacentfoes",
		type: "DG-Fire",
	},
	"heatbreath": {
		num: -111,
		accuracy: 95,
		basePower: 65,
		category: "Physical",
		desc: "10% chance to burn / flinch. Fangs and Contact move.",
		shortDesc: "10% chance to burn / flinch. Fangs and Contact move.",
		name: "Heat Breath",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "firefang", target);
		},
		flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
		secondaries: [
			{
				chance: 10,
				status: 'brn',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "DG-Fire",
	},
	"firetower": {
		num: -112,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "Has a 10% chance to burn the target, 10% chance to flinch the target.",
		shortDesc: "10% chance to burn and flinch the target.",
		name: "Fire Tower",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "firepunch", target);
		},
		flags: { protect: 1, mirror: 1, punch: 1 },
		secondaries: [
			{
				chance: 10,
				status: 'brn',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "DG-Fire",
	},
	"redinferno": {
		num: -113,
		accuracy: 90,
		basePower: 95,
		category: "Special",
		desc: "Has a 10% chance to burn the foe(s).",
		shortDesc: "10% chance to burn the foe(s).",
		name: "Red Inferno",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "inferno", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: 'brn',
		},
		target: "allAdjacentFoes",
		type: "DG-Fire",
	},
	"magmabomb": {
		num: -114,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 10% chance to burn the target.",
		shortDesc: "Has a 10% chance to burn the target.",
		name: "Magma Bomb",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "ember", target);
		},
		flags: { bullet: 1, protect: 1, mirror: 1 },
		secondaries: [
			{
				chance: 10,
				status: 'brn',
			}, {
				chance: 10,
				volatileStatus: 'confusion',
			},
		],
		target: "normal",
		type: "DG-Fire",
	},
	"flamestorm": {
		num: -115,
		accuracy: 60,
		basePower: 95,
		category: "Special",
		desc: "Prevents the target from switching for four or five turns (seven turns if the user is holding Grip Claw). Causes damage to the target equal to 1/8 of its maximum HP (1/6 if the user is holding Binding Band), rounded down, at the end of each turn during effect. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. The effect ends if either the user or the target leaves the field, or if the target uses Rapid Spin or Substitute successfully. This effect is not stackable or reset by using this or another binding move.",
		shortDesc: "Traps and damages adjacent foe(s) for 4-5 turns.",
		name: "Flame Storm",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "magmastorm", target);
		},
		flags: { protect: 1, mirror: 1 },
		volatileStatus: 'partiallytrapped',
		secondary: null,
		target: "alladjacentfoes",
		type: "DG-Fire",
	},
	"prominencebeam": {
		num: -116,
		accuracy: 85,
		basePower: 130,
		category: "Special",
		desc: "Has a 10% chance to burn the target. 10% chance to bug the target",
		shortDesc: "10% chance to burn and bug the target.",
		name: "Prominence Beam",
		pp: 5,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "fireblast", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondaries: [
			{
				chance: 10,
				status: 'brn',
			}, {
				chance: 10,
				volatileStatus: 'bug',
			},
		],
		target: "normal",
		type: "DG-Fire",
	},
	"infinityburn": {
		num: -117,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		desc: "Has a 10% chance to burn the target. If the target lost HP, the user takes recoil damage equal to 33% the HP lost by the target, rounded half up, but not less than 1 HP.",
		shortDesc: "Has 33% recoil. 10% chance to burn. Thaws user.",
		name: "Infinity Burn",
		pp: 5,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "flareblitz", target);
		},
		flags: { protect: 1, mirror: 1, defrost: 1 },
		recoil: [33, 100],
		secondaries: [
			{
				chance: 10,
				status: 'brn',
			}, {
				chance: 10,
				volatileStatus: 'flinch',
			},
		],
		target: "normal",
		type: "DG-Fire",
	},

	// DG-Water Moves //

	"bubblebreath": {
		num: -118,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Has a 10% chance to lower adjacent foe(s) Speed by 1 stage.",
		shortDesc: "10% chance to lower adjacent foe(s) SPE by 1.",
		name: "Bubble Breath",
		pp: 20,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "bubblebeam", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "alladjacentfoes",
		type: "DG-Water",
	},
	"teardrop": {
		num: -119,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Has a 10% chance to bug the target.",
		shortDesc: "10% chance to bug the target.",
		name: "Tear Drop",
		pp: 20,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "faketears", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'bug',
		},
		target: "normal",
		type: "DG-Water",
	},
	"winterblast": {
		num: -120,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "10% chance to Freeze adjacent foe(s) + Ice DMG.",
		shortDesc: "10% chance to FRZ adjacent foe(s) + Ice DMG.",
		name: "Winter Blast",
		pp: 10,
		flags: { protect: 1, mirror: 1, distance: 1, nonsky: 1 },
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Ice', type);
		},
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "avalanche", target);
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "allAdjacentFoes",
		type: "DG-Water",
	},
	"hailspear": {
		num: -121,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "10% Freeze the target, 30% chance to lower the targets SPE + Ice DMG.",
		shortDesc: "10% FRZ target, 30% chance to lower target SPE + Ice DMG.",
		name: "Hail Spear",
		pp: 10,
		flags: { protect: 1, mirror: 1, distance: 1, nonsky: 1 },
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Ice', type);
		},
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "iceshard", target);
		},
		secondaries: [
			{
				chance: 10,
				status: 'frz',
			}, {
				chance: 30,
				boosts: {
					spe: -1,
				},
			},
		],
		target: "normal",
		type: "DG-Water",
	},
	"gigafreeze": {
		num: -122,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "10% Freeze the target + Ice DMG.",
		shortDesc: "10% Freeze the target + Ice DMG.",
		name: "Hail Spear",
		pp: 15,
		flags: { protect: 1, mirror: 1, distance: 1, nonsky: 1 },
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Ice', type);
		},
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "freezeshock", target);
		},
		thawsTarget: true,
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "DG-Water",
	},
	"waterblitz": {
		num: -123,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		name: "Water Blitz",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "scald", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "DG-Water",
	},
	"dgwaterfall": {
		num: -124,
		accuracy: 85,
		basePower: 100,
		category: "Physical",
		desc: "Has a 10% chance to flinch the foe(s). Contact move.",
		shortDesc: "10% chance to flinch the foe(s). Contact move.",
		name: "DG Waterfall",
		pp: 5,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "waterfall", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'flinch',
		},
		target: "allAdjacentFoes",
		type: "DG-Water",
	},
	"heavyrain": {
		num: -125,
		accuracy: 85,
		basePower: 110,
		category: "Special",
		desc: "Has a 10% chance to confuse the foe(s).",
		shortDesc: "10% chance to confuse the foe(s).",
		name: "Heavy Rain",
		pp: 5,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "waterspout", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'confuse',
		},
		target: "foe(s)",
		type: "DG-Water",
	},
	"aurorafreeze": {
		num: -126,
		accuracy: 90,
		basePower: 130,
		category: "Special",
		desc: "10% chance to freeze the taget. If this move is successful, the user must recharge on the following turn and cannot select a move + Ice Type DMG.",
		shortDesc: "10% FRZ, User cannot move next turn + Ice DMG.",
		name: "Aurora Freeze",
		pp: 5,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "blizzard", target);
		},
		flags: { protect: 1, mirror: 1, distance: 1, nonsky: 1, recharge: 1 },
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Ice', type);
		},
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: {
			chance: 10,
			status: 'frz',
		},
		target: "normal",
		type: "DG-Water",
	},

	// DG-Grass Moves //

	"insectplague": {
		num: -127,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Has a 40% chance to poison the target.",
		shortDesc: "40% chance to poison the target.",
		name: "Insect Plague",
		pp: 20,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "attackorder", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 40,
			status: 'psn',
		},
		target: "normal",
		type: "DG-Grass",
	},
	"poisonclaw": {
		num: -128,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		desc: "Has a 50% chance to poison the target. Contact move.",
		shortDesc: "50% chance to poison the target. Contact move.",
		name: "Poison Claw",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "crushclaw", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 50,
			status: 'psn',
		},
		target: "normal",
		type: "DG-Grass",
	},
	"dgpoisonpowder": {
		num: -129,
		accuracy: 75,
		basePower: 70,
		category: "Special",
		desc: "Poisons adjacent targets. Grass and DG-Grass are immune",
		shortDesc: "Poisons adjacent targets. Grass is immune.",
		name: "DG Poison Powder",
		pp: 35,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "poisonpowder", target);
		},
		flags: { powder: 1, protect: 1, reflectable: 1, mirror: 1 },
		secondary: {
			chance: 100,
			status: 'psn',
		},
		target: "alladjacentfoes",
		type: "DG-Grass",
	},
	"charmperfume": {
		num: -130,
		accuracy: 75,
		basePower: 70,
		category: "Special",
		desc: "Confuses adjacent targets. Grass and DG-Grass are immune.",
		shortDesc: "Confuses adjacent targets. Grass is immune.",
		name: "Charm Perfume",
		pp: 35,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "ragepowder", target);
		},
		flags: { powder: 1, protect: 1, reflectable: 1, mirror: 1 },
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		target: "alladjacentfoes",
		type: "DG-Grass",
	},
	"dangersting": {
		num: -131,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "Has a 30% chance to bug the target. Contact move.",
		shortDesc: "30% chance to bug the target. Contact move.",
		name: "Danger Sting",
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "poisonsting", target);
		},
		pp: 15,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'bug',
		},
		target: "normal",
		type: "DG-Grass",
	},
	biofield: {
		num: -132,
		accuracy: 90,
		basePower: 95,
		category: "Special",
		desc: "Has a 15% chance to poison the foe(s).",
		shortDesc: "15% chance to poison the foe(s).",
		name: "Bio Field",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "frenzyplant", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 15,
			status: 'psn',
		},
		target: "allAdjacentFoes",
		type: "DG-Grass",
	},
	"greentrap": {
		num: -133,
		accuracy: 85,
		basePower: 110,
		category: "Physical",
		desc: "Prevents the target from switching out. The target can still switch out if it is holding Shed Shell or uses Baton Pass, Parting Shot, U-turn, or Volt Switch. If the target leaves the field using Baton Pass, the replacement will remain trapped. The effect ends if the user leaves the field.",
		shortDesc: "Prevents the target from switching out.",
		name: "Green Trap",
		pp: 5,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "leafage", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			onHit(target, source, move) {
				if (source.isActive) target.addVolatile('trapped', source, move, 'trapper');
			},
		},
		target: "normal",
		type: "DG-Grass",
	},
	"rootbind": {
		num: -134,
		accuracy: 100,
		basePower: 100,
		category: "Special",
		desc: "Has a 10% chance to lower the target's Speed by 1 stage.",
		shortDesc: "10% chance to lower the target's Speed by 1.",
		name: "Root Bind",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "grassknot", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "normal",
		type: "DG-Grass",
	},
	"venomdisaster": {
		num: -135,
		accuracy: 90,
		basePower: 200,
		category: "Special",
		desc: "Targets adjacent foe(s). If this move is successful, the user must recharge on the following turn and cannot select a move.",
		shortDesc: "Targets adjacent foe(s), user cannot move next turn.",
		name: "Venom Disaster",
		pp: 5,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "sludgewave", target);
		},
		flags: { recharge: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: {
			chance: 20,
			status: 'psn',
		},
		target: "alladjacentfoes",
		type: "DG-Grass",
	},

	// DG-Electric Moves //

	"staticelectricity": {
		num: -136,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		desc: "Has a 50% chance to paralyze the target. Contact move.",
		shortDesc: "50% chance to paralyze the target. Contact move.",
		id: "staticelectricity",
		name: "Static Electricity",
		pp: 25,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "thundershock", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 50,
			status: 'par',
		},
		target: "normal",
		type: "DG-Electric",
	},
	"electricchute": {
		num: -137,
		accuracy: 100,
		basePower: 20,
		category: "Special",
		desc: "100% chance to paralyze the target.",
		shortDesc: "100% chance to paralyze the target.",
		id: "electricchute",
		name: "Electric Chute",
		pp: 20,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "nuzzle", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 100,
			status: 'par',
		},
		target: "normal",
		type: "DG-Electric",
	},
	"windcutter": {
		num: -138,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "Any target. Combines Flying in its type effectiveness.",
		shortDesc: "Any target. Combines Flying in its type effectiveness.",
		id: "windcutter",
		name: "Wind Cutter",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "airslash", target);
		},
		flags: { protect: 1, mirror: 1, distance: 1, nonsky: 1 },
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Flying', type);
		},
		target: "any",
		type: "DG-Electric",
	},
	"thunderstorm": {
		num: -139,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		desc: "Has a 10% chance to paralyze the target.",
		shortDesc: "10% chance to paralyze the target.",
		id: "thunderstorm",
		name: "Thunderstorm",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "thunderbolt", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "DG-Electric",
	},
	"confusedstorm": {
		num: -140,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "30% chance to Confuse adjacent foe(s), + Flying DMG.",
		shortDesc: "30% chance to Confuse adjacent foe(s), + Flying DMG.",
		id: "confusedstorm",
		name: "Confused Storm",
		pp: 10,
		priority: 0,
		secondary: {
			chance: 30,
			volatileStatus: 'confuse',
			onPrepareHit(target, source, move) {
				this.attrLastMove('[still]');
				this.add('-anim', source, "hurricane", target);
			},
			flags: { protect: 1, mirror: 1, distance: 1, nonsky: 1 },
			onEffectiveness(typeMod, target, type, move) {
				return typeMod + this.dex.getEffectiveness('Flying', type);
			},
		},
		target: "normal",
		type: "DG-Electric",
	},
	"spinningshot": {
		num: -141,
		accuracy: 80,
		basePower: 120,
		category: "Physical",
		desc: "Aims for foe(s) + Flying DMG.",
		shortDesc: "Aims for foe(s) + Flying DMG.",
		id: "spinningshot",
		name: "Spinning Shot",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "aircutter", target);
		},
		flags: { protect: 1, mirror: 1, distance: 1, nonsky: 1 },
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('Flying', type);
		},
		target: "allAdjacentFoes",
		type: "DG-Electric",
	},
	"megalospark": {
		num: -142,
		accuracy: 90,
		basePower: 100,
		category: "Physical",
		desc: "Has a 10% chance to paralyze the target. Contact move.",
		shortDesc: "10% chance to paralyze the target. Contact move.",
		id: "megalospark",
		name: "Megalo Spark",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "thunderpunch", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
		secondary: {
			chance: 10,
			status: 'par',
		},
		target: "normal",
		type: "DG-Electric",
	},
	"thunderjustice": {
		num: -143,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		desc: "20% Paralyze the target + DG-Fairy DMG.",
		shortDesc: "20% PAR target + DG-Fairy DMG.",
		id: "thunderjustice",
		name: "Thunder Justice",
		pp: 5,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "thunder", target);
		},
		flags: { protect: 1, mirror: 1, distance: 1, nonsky: 1 },
		onEffectiveness(typeMod, target, type, move) {
			return typeMod + this.dex.getEffectiveness('DG-Fairy', type);
		},
		secondary: {
			chance: 20,
			status: 'par',
		},
		target: "normal",
		type: "DG-Electric",
	},

	// DG-Steel Moves //

	"mechanicalclaw": {
		num: -144,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		shortDesc: "No additional effect. Contact move.",
		name: "Mechanical Claw",
		pp: 35,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "metalclaw", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "DG-Steel",
	},
	"metalsprinter": {
		num: -145,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		shortDesc: "Targets adjacent foe(s).",
		name: "Metal Sprinter",
		pp: 20,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "metalburst", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "alladjacentfoes",
		type: "DG-Steel",
	},
	"reverseprogram": {
		num: -146,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "Has a 30% chance to bug the target.",
		shortDesc: "30% chance to bug the target.",
		name: "Reverse Program",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "smartstrike", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'bug',
		},
		target: "normal",
		type: "DG-Steel",
	},
	"dgdimensionv3": {
		num: -147,
		accuracy: 90,
		basePower: 150,
		category: "Physcial",
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move. 20% chance to bug the target.",
		shortDesc: "User cannot move next turn. 20% chance to bug target.",
		name: "DG Dimension V3",
		pp: 5,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "hyperspacehole", target);
		},
		flags: { recharge: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: {
			chance: 20,
			volatileStatus: 'bug',
			target: "normal",
			type: "DG-Steel",
		},
	},

	// DG-Poison Moves //

	"odorspray": {
		num: -148,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		desc: "Has a 30% chance to flinch the target.",
		shortDesc: "30% chance to flinch the target.",
		name: "Odor Spray",
		pp: 20,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "poisongas", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "DG-Poison",
		contestType: "Tough",
	},
	"cootieskick": {
		num: -149,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		desc: "Has a 30% chance to confuse the target. Contact move.",
		shortDesc: "30% chance to confuse the target. Contact move.",
		name: "Cooties Kick",
		pp: 20,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "lowkick", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'confuse',
		},
		target: "normal",
		type: "DG-Poison",
	},
	"bigpooptoss": {
		num: -150,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		desc: "Has a 20% chance to flinch the target.",
		shortDesc: "20% chance to flinch the target.",
		name: "Big Poop Toss",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "sludgebomb", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: 'flinch',
		},
		target: "normal",
		type: "DG-Poison",
	},
	"bigrandomtoss": {
		num: -151,
		accuracy: 100,
		basePower: 95,
		category: "Physical",
		desc: "Has a 10% chance to confuse the all adjcacent targets.",
		shortDesc: "10% chance to confuse the all adjcacent targets.",
		name: "Big Random Toss",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "sludgewave", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'confuse',
		},
		target: "alladjacentfoes",
		type: "DG-Poison",
	},
	"ultimatepoophell": {
		num: -152,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Has a 10% chance to poison the target.",
		shortDesc: "10% chance to poison adjacent Pokemon.",
		name: "Ultimate Poop Hell",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "brutalswing", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: 'bug',
		},
		target: "allAdjacentfoes",
		type: "DG-Poison",
	},
	"pooptoss": {
		num: -153,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Has a higher chance for a critical hit.",
		shortDesc: "High critical hit ratio.",
		name: "Poop Toss",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "sludge", target);
		},
		flags: { protect: 1, mirror: 1 },
		critRatio: 2,
		secondary: null,
		target: "normal",
		type: "DG-Poison",
	},
	"guerillapoop": {
		num: -154,
		accuracy: 85,
		basePower: 120,
		category: "Physical",
		desc: "Has a 10% chance to lower adjacent foe(s) Speed by 1 stage.",
		shortDesc: "10% chance to lower adjacent foe(s) SPE by 1.",
		name: "Guerilla Poop",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "venoshock", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			boosts: {
				spe: -1,
			},
		},
		target: "alladjacentfoes",
		type: "DG-Poison",
	},

	// DG-Fairy Moves //

	"lightsoul": {
		num: -155,
		accuracy: 100,
		basePower: 50,
		category: "Special",
		desc: "20% chance to confuse the foe(s).",
		shortDesc: "20% chance to confuse the foe(s).",
		name: "Light Soul",
		pp: 25,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "fairywind", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
		type: "DG-Fairy",
	},

	"saintray": {
		num: -156,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "10% chance to confuse the foe(s).",
		shortDesc: "10% chance to confuse the foe(s).",
		name: "Saint Ray",
		pp: 20,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "moonblast", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: {
			chance: 10,
			volatileStatus: 'confusion',
		},
		target: "allAdjacentFoes",
		type: "DG-Fairy",
	},
	"dgflash": {
		num: -157,
		accuracy: 100,
		basePower: 95,
		category: "Special",
		desc: "Targets the foe(s).",
		shortDesc: "Targets the foe(s).",
		name: "DG Flash",
		pp: 15,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "dazzlinggleam", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "DG-Fairy",
	},
	"saintshield": {
		num: -158,
		accuracy: 85,
		basePower: 110,
		category: "Physical",
		desc: "No additional effect, Contact move.",
		shortDesc: "No additional effect, contact move.",
		name: "Saint Shield",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "gigaimpact", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "alladjacentfoes",
		type: "DG-Fairy",
	},
	"shiningnova": {
		num: -159,
		accuracy: 90,
		basePower: 150,
		category: "Special",
		desc: "If this move is successful, the user must recharge on the following turn and cannot select a move.",
		shortDesc: "User cannot move next turn.",
		name: "Shining Nova",
		pp: 5,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "hypervoice", target);
		},
		flags: { recharge: 1, protect: 1, mirror: 1 },
		self: {
			volatileStatus: 'mustrecharge',
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "DG-Fairy",
	},
	"dgjudgment": {
		num: -160,
		accuracy: 70,
		basePower: 130,
		category: "Physical",
		desc: "Targets adjacent foe(s).",
		shortDesc: "Targets adjacent foe(s).",
		name: "DG Judgment",
		pp: 5,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "judgment", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "alladjacentfoes",
		type: "DG-Fairy",
	},

	// DG-Dark Moves //

	"darkspirit": {
		num: -161,
		accuracy: 100,
		basePower: 65,
		category: "Physical",
		desc: "No additional effect. Contact move.",
		shortDesc: "No additional effect. Contact move.",
		name: "Dark Spirit",
		pp: 25,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "shadowsneak", target);
		},
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: null,
		target: "normal",
		type: "DG-Dark",
	},
	"blackout": {
		num: -162,
		accuracy: 100,
		basePower: 75,
		category: "Physical",
		desc: "Has a 30% chance to confuse the target. Contact move.",
		shortDesc: "Has a 30% chance to confuse the target. Contact move.",
		name: "Blackout",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 30,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "DG-Dark",
	},
	"dgnightmare": {
		num: -163,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		desc: "No additional effect.",
		shortDesc: "No additional effect.",
		name: "DG Nightmare",
		pp: 10,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "nightmare", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "alladjacentfoes",
		type: "DG-Dark",
	},
	"chaoscloud": {
		num: -164,
		accuracy: 85,
		basePower: 110,
		category: "Physical",
		desc: "Has a 10% chance to confuse the target.",
		shortDesc: "Has a 10% chance to confuse the target.",
		name: "Chaos Cloud",
		pp: 5,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		secondary: {
			chance: 20,
			volatileStatus: 'confusion',
		},
		target: "normal",
		type: "DG-Dark",
	},
	"shadowfall": {
		num: -165,
		accuracy: 100,
		basePower: 100,
		category: "Physical",
		desc: "Targets adjacent foe(s).",
		shortDesc: "Targets adjacent foe(s).",
		name: "Shadow Fall",
		pp: 5,
		priority: 0,
		onPrepareHit(target, source, move) {
			this.attrLastMove('[still]');
			this.add('-anim', source, "dazzlinggleam", target);
		},
		flags: { protect: 1, mirror: 1 },
		secondary: null,
		target: "allAdjacentFoes",
		type: "DG-Dark",
	},

	// DG Status Moves //

	"attackcharge": {
		num: -166,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises attack of the chosen ally or user by 1.",
		shortDesc: "Raises ATK of the chosen ally or user by 1.",
		name: "Attack Charge",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			atk: 1,
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
	},
	"attackbreak": {
		num: -167,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Lowers attack of the target by 1.",
		shortDesc: "Lowers ATK of the target by 1.",
		name: "Attack Break",
		pp: 40,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			atk: -1,
		},
		secondary: null,
		target: "Normal",
		type: "DG-Normal",
	},
	"attackbreakfield": {
		num: -168,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Lowers attack of the foe(s) by 1.",
		shortDesc: "Lowers ATK of the foe(s) by 1.",
		name: "Attack Break Field",
		pp: 40,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			atk: -1,
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "DG-Normal",
	},
	"attackchargefield": {
		num: -169,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises attack of the allies by 1.",
		shortDesc: "Raises ATK of the allies side by 1.",
		name: "Attack Charge Field",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			atk: 1,
		},
		secondary: null,
		target: "allySide",
		type: "DG-Normal",
	},
	"mentalcharge": {
		num: -170,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises Special Attack & Special Defense of the chosen ally or user by 1.",
		shortDesc: "Raises SPA & SPD of the chosen ally or user by 1.",
		name: "Mental Charge",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			spa: 1,
			spd: 1,
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
	},
	"mentalchargefield": {
		num: -171,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises special attack and special defense of allies by 1.",
		shortDesc: "Raises SPA & SPD of allies by 1.",
		name: "Mental Charge Field",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			spa: 1,
			spd: 1,
		},
		secondary: null,
		target: "allySide",
		type: "DG-Normal",
	},
	"guardcharge": {
		num: -172,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises defense of the chosen ally or user by 1.",
		shortDesc: "Raises DEF of the chosen ally or user by 1.",
		name: "Guard Charge",
		pp: 40,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: 1,
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
	},
	"guardchargefield": {
		num: -173,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises defense of the chosen allies by 1.",
		shortDesc: "Raises DEF of the chosen allies by 1.",
		name: "Guard Charge Field",
		pp: 20,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: 1,
		},
		secondary: null,
		target: "allySide",
		type: "DG-Normal",
	},
	"guardbreakfield": {
		num: -174,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Lowers defense of foe(s) by 1.",
		shortDesc: "Lowers DEF of foe(s) by 1.",
		name: "Guard Charge Field",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			def: -1,
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "DG-Normal",
	},
	"speedchargefield": {
		num: -175,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises speed of the chosen allies by 1.",
		shortDesc: "Raises SPE of the chosen allies by 1.",
		name: "Speed Charge Field",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			spe: 1,
		},
		secondary: null,
		target: "allySide",
		type: "DG-Normal",
	},
	"speedbreakfield": {
		num: -176,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "lowers speed of foe(s) by 1.",
		shortDesc: "Raises SPE of foe(s) by 1.",
		name: "Speed Break Field",
		pp: 40,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			spe: -1,
		},
		secondary: null,
		target: "allAdjacentFoes",
		type: "DG-Normal",
	},
	"agilitycharge": {
		num: -177,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises evasion of the chosen ally or user by 1.",
		shortDesc: "Raises EVA of the chosen ally or user by 1.",
		name: "Attack Charge",
		pp: 15,
		priority: 0,
		flags: { snatch: 1 },
		boosts: {
			evasion: 1,
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
	},
	"finalheal": {
		num: -178,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The user restores 1/2 of its maximum HP, rounded half up.",
		shortDesc: "Heals the user by 50% of its max HP.",
		name: "Final Heal",
		pp: 10,
		priority: 0,
		flags: { snatch: 1, heal: 1 },
		heal: [1, 2],
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
	},
	"restore": {
		num: -179,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Cures target's status; heals user 10% max HP if so, rounded half up.",
		shortDesc: "Cures target's status; heals user 10% max HP if so.",
		name: "Restore",
		pp: 10,
		priority: 0,
		flags: { protect: 1, reflectable: 1, heal: 1 },
		onHit(target, source) {
			if (!target.cureStatus()) return false;
			this.heal(Math.ceil(source.maxhp * 0.1), source);
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
	},
	"statusbarrier": {
		num: -180,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "For 5 turns, the user and its party members cannot have major status conditions or confusion inflicted on them by other Pokemon. It is removed from the user's side if the user or an ally is successfully hit by Defog. Fails if the effect is already active on the user's side.",
		shortDesc: "For 5 turns, protects user's party from status.",
		name: "Status Barrier",
		pp: 25,
		priority: 0,
		flags: { snatch: 1 },
		sideCondition: 'safeguard',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', effect);
					return 7;
				}
				return 5;
			},
			onSetStatus(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.id === 'yawn') return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if (target !== source) {
					this.debug('interrupting setStatus');
					if (effect.id === 'synchronize' || (effect.effectType === 'Move' && !effect.secondaries)) {
						this.add('-activate', target, 'move: Safeguard');
					}
					return null;
				}
			},
			onTryAddVolatile(status, target, source, effect) {
				if (!effect || !source) return;
				if (effect.effectType === 'Move' && effect.infiltrates && target.side !== source.side) return;
				if ((status.id === 'confusion' || status.id === 'yawn') && target !== source) {
					if (effect.effectType === 'Move' && !effect.secondaries) this.add('-activate', target, 'move: Safeguard');
					return null;
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Safeguard');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 2,
			onEnd(side) {
				this.add('-sideend', side, 'Safeguard');
			},
		},
		secondary: null,
		target: "allySide",
		type: "DG-Normal",
	},
	"safetyguard": {
		num: -181,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "The chosen ally or user will survive attacks made by other Pokemon during this turn with at least 1 HP. This move has a 1/X chance of being successful, where X starts at 1 and triples each time this move is successfully used. X resets to 1 if this move fails, if the user's last move used is not Baneful Bunker, Detect, Endure, King's Shield, Obstruct, Protect, Quick Guard, Spiky Shield, or Wide Guard, or if it was one of those moves and the user's protection was broken. Fails if the user moves last this turn.",
		shortDesc: "The chosen ally or user survives attacks this turn with at least 1 HP.",
		name: "Safety Guard",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'endure',
		onTryHit(pokemon) {
			return this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'move: Endure');
			},
			onDamagePriority: -10,
			onDamage(damage, target, source, effect) {
				if (effect?.effectType === 'Move' && damage >= target.hp) {
					this.add('-activate', target, 'move: Endure');
					return target.hp - 1;
				}
			},
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
	},
	"critcharge": {
		num: -182,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Raises the chosen ally or user chance for a critical hit by 2 stages. Fails if the user already has the effect. Baton Pass can be used to transfer this effect to an ally.",
		shortDesc: "Raises the chosen ally or user critical hit ratio by 2.",
		name: "Crit Charge",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: 'focusenergy',
		condition: {
			onStart(target, source, effect) {
				if (effect?.id === 'zpower') {
					this.add('-start', target, 'move: Focus Energy', '[zeffect]');
				} else if (effect && (['imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', target, 'move: Focus Energy', '[silent]');
				} else {
					this.add('-start', target, 'move: Focus Energy');
				}
			},
			onModifyCritRatio(critRatio) {
				return critRatio + 2;
			},
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
		zMove: { boost: { accuracy: 1 } },
	},
	"dispel": {
		num: -183,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Resets the stat stages of the chosen ally or user Pokemon to 0.",
		shortDesc: "Eliminates all stat changes of the chosen ally or user.",
		isViable: true,
		name: "Dispel",
		pp: 30,
		priority: 0,
		flags: { authentic: 1 },
		onHitField() {
			this.add('-clearallboost');
			for (const pokemon of this.getAllActive()) {
				pokemon.clearBoosts();
			}
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
	},
	"crosscounter": {
		num: -184,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			if (!pokemon.volatiles['counter']) return 0;
			return pokemon.volatiles['counter'].damage || 1;
		},
		category: "Physical",
		desc: "Deals damage to the last opposing Pokemon to hit the user with a physical attack this turn equal to twice the HP lost by the user from that attack. If the user did not lose HP from the attack, this move deals 1 HP of damage instead. If that opposing Pokemon's position is no longer in use and there is another opposing Pokemon on the field, the damage is done to it instead. Only the last hit of a multi-hit attack is counted. Fails if the user was not hit by an opposing Pokemon's physical attack this turn.",
		shortDesc: "If hit by physical attack, returns double damage.",
		name: "Cross Counter",
		pp: 20,
		priority: -5,
		flags: { contact: 1, protect: 1 },
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('counter');
		},
		onTryHit(target, source, move) {
			if (!source.volatiles['counter']) return false;
			if (source.volatiles['counter'].position === null) return false;
		},
		condition: {
			duration: 1,
			noCopy: true,
			onStart(target, source, move) {
				this.effectData.position = null;
				this.effectData.damage = 0;
			},
			onRedirectTargetPriority: -1,
			onRedirectTarget(target, source, source2) {
				if (source !== this.effectData.target) return;
				return source.side.foe.active[this.effectData.position];
			},
			onDamagingHit(damage, target, source, move) {
				if (source.side !== target.side && this.getCategory(move) === 'Physical') {
					this.effectData.position = source.position;
					this.effectData.damage = 2 * damage;
				}
			},
		},
		secondary: null,
		target: "scripted",
		type: "DG-Normal",
		maxMove: { basePower: 75 },
	},
	"mirrorreflection": {
		num: -185,
		accuracy: 100,
		basePower: 0,
		damageCallback(pokemon) {
			if (!pokemon.volatiles['mirrorcoat']) return 0;
			return pokemon.volatiles['mirrorcoat'].damage || 1;
		},
		category: "Special",
		desc: "Deals damage to the last opposing Pokemon to hit the user with a special attack this turn equal to twice the HP lost by the user from that attack. If the user did not lose HP from the attack, this move deals 1 HP of damage instead. If that opposing Pokemon's position is no longer in use and there is another opposing Pokemon on the field, the damage is done to it instead. Only the last hit of a multi-hit attack is counted. Fails if the user was not hit by an opposing Pokemon's special attack this turn.",
		shortDesc: "If hit by special attack, returns double damage.",
		name: "Mirror Reflection",
		pp: 20,
		priority: -5,
		flags: { protect: 1 },
		beforeTurnCallback(pokemon) {
			pokemon.addVolatile('mirrorcoat');
		},
		onTryHit(target, source, move) {
			if (!source.volatiles['mirrorcoat']) return false;
			if (source.volatiles['mirrorcoat'].position === null) return false;
		},
		condition: {
			duration: 1,
			noCopy: true,
			onStart(target, source, move) {
				this.effectData.position = null;
				this.effectData.damage = 0;
			},
			onRedirectTargetPriority: -1,
			onRedirectTarget(target, source, source2) {
				if (source !== this.effectData.target) return;
				return source.side.foe.active[this.effectData.position];
			},
			onDamagingHit(damage, target, source, move) {
				if (source.side !== target.side && this.getCategory(move) === 'Special') {
					this.effectData.position = source.position;
					this.effectData.damage = 2 * damage;
				}
			},
		},
		secondary: null,
		target: "scripted",
		type: "DG-Normal",
	},
	"antisleep": {
		num: -186,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Cures the user or allies SLP; heals 10% max HP, rounded half up.",
		shortDesc: "Cures the user or allies SLP; heals 10% max HP.",
		name: "Anti-Sleep",
		pp: 40,
		priority: 0,
		flags: { protect: 1, reflectable: 1, heal: 1 },
		onHit(target, source) {
			if (target.status === 'slp') target.cureStatus();
			this.heal(Math.ceil(source.maxhp * 0.1), source);
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
	},
	"antipoison": {
		num: -187,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Cures the user or allies PSN; heals 10% max HP, rounded half up.",
		shortDesc: "Cures the user or allies PSN; heals 10% max HP.",
		name: "Anti-Poison",
		pp: 40,
		priority: 0,
		flags: { protect: 1, reflectable: 1, heal: 1 },
		onHit(target, source) {
			if (target.status === 'psn') target.cureStatus();
			this.heal(Math.ceil(source.maxhp * 0.1), source);
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
	},
	"antiparalysis": {
		num: -188,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Cures the user or allies PAR; heals user 10% max HP if so, rounded half up.",
		shortDesc: "Cures the user or allies PAR; heals 10% max HP.",
		name: "Anti-Paralysis",
		pp: 40,
		priority: 0,
		flags: { protect: 1, reflectable: 1, heal: 1 },
		onHit(target, source) {
			if (target.status === 'par') target.cureStatus();
			this.heal(Math.ceil(source.maxhp * 0.1), source);
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
	},
	"antipanic": {
		num: -189,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Cures the user or allies confusion; heals 10% max HP, rounded half up.",
		shortDesc: "Removes user or allies confusion; heals 10% max HP.",
		name: "Anti-Panic",
		pp: 40,
		priority: 0,
		flags: { protect: 1, reflectable: 1, heal: 1 },
		onHit(target, source) {
			if (target.status === 'confusion') target.cureStatus();
			this.heal(Math.ceil(source.maxhp * 0.1), source);
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
	},
	"antibug": {
		num: -190,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Cures the user or allies bug status; heals 10% max HP, rounded half up.",
		shortDesc: "Removes user or allies bug status; heals 10% max HP.",
		name: "Anti-Bug",
		pp: 40,
		priority: 0,
		flags: { protect: 1, reflectable: 1, heal: 1 },
		onHit(target, source) {
			if (target.status === 'bug') target.cureStatus();
			this.heal(Math.ceil(source.maxhp * 0.1), source);
		},
		secondary: null,
		target: "adjacentAllyOrSelf",
		type: "DG-Normal",
	},
	"accelerationboost": {
		num: -191,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "Until the end of the next turn, the user's attacks will be critical hits.",
		shortDesc: "Until the end of the next turn, user's moves crit.",
		name: "Acceleration Boost",
		pp: 30,
		priority: 0,
		flags: { snatch: 1 },
		volatileStatus: 'laserfocus',
		condition: {
			duration: 2,
			onStart(pokemon, source, effect) {
				if (effect && (['imposter', 'psychup', 'transform'].includes(effect.id))) {
					this.add('-start', pokemon, 'move: Laser Focus', '[silent]');
				} else {
					this.add('-start', pokemon, 'move: Laser Focus');
				}
			},
			onRestart(pokemon) {
				this.effectData.duration = 2;
				this.add('-start', pokemon, 'move: Laser Focus');
			},
			onModifyCritRatio(critRatio) {
				return 5;
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'move: Laser Focus', '[silent]');
			},
		},
		secondary: null,
		target: "self",
		type: "DG-Normal",
	},
	"dgfacade": {
		num: -192,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		desc: "Power doubles if the user is burned, paralyzed, or poisoned. The physical damage halving effect from the user's burn is ignored.",
		shortDesc: "Power doubles if user is burn/poison/paralyzed.",
		name: "DG Facade",
		pp: 20,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		onBasePower(basePower, pokemon) {
			if (pokemon.status && pokemon.status !== 'slp') {
				return this.chainModify(2);
			}
		},
		secondary: null,
		target: "normal",
		type: "DG-Normal",
	},
	lgpeabsorb: {
		num: 71,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "LGPE Absorb",
		pp: 25,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	lgpemegadrain: {
		num: 72,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		desc: "The user recovers 1/2 the HP lost by the target, rounded half up. If Big Root is held by the user, the HP recovered is 1.3x normal, rounded half down.",
		shortDesc: "User recovers 50% of the damage dealt.",
		name: "LGPE Mega Drain",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Grass",
		zMove: {basePower: 120},
		contestType: "Clever",
	},
	lgpeteleport: {
		num: 100,
		accuracy: true,
		basePower: 0,
		category: "Status",
		desc: "If this move is successful and the user has not fainted, the user switches out even if it is trapped and is replaced immediately by a selected party member. The user does not switch out if there are no unfainted party members.",
		shortDesc: "User switches out.",
		name: "LGPE Teleport",
		pp: 20,
		priority: -6,
		flags: {},
		selfSwitch: true,
		onTryHit: true,
		secondary: null,
		target: "self",
		type: "Psychic",
		zMove: {effect: 'heal'},
		contestType: "Cool",
	},
	lgpeskyattack: {
		num: 143,
		accuracy: 90,
		basePower: 200,
		category: "Physical",
		desc: "Has a 30% chance to flinch the target and a higher chance for a critical hit. This attack charges on the first turn and executes on the second. If the user is holding a Power Herb, the move completes in one turn.",
		shortDesc: "Charges, then hits turn 2. 30% flinch. High crit.",
		name: "LGPE Sky Attack",
		pp: 5,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1, distance: 1},
		critRatio: 2,
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		secondary: {
			chance: 30,
			volatileStatus: 'flinch',
		},
		target: "any",
		type: "Flying",
		contestType: "Cool",
	},
	lgpesolarbeam: {
		num: 76,
		accuracy: 100,
		basePower: 200,
		category: "Special",
		desc: "This attack charges on the first turn and executes on the second. Power is halved if the weather is Hail, Primordial Sea, Rain Dance, or Sandstorm and the user is not holding Utility Umbrella. If the user is holding a Power Herb or the weather is Desolate Land or Sunny Day, the move completes in one turn. If the user is holding Utility Umbrella and the weather is Desolate Land or Sunny Day, the move still requires a turn to charge.",
		shortDesc: "Charges turn 1. Hits turn 2. No charge in sunlight.",
		name: "LGPE Solar Beam",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name, defender);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onBasePower(basePower, pokemon, target) {
			if (['raindance', 'primordialsea', 'sandstorm', 'hail'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
};