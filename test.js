function printMatrix(t) {
	for (let e = 0; e < N; e++) {
		for (let o = 0; o < N; o++) console.log(t[e][o] + " ")
		console.log("")
	}
}
function newNode(t, e, o, l, n, a, r) {
	let c = Object.create(Node)
	;(c.parent = r), (c.mat = [])
	for (let e = 0; e < N; e++) {
		c.mat[e] = []
		for (let o = 0; o < N; o++) c.mat[e][o] = t[e][o]
	}
	let i = c.mat[e][o]
	return (
		(c.mat[e][o] = c.mat[l][n]),
		(c.mat[l][n] = i),
		(c.cost = Number.MAX_VALUE),
		(c.level = a),
		(c.x = l),
		(c.y = n),
		c
	)
}
function calculateCost(t, e) {
	let o = 0
	for (let l = 0; l < N; l++)
		for (let n = 0; n < N; n++) 0 != t[l][n] && t[l][n] != e[l][n] && o++
	return o
}
function isSafe(t, e) {
	return t >= 0 && t < N && e >= 0 && e < N ? 1 : 0
}
function printPath(t) {
	null != t && (printPath(t.parent), printMatrix(t.mat), console.log(""))
}
function solve(t, e, o, l) {
	let n = new PriorityQueue(comp),
		a = newNode(t, e, o, e, o, 0, null)
	for (a.cost = calculateCost(t, l), n.add(a); !n.isEmpty(); ) {
		let t = n.peek()
		if ((n.poll(), 0 == t.cost)) return void printPath(t)
		for (let e = 0; e < 4; e++)
			if (isSafe(t.x + row[e], t.y + col[e]) > 0) {
				let o = newNode(
					t.mat,
					t.x,
					t.y,
					t.x + row[e],
					t.y + col[e],
					t.level + 1,
					t
				)
				;(o.cost = calculateCost(o.mat, l)), n.add(o)
			}
	}
}
const N = 3
let row = [1, 0, -1, 0],
	col = [0, -1, 0, 1],
	Node = { parent: null, mat: [], x: 0, y: 0, cost: 0, level: 0 },
	comp = {
		compare: function (t, e) {
			return t.cost + t.level > e.cost + e.level ? 1 : -1
		},
	},
	initialMat = [
		[1, 2, 3],
		[5, 6, 0],
		[7, 8, 4],
	],
	finalMat = [
		[1, 2, 3],
		[5, 8, 6],
		[0, 7, 4],
	],
	x = 1,
	y = 2
solve(initialMat, x, y, finalMat)
