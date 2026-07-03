# Shows which process (PID, name, path) is listening on a given TCP port.
# Usage: .\scripts\check-port.ps1 [-Port 8082]
param(
    [int]$Port = 8082
)

$connections = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue

if (-not $connections) {
    Write-Host "No process is listening on port $Port." -ForegroundColor Yellow
    exit 0
}

foreach ($conn in $connections) {
    $proc = Get-Process -Id $conn.OwningProcess -ErrorAction SilentlyContinue
    if ($proc) {
        [PSCustomObject]@{
            Port = $Port
            PID  = $proc.Id
            Name = $proc.ProcessName
            Path = $proc.Path
        } | Format-List
    } else {
        Write-Host "Port $Port is used by PID $($conn.OwningProcess), but that process could not be queried." -ForegroundColor Yellow
    }
}
