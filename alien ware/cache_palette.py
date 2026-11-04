import os

FOLDER = "alien ware"
BLOCK = """--CACHE_PALETTE--
L1_cache: 64 KB per core
L2_cache: 1 MB to 2 MB shared
swap: partition
rx_card: Vulkan Polaris
nvidia: CUDA
waypoint_palettes: enabled
"""

for i in range(1, 21):
    path = os.path.join(FOLDER, f"{i}.gguf")
    with open(path, "ab") as fh:
        fh.write(BLOCK.encode())
    print(f"{i}.gguf cache/palette written")

print("done")
