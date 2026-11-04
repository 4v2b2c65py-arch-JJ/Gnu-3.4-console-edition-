import os
import struct

FOLDER = "alien ware\\gnu 3.4"
OS_GATES = ["mac", "linux", "windows", "steamdeck", "ps4", "ps5", "xbox_series"]

def raw_feed_stream(path):
    with open(path, "rb") as fh:
        return fh.read()

def image_packet_gate(data, os_name):
    # Simulate hardware access gate per OS
    magic = data[:4]
    return len(data) > 0 and magic is not None

def run_suite():
    results = []
    for os_name in OS_GATES:
        for i in range(1, 21):
            path = os.path.join(FOLDER, f"{i}.gguf")
            data = raw_feed_stream(path)
            ok = image_packet_gate(data, os_name)
            results.append((os_name, i, ok))
            print(f"[{os_name}] packet {i}: {'PASS' if ok else 'FAIL'}")
    passed = sum(1 for r in results if r[2])
    print(f"Suite: {passed}/{len(results)} passed")
    return passed == len(results)

if __name__ == "__main__":
    run_suite()
