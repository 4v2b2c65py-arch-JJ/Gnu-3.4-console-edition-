@echo off
REM Filter by storage bin: 279kb 672 900 505 ports
setlocal
set PORTS=279 672 900 505
set STORAGE_BIN=279kb
for %%f in ("*.bin") do (
    echo Reading %%f with filter ports %PORTS% storage %STORAGE_BIN%
)
endlocal
