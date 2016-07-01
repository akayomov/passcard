class Rand
	# if created without a seed, uses current time as seed
	constructor: (@seed) ->
		# Knuth and Lewis' improvements to Park and Miller's LCPRNG
		@multiplier = 1664525
		@modulo = 4294967296 # 2**32-1;
		@offset = 1013904223
		unless @seed? && 0 <= seed < @modulo
			@seed = (new Date().valueOf() * new Date().getMilliseconds()) % @modulo

	# sets new seed value
	seed: (seed) ->
		@seed = seed

	# return a random integer 0 <= n < @modulo
	randn: ->
		# new_seed = (a * seed + c) % m
		@seed = (@multiplier*@seed + @offset) % @modulo

	# return a random float 0 <= f < 1.0
	randf: ->
		this.randn() / @modulo

	# return a random int 0 <= f < n
	rand: (n) ->
		Math.floor(this.randf() * n)

	# return a random int min <= f < max
	rand2: (min, max) ->
		min + this.rand(max-min)

chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"
symbols = "!@#$%^&*"
numbers = "1234567890"

generateNewCard = ->
	console.log 'generateNewCard'

	randomizer = new Rand

	seedField = document.getElementById "seed"

	if Number.isInteger(Number(seedField.value))
		console.log "number"
		if String(seedField.value).length > 8
			console.log "more 8"
			seedField.value = Number(String(seedField.value).substr(0,8))
		else
			console.log "less 8"
			seedSTR = "00000000"+seedField.value
			seedField.value = Number(seedSTR.slice(-8))
		randomizer.seed = Number(seedField.value)
	else
		console.log "non number"
		seedField.value = Number(String(randomizer.seed).substr(0,8))
		randomizer.seed = Number(seedField.value)

	console.log "seed:", randomizer.seed

	document.getElementById("key").innerHTML = randomizer.seed
	document.getElementById("code").innerHTML = randomizer.seed

	document.getElementById("site").innerHTML = window.location.origin
	document.getElementById("place").innerHTML = window.location.origin

	generateChar = (type)->
		switch type
			when 1 then return chars.charAt randomizer.rand 51
			when 2 then return symbols.charAt randomizer.rand 7
			when 3 then return numbers.charAt randomizer.rand 9

	generateLine = (type,count)->
		resultLine = ""
		for i in [1..count]
			switch type
				when 1
					def = randomizer.rand 30
					if def < 18 then resultLine += generateChar 1
					else if def < 24 then resultLine += generateChar 2
					else resultLine += generateChar 3
				when 2
					def = randomizer.rand 20
					if def < 14 then resultLine += generateChar 1
					else resultLine += generateChar 3
				when 3
					resultLine += generateChar 3

			if i < count then resultLine += " "
		return resultLine

	lines = document.getElementsByClassName 'line'

	lines[0].innerHTML = generateLine 1,16
	lines[1].innerHTML = generateLine 1,16
	lines[2].innerHTML = generateLine 1,16

	lines[3].innerHTML = generateLine 1,4
	lines[4].innerHTML = generateLine 1,4
	lines[5].innerHTML = generateLine 1,4
	lines[6].innerHTML = generateLine 1,4

	lines[7].innerHTML = generateLine 1,16
	lines[8].innerHTML = generateLine 1,16
	lines[9].innerHTML = generateLine 1,16

	lines[10].innerHTML = generateLine(2,12)+" "+generateLine(3,4)
	lines[11].innerHTML = generateLine(2,12)+" "+generateLine(3,4)
	lines[12].innerHTML = generateLine(2,12)+" "+generateLine(3,4)

	lines[13].innerHTML = generateLine 2,4
	lines[14].innerHTML = generateLine 2,4
	lines[15].innerHTML = generateLine 3,4
	lines[16].innerHTML = generateLine 3,4

	lines[17].innerHTML = generateLine(2,4)+" "+generateLine(3,12)
	lines[18].innerHTML = generateLine(2,4)+" "+generateLine(3,12)
	lines[19].innerHTML = generateLine(2,4)+" "+generateLine(3,12)

window.addEventListener 'load', ->
	do generateNewCard
	document.getElementById("generate").addEventListener 'click', generateNewCard












	
