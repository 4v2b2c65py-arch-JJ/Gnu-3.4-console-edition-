import os

FOLDER = "alien ware\\gnu 3.4"
TEXT = """Alien data timeline override over cocience dimension sort port 451 to port 840 port  940 to 1000 timeline 2491 array use tesserac mechanism use oxygen sampler package atomic oxygen set high atmosphere 557.7nm color green particle set green react elements green matrix dot  math lib v neck shape dips down for positve values x=-16 x =5 intercept corrections numerical adjust horizontal axis x intercepts parabola u shape 5.5 = void dom  absolute value v shape absolute prime axis 80 60 40 200 120 100 140 y axis correct -16 0 5 0 5 5 10 5 110 bar code  ozone force  plutononium 115 model code direct x derive kelvin at error prom 441 kepler and sets of kelvinspolaris gpu set wave at the right qbits to jail comfirm  nametag horizon network lint check visual react open lot layer model name terra opt in @carry at mb deduct -@from linux curl commands incoporate series inside barcode
"""

for i in range(1, 21):
    path = os.path.join(FOLDER, f"{i}.gguf")
    with open(path, "ab") as fh:
        fh.write(TEXT.encode())
    print(f"{i}.gguf updated")

print("done")
