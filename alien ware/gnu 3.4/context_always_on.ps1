while ($true) {
    $sum = 0
    Get-ChildItem -Path "alien ware\gnu 3.4\*.gguf" | ForEach-Object {
        $c = [System.IO.File]::ReadAllText($_.FullName)
        $nums = [regex]::Matches($c, '\d+') | ForEach-Object { [int]$_.Value }
        $p = ($nums | Measure-Object -Sum).Sum
        $sum += $p
        Write-Host "$($_.Name): context partial $p"
    }
    Write-Host "TOTAL CONTEXT INT: $sum"
    Start-Sleep -Seconds 5
}
