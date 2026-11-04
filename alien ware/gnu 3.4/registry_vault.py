import os, json, hashlib

FOLDER = "alien ware\\gnu 3.4"
VAULT = {"registry_auto": "HKCU\\Software\\AlienWare", "vault_preset": "machine-default"}

def checksum_blob(data):
    return hashlib.sha256(data).hexdigest()

for i in range(1, 21):
    path = os.path.join(FOLDER, f"{i}.gguf")
    with open(path, "rb") as fh:
        data = fh.read()
    blob = checksum_blob(data)
    record = {
        "registry_key": VAULT["registry_auto"],
        "vault_preset": VAULT["vault_preset"],
        "checksum_blob": blob,
        "rollback": True,
        "auto": True,
    }
    out = os.path.join(FOLDER, f"{i}_registry.json")
    with open(out, "w") as fh:
        json.dump(record, fh, indent=2)
    print(f"{i}.gguf: registry blob {blob[:12]}... rollback ready")

print("done")
