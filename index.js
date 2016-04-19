'use strict';

const Grid = require('./lib/grid');

const neighbors = (grid, node, diagonals) => {
	const r = [];

	const x = node.x;
	const y = node.y;

	if (y - 1 >= 0) {
		r.push(grid[y - 1][x]);
	}

	if (y + 1 <= grid.length) {
		r.push(grid[y + 1][x]);
	}

	if (x - 1 >= 0) {
		r.push(grid[y][x - 1]);
	}

	if (x + 1 <= grid[y].length - 1) {
		r.push(grid[y][x + 1]);
	}

	if (diagonals) {

		if (y - 1 >= 0 && x - 1 >= 0) {
			r.push(grid[y - 1][x - 1]);
		}

		if (y + 1 <= grid.length - 1 && x - 1 >= 0) {
			r.push(grid[y + 1][x - 1]);
		}

		if (y - 1 >= 0 && x + 1 <= grid[y].length - 1) {
			r.push(grid[y - 1][x + 1]);
		}

		if (y + 1 <= grid.length - 1 && x + 1 <= grid[y].length - 1) {
			r.push(grid[y + 1][x + 1]);
		}

	}

	return r;
};

module.exports = (data, startX, startY, endX, endY) => {
	const grid = new Grid(data);
	const start = grid.nodes[startY][startX];
	const end = grid.nodes[endY][endX];

	const open = [];
	open.push(start);

	while (open.length > 0) {
		const current = open.splice(0, 1)[0];

		if (current === end) {
			const ret = [];

			while (current.parent) {
				ret.push(current);
				current = current.parent;
			}

			return ret.reverse();
		}

		current.closed = true;

		const ns = neighbors(grid.nodes, current);

		ns.forEach(n => {
			if (n.closed || n.blocked) {
				return;
			}

			if (!n.visited) {
				n.parent = current;
				n.visited = true;
				open.push(n);
			}
		});
	}

	return [];
};
