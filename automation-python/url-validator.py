import validators


lines=open("allurls.txt","r").readlines()

for line in lines :
    line=line.strip("\n")
    line=line.strip()
    
    if validators.url(line) :
        print(line)

