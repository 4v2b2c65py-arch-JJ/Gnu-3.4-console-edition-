# Boot image / OS layer sources (GitHub)

## Console BIOS/firmware packs
- https://github.com/Abdess/retrobios
  - Install: curl -fsSL https://raw.githubusercontent.com/Abdess/retrobios/main/install.sh | sh
  - Windows: irm https://raw.githubusercontent.com/Abdess/retrobios/main/install.ps1 | iex
  - Termux: curl -fsSL https://raw.githubusercontent.com/Abdess/retrobios/main/install.sh | sh

## Termux boot
- https://github.com/termux/termux-boot
  - Install from F-Droid or GitHub Actions debug builds.

## Linux on Android / Termux-style
- https://github.com/ichit/alpine-term
- https://github.com/mekhontsev/magicdesk (install_linux.sh)

## Install commands
# Linux/macOS/Steam Deck
curl -fsSL https://raw.githubusercontent.com/Abdess/retrobios/main/install.sh | sh

# Windows PowerShell
irm https://raw.githubusercontent.com/Abdess/retrobios/main/install.ps1 | iex

# Termux
pkg install python termux-setup-storage
curl -fsSL https://raw.githubusercontent.com/Abdess/retrobios/main/install.sh | sh

# MagicDesk Linux installer
magicdesk download https://raw.githubusercontent.com/mekhontsev/magicdesk/main/scripts/install_linux.sh
sh ~/install_linux.sh
