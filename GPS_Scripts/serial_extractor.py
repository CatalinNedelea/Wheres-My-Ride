def getserial():
	# Extract serial from cpuinfo file
	cpuserial = "0000000000000000"
	try:
		f = open('/proc/cpuinfo', 'r')
		for line in f:
			if line[0:6] == 'Serial':
				cpuserial = line[10:26]
		f.close()
	except:
		cpuserial = "ERROR000000000"

	return cpuserial

myserial = getserial()

with open('serialNo.txt', 'w') as f:
    for line in myserial:
        f.write(line)

r = requests.get('http://localhost:6969/api/`${myserial}`')