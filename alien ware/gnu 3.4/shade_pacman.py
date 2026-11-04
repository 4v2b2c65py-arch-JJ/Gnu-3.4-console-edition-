import os, json, hashlib

FOLDER = "alien ware\\gnu 3.4"
ROUTES = ["usb", "ssd", "nvme", "sdcard", "network"]

for i in range(1, 21):
    path = os.path.join(FOLDER, f"{i}.gguf")
    with open(path, "rb") as fh:
        data = fh.read()
    archive_hash = hashlib.sha256(data).hexdigest()
    record = {
        "shade_package": "pacman",
        "data_path_preset": path,
        "disk_types": "any",
        "auto_registry": True,
        "ip_blocks": False,
        "routes": ROUTES,
        "image_feed": "read image sent through path preset to all detected routes",
        "digital_archive": archive_hash,
        "checksum_rule": "auto rule out possibilities and variants",
    }
    out = os.path.join(FOLDER, f"{i}_shade.json")
    with open(out, "w") as fh:
        json.dump(record, fh, indent=2)
    print(f"{i}.gguf: shade archive {archive_hash[:12]}... routes={len(ROUTES)}")

print("done")
