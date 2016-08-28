''' 
	function to act as match() from R
	this function returns the index of the first
	occurrence of the matched element
	x:
			vector: the values to be matched
	table:
			vector: the values to be matched against
'''

def match(x, table):
	index = []

	if isinstance(x, list):							#check if x is a list
		for lx in range(len(x)):					#iterate each element in x
			if x[lx] in table:						#if x is in the table then
												 	# determine its index pos
				for test in range(len(table)):

						if x[lx] == table[test]:
							index.append(test)
							break
			else:									#if x is not in the table then
				index.append(None)					# return None

		return index
	
													#if x is not a vector
	else:
		if x in table:								#if x is in the table
			for test in range(len(table)):			#determine index pos
				if x == table[test]:
					return test
		else:										#if x is not in the table
			return None								# return None