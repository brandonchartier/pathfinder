'use strict';

class Node {
	constructor(x, y, blocked) {
		this.blocked = blocked;
		this.closed = false;
		this.parent = null;
		this.visited = false;
		this.x = x;
		this.y = y;
	}
}

module.exports = Node;
