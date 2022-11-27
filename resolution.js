class Resolution {
	constructor() {
		this.rules = []
		this.facts = []
		this.result = []
	}

	addRule(rule) {
		this.rules.push(rule)
	}

	addFact(fact) {
		this.facts.push(fact)
	}

	resolve() {
		let newFacts = []
		this.rules.forEach((rule) => {
			this.facts.forEach((fact) => {
				let newFact = this.resolveRule(rule, fact)
				if (newFact) {
					newFacts.push(newFact)
				}
			})
		})
		this.facts = this.facts.concat(newFacts)
		this.result = this.facts
	}

	resolveRule(rule, fact) {
		let newFact = []
		let ruleIndex = 0
		let factIndex = 0
		let ruleLength = rule.length
		let factLength = fact.length
		while (ruleIndex < ruleLength && factIndex < factLength) {
			if (rule[ruleIndex] === fact[factIndex]) {
				newFact.push(rule[ruleIndex])
				ruleIndex++
				factIndex++
			} else if (rule[ruleIndex] < fact[factIndex]) {
				newFact.push(rule[ruleIndex])
				ruleIndex++
			} else {
				newFact.push(fact[factIndex])
				factIndex++
			}
		}
		while (ruleIndex < ruleLength) {
			newFact.push(rule[ruleIndex])
			ruleIndex++
		}
		while (factIndex < factLength) {
			newFact.push(fact[factIndex])
			factIndex++
		}
		if (newFact.length === ruleLength + factLength) {
			return null
		}
		return newFact
	}
}

let resolution = new Resolution()

resolution.addRule([1, 2, 3])
resolution.addRule([2, 3, 4])
resolution.addRule([3, 4, 5])
resolution.addRule([4, 5, 6])
resolution.addRule([5, 6, 7])
resolution.addRule([6, 7, 8])
resolution.addRule([7, 8, 9])
resolution.addRule([8, 9, 10])

resolution.addFact([1, 2, 3])
resolution.addFact([2, 3, 4])
resolution.addFact([3, 4, 5])
resolution.addFact([4, 5, 6])
resolution.addFact([5, 6, 7])
resolution.addFact([6, 7, 8])
resolution.addFact([7, 8, 9])
resolution.addFact([8, 9, 10])

resolution.resolve()

console.log(resolution.result)
