urls  = open("urls.txt","r")

for url in urls:
    list=url.split("d0mxsslocation.search")
    s="".join(list)
    list=url.split("d0mxsslocation.href")
    s="".join(list)
    print(s,end="")
    