'use strict';

const Node = require('./node');

class Grid {
	constructor(data) {
		this.data = data;

		this.nodes = data.map((row, y) => {
			return row.map((col, x) => {
				if (col.blocked) {
					return new Node(x, y, true);
				} else {
					return new Node(x, y, false);
				}
			});
		});
	}
}

module.exports = Grid;
