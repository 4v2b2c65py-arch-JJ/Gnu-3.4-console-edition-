import os, time, hashlib

path = "alien ware\\gnu 3.4\\merged_all.gguf"
with open(path, "rb") as fh:
    data = fh.read()

print(f"File size: {len(data)} bytes")

# Stress tests
t0 = time.time()
h = hashlib.sha256(data).hexdigest()
t1 = time.time()
print(f"SHA256: {h} ({t1-t0:.4f}s)")

# read 1000 times
t0 = time.time()
for _ in range(1000):
    with open(path, "rb") as fh:
        _ = fh.read()
t1 = time.time()
print(f"1000 reads: {t1-t0:.4f}s")

# chunk stress
t0 = time.time()
chunks = [data[i:i+4096] for i in range(0, len(data), 4096)]
t1 = time.time()
print(f"Chunked into {len(chunks)} blocks: {t1-t0:.4f}s")

print("Stress test: PASS")
