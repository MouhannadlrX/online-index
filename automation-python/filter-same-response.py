
lines =open("urls.txt","r").readlines()



vis={}

for line in lines :
    line=line.strip("\n")
    line=line.strip()
    # tmp=line.split(" ")
    sep=line.find(" ")
    x=line[0:sep]
    y=line[sep:]
    
    if not(y in vis) :
        print(x)
        vis[y]=1
    

