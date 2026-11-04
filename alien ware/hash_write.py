import os
import hashlib

FOLDER = "alien ware"
BITS = 246
BYTE_LEN = (BITS + 7) // 8  # 31 bytes

for i in range(1, 21):
    name = f"{i}.gguf"
    path = os.path.join(FOLDER, name)
    h = hashlib.sha256(name.encode()).digest()[:BYTE_LEN]
    # mask top 2 bits to make exactly 246 bits
    h = bytes([h[0] & 0x3F]) + h[1:]
    with open(path, "wb") as fh:
        fh.write(h)
    print(f"{name}: {BITS} bits written")

print("done")
