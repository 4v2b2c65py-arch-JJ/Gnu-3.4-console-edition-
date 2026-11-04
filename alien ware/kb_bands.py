import os

FOLDER = "alien ware"
BANDS = [
    "band-0: core facts",
    "band-1: reasoning",
    "band-2: tools",
    "band-3: memory",
    "band-4: safety",
    "band-5: language",
    "band-6: vision",
    "band-7: audio",
]

for i in range(1, 21):
    path = os.path.join(FOLDER, f"{i}.gguf")
    with open(path, "ab") as fh:
        fh.write(b"\n--KNOWLEDGE_BASE--\n")
        for b in BANDS:
            fh.write((b + "\n").encode())
    print(f"{i}.gguf bands written")

print("done")
