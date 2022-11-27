var backward = function () {
	var goal = "s"
	var rules = [
		{ premise: ["p"], conclusion: "s" },
		{ premise: ["q"], conclusion: "s" },
		{ premise: ["r"], conclusion: "q" },
		{ premise: ["r"], conclusion: "p" },
		{ premise: ["t"], conclusion: "r" },
	]
	var kb = []
	var agenda = [goal]
	var trace = []
	var i = 0
	while (agenda.length > 0) {
		var goal = agenda.shift()
		trace.push("goal: " + goal)
		if (kb.indexOf(goal) >= 0) {
			trace.push("already known")
		} else {
			var rule = rules[i]
			i++
			if (rule.conclusion == goal) {
				trace.push(
					"rule: " +
						rule.premise.join(" ^ ") +
						" => " +
						rule.conclusion
				)
				kb.push(goal)
				agenda = agenda.concat(rule.premise)
			} else {
				trace.push("no rule")
			}
		}
	}
	return trace
}

console.log(backward())