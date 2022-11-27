let forwardChaining = (facts: string[], rules: string[]): any => {
	let newFacts: string[] = []
	let newRules: string[] = []

	for (let i = 0; i < rules.length; i++) {
		let rule = rules[i]
		let ruleParts = rule.split("=>")
		let ruleConditions = ruleParts[0].split("&")
		let ruleConclusion = ruleParts[1].trim()

		let allConditionsTrue = true
		for (let j = 0; j < ruleConditions.length; j++) {
			let condition = ruleConditions[j].trim()
			if (facts.indexOf(condition) === -1) {
				allConditionsTrue = false
				break
			}
		}

		if (allConditionsTrue) {
			if (facts.indexOf(ruleConclusion) === -1) {
				newFacts.push(ruleConclusion)
			}
		} else {
			newRules.push(rule)
		}
	}

	if (newFacts.length === 0) {
		return facts
	} else {
		facts = facts.concat(newFacts)
		return forwardChaining(facts, newRules)
	}
}

let facts = ["A", "B"]

let rules = ["A => C", "B => C", "C => D"]

console.log(forwardChaining(facts, rules))
