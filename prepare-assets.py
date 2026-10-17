from pathlib import Path
from PIL import Image
assets = Path(__file__).parent / 'dist' / 'assets'
im = Image.open(assets / 'slogo.jpg').convert('RGB')
px = im.load()
points = [(x,y) for y in range(im.height) for x in range(im.width) if min(px[x,y]) < 160]
x0=min(x for x,y in points); y0=min(y for x,y in points)
x1=max(x for x,y in points); y1=max(y for x,y in points)
im.crop((max(0,x0-2),max(0,y0-4),min(im.width,x1+3),min(im.height,y1+5))).save(assets / 'logo.png')
for p in assets.glob('*.jpg'):
    print(p.name, Image.open(p).size)
