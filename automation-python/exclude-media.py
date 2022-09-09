urls = open("allurls.txt","r").readlines()

media = "m4a,mp4,mp5,mp3,txt,js,json,xml,jpg,jpeg,gif,css,tif,tiff,png,ttf,woff,woff2,ico".split(",")

for url in urls :
    url=url.strip()
    url=url.strip("\n")
    ok=1
    for ext in media:
        if url.endswith("."+ext):
            ok=0
            break
    if ok :
        print(url)