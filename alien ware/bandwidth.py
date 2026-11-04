import os

FOLDER = "alien ware"
DATA = """--BANDWIDTH_PORT_PATH--
ports: 1843 1310 1404 1843 4198 6001
massa_scales: 1172 911 800 914 853 800
texture_pack: 25.6 57.6 13.6 40.9 14.6 43.9 25.6 57.6 58.3 131.2 37.5 187.5
card_deck: jaguar Ace deck 8 to 4
"""

for i in range(1, 21):
    path = os.path.join(FOLDER, f"{i}.gguf")
    with open(path, "ab") as fh:
        fh.write(DATA.encode())
    print(f"{i}.gguf updated")

print("done")
