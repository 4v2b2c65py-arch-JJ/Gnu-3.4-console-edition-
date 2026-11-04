import os, json

FOLDER = "alien ware\\gnu 3.4"
PARTITION = {
    "gpt_json_partition": True,
    "skip_native_binding": True,
    "push_native_binding": True,
    "target": "gguf",
}

for i in range(1, 21):
    path = os.path.join(FOLDER, f"{i}.gguf")
    with open(path, "ab") as fh:
        fh.write(b"\n--GPT_JSON_PARTITION--\n")
        fh.write(json.dumps(PARTITION).encode() + b"\n")
    print(f"{i}.gguf: partition pushed")

print("done")
