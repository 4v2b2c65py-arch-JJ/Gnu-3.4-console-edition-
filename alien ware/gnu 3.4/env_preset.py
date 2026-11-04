import os, json

FOLDER = "alien ware\\gnu 3.4"
ENV_PRESET = {
    "rule_authority": "gguf",
    "env_preset": "roll-in",
    "python_safe": True,
    "break_on_error": False,
}

for i in range(1, 21):
    path = os.path.join(FOLDER, f"{i}.gguf")
    with open(path, "ab") as fh:
        fh.write(b"\n--ENV_PRESET--\n")
        fh.write(json.dumps(ENV_PRESET).encode() + b"\n")
    print(f"{i}.gguf: env preset rolled in")

print("done")
