@echo off
REM Backdoor terminal emits status from gguf
echo [GUF] Backdoor terminal active
for %%f in ("alien ware\gnu 3.4\*.gguf") do (
    echo [STATUS] %%~nxf present
)
echo [STATUS] merged_all.gguf ready
echo [GUF] done
