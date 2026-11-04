import os
import re

FOLDER = "alien ware\\gnu 3.4"
context_int = 0
for i in range(1, 21):
    path = os.path.join(FOLDER, f"{i}.gguf")
    with open(path, "rb") as fh:
        data = fh.read().decode("utf-8", errors="ignore")
    nums = re.findall(r"\d+", data)
    context_int += sum(int(n) for n in nums)
    print(f"{i}.gguf: context partial {sum(int(n) for n in nums)}")

print(f"TOTAL CONTEXT INT: {context_int}")
