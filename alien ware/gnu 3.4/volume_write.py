import os
import json

FOLDER = "alien ware\\gnu 3.4"
DISK = {
    "usb": {"format": "FAT32/exFAT", "storage_type": "USB removable"},
    "ssd": {"format": "NTFS/APFS/ext4", "storage_type": "SSD"},
    "data_path": FOLDER,
    "volume": "alien_ware_volume",
    "write_command": "interpret from gguf series",
}

for i in range(1, 21):
    path = os.path.join(FOLDER, f"{i}.gguf")
    with open(path, "rb") as fh:
        data = fh.read()
    # interpret volume write action from gguf (size-based)
    volume_write = len(data)
    record = {
        "disk": DISK,
        "gguf": f"{i}.gguf",
        "volume_write_bytes": volume_write,
        "action": "volume_write_interpreted",
    }
    out = os.path.join(FOLDER, f"{i}_volume.json")
    with open(out, "w") as fh:
        json.dump(record, fh, indent=2)
    print(f"{i}.gguf -> volume write {volume_write} bytes")

print("done")
