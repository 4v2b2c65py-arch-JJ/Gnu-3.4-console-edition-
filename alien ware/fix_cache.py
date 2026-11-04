import os

FOLDER = "alien ware"
OLD = """L1_cache: 64 KB per core
L2_cache: 1 MB to 2 MB shared
"""
NEW = """L1_cache: 384 KB
L2_cache: 3072 KB
L3_cache: 32768 KB
"""

for i in range(1, 21):
    path = os.path.join(FOLDER, f"{i}.gguf")
    with open(path, "r", encoding="utf-8", errors="ignore") as fh:
        data = fh.read()
    if OLD in data:
        data = data.replace(OLD, NEW)
    with open(path, "w", encoding="utf-8", errors="ignore") as fh:
        fh.write(data)
    print(f"{i}.gguf updated")

print("done")
