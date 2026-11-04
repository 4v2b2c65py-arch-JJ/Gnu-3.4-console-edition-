using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Text;

namespace LeviathanSetup
{
    class Program
    {
        static readonly string AppName = "Leviathan";
        static readonly string Publisher = "Leviathan Studios";
        static readonly string Version = "2.0.0";

        static int Main(string[] args)
        {
            bool silent = args.Contains("/S") || args.Contains("/silent");
            bool launch = args.Contains("/LAUNCH") || args.Contains("/launch");
            string installDir = null;

            for (int i = 0; i < args.Length; i++)
            {
                if ((args[i] == "/D" || args[i] == "/dir") && i + 1 < args.Length)
                    installDir = args[i + 1];
                else if (args[i].StartsWith("/D="))
                    installDir = args[i].Substring(3);
            }

            if (installDir == null)
                installDir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), AppName);

            try
            {
                if (!silent)
                    Console.WriteLine($"Leviathan Setup v{Version}");
                else
                    Console.WriteLine($"Leviathan Setup v{Version} (silent)");

                Install(installDir, silent);

                if (launch)
                {
                    if (!silent) Console.WriteLine("Launching Leviathan...");
                    LaunchGame(installDir);
                }

                if (!silent)
                    Console.WriteLine("\nInstallation complete!");
                return 0;
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Installation failed: {ex.Message}");
                if (!silent)
                {
                    Console.WriteLine("Press any key to exit...");
                    Console.ReadKey();
                }
                return 1;
            }
        }

        static void Install(string installDir, bool silent)
        {
            if (!silent) Console.WriteLine($"Installing to: {installDir}");

            Directory.CreateDirectory(installDir);
            Directory.CreateDirectory(Path.Combine(installDir, "Data"));
            Directory.CreateDirectory(Path.Combine(installDir, "Data", "Assets"));
            Directory.CreateDirectory(Path.Combine(installDir, "Data", "Configs"));
            Directory.CreateDirectory(Path.Combine(installDir, "Saves"));
            Directory.CreateDirectory(Path.Combine(installDir, "Logs"));

            string exeSource = AppContext.BaseDirectory;
            string exeName = Path.GetFileName(Process.GetCurrentProcess().MainModule?.FileName ?? "LeviathanSetup.exe");
            string exeDest = Path.Combine(installDir, "Leviathan.exe");
            File.Copy(Path.Combine(exeSource, exeName), exeDest, overwrite: true);

            WriteFile(Path.Combine(installDir, "Leviathan.config"), GenerateConfig(installDir));
            WriteFile(Path.Combine(installDir, "Data", "Configs", "game.json"), GenerateGameJson());
            WriteFile(Path.Combine(installDir, "README.txt"), GenerateReadme());

            CreateShortcuts(installDir, silent);
            CreateUninstaller(installDir, silent);

            if (!silent)
                Console.WriteLine("Files installed successfully.");
        }

        static void CreateShortcuts(string installDir, bool silent)
        {
            try
            {
                string desktop = Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory);
                string programsDir = Path.Combine(
                    Environment.GetFolderPath(Environment.SpecialFolder.StartMenu),
                    "Programs", AppName);
                Directory.CreateDirectory(programsDir);

                string exePath = Path.Combine(installDir, "Leviathan.exe");

                CreateShortcutViaPowerShell(
                    Path.Combine(desktop, $"{AppName}.lnk"),
                    exePath, installDir, "Launch Leviathan");
                CreateShortcutViaPowerShell(
                    Path.Combine(programsDir, $"{AppName}.lnk"),
                    exePath, installDir, "Launch Leviathan");

                if (!silent) Console.WriteLine("Shortcuts created.");
            }
            catch (Exception ex)
            {
                if (!silent) Console.WriteLine($"Warning: could not create shortcuts: {ex.Message}");
            }
        }

        static void CreateShortcutViaPowerShell(string linkPath, string targetPath, string workingDir, string description)
        {
            var psScript = $@"
$ws = New-Object -ComObject WScript.Shell
$shortcut = $ws.CreateShortcut('{linkPath.Replace("'", "''")}')
$shortcut.TargetPath = '{targetPath.Replace("'", "''")}'
$shortcut.WorkingDirectory = '{workingDir.Replace("'", "''")}'
$shortcut.Description = '{description.Replace("'", "''")}'
$shortcut.Save()
";
            var psi = new ProcessStartInfo
            {
                FileName = "powershell.exe",
                Arguments = $"-ExecutionPolicy Bypass -WindowStyle Hidden -Command \"{psScript.Replace("\"", "\\\"")}\"",
                UseShellExecute = false,
                CreateNoWindow = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true
            };
            using var proc = Process.Start(psi);
            proc.WaitForExit(10000);
        }

        static void CreateUninstaller(string installDir, bool silent)
        {
            string exeName = Path.GetFileName(Process.GetCurrentProcess().MainModule?.FileName ?? "LeviathanSetup.exe");
            string uninstallSource = Path.Combine(AppContext.BaseDirectory, exeName);
            string uninstallDest = Path.Combine(installDir, "uninstall.exe");
            File.Copy(uninstallSource, uninstallDest, overwrite: true);

            string uninstallInfo = Path.Combine(installDir, "uninstall.info");
            WriteFile(uninstallInfo, $"InstallDir={installDir}\nVersion={Version}\nPublisher={Publisher}");

            if (!silent) Console.WriteLine("Uninstaller created.");
        }

        static void LaunchGame(string installDir)
        {
            string exePath = Path.Combine(installDir, "Leviathan.exe");
            if (File.Exists(exePath))
            {
                var psi = new ProcessStartInfo
                {
                    FileName = exePath,
                    WorkingDirectory = installDir,
                    UseShellExecute = true
                };
                Process.Start(psi);
            }
        }

        static void WriteFile(string path, string content)
        {
            File.WriteAllText(path, content, Encoding.UTF8);
        }

        static string GenerateConfig(string installDir)
        {
            return $@"[Leviathan]
InstallDir={installDir}
Version={Version}
GraphicsQuality=High
AudioEnabled=true
AGINPCEnabled=true
ServerKeeperEnabled=true
CryptoComputeEnabled=true
";
        }

        static string GenerateGameJson()
        {
            return @"{
  ""game"": ""Leviathan"",
  ""version"": ""2.0.0"",
  ""systems"": {
    ""crypto_compute"": true,
    ""server_keeper"": true,
    ""npc_agi"": true,
    ""image_reference"": true
  },
  ""assets"": {
    ""replicated"": true,
    ""formats"": [""png"", ""jpg"", ""webp"", ""glb"", ""vrm""]
  }
}";
        }

        static string GenerateReadme()
        {
            return $@"Leviathan v{Version}
==================

Installation: {AppName} has been installed.

Launch: Double-click the Leviathan shortcut on your desktop, or run Leviathan.exe from the installation folder.

Systems:
- Crypto Compute: Distributed compute contributor
- Server Keeper: Uptime monitoring
- AGI NPC: Autonomous AI NPCs
- Image Reference: Visual reference client

Support: https://leviathan.example.com
";
        }
    }
}