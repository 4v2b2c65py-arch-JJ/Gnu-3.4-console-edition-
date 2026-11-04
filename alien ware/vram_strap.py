import os
import json

FOLDER = "alien ware"
REPORT = os.path.join(FOLDER, "vram_report.json")

files = sorted(
    (f for f in os.listdir(FOLDER) if f.endswith(".gguf")),
    key=lambda x: int(x.replace(".gguf", "")),
)

entries = []
for name in files:
    path = os.path.join(FOLDER, name)
    size = os.path.getsize(path)
    entries.append({"file": name, "length": size, "vram_mb": round(size / (1024 * 1024), 4)})

report = {
    "target": "PS4-level Linux kernel porting",
    "vram_file_support": True,
    "count": len(entries),
    "files": entries,
    "total_length": sum(e["length"] for e in entries),
}

with open(REPORT, "w") as fh:
    json.dump(report, fh, indent=2)

print(json.dumps(report, indent=2))
