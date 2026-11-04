import os
import hashlib

FOLDER = "alien ware"
BITS = 256
BYTE_LEN = BITS // 8  # 32 bytes

for i in range(1, 21):
    path = os.path.join(FOLDER, f"{i}.gguf")
    # 256-bit forwarding IP derived from krnl spec
    ip_seed = f"ps4-to-ps5-krnl-forward-{i}".encode()
    block = hashlib.sha256(ip_seed).digest()  # 32 bytes = 256 bits
    with open(path, "ab") as fh:
        fh.write(b"\n--FORWARDING_IP_256--\n")
        fh.write(f"FORMAT=256-bit\nTARGET=PS4->PS5\n".encode())
        fh.write(block)
        fh.write(b"\n")
    print(f"{i}.gguf: 256-bit forwarding IP written")

print("done")
