Get-ChildItem -LiteralPath app -Recurse -Include *.tsx,*.ts | ForEach-Object {
    try {
        $c = Get-Content -LiteralPath $_.FullName -Raw -ErrorAction Stop
        if ($c -match 'font-inter|font-sans|font-arial|') {
            $c = $c -replace 'font-inter-tight\s?', ''
            $c = $c -replace 'font-inter\s?', ''
            $c = $c -replace 'font-sans\s?', ''
            $c = $c -replace 'font-arial\s?', ''
            $c = $c -replace '\s?', 'font-bold '
            [IO.File]::WriteAllText($_.FullName, $c)
            Write-Host "Updated $($_.FullName)"
        }
    } catch {
        Write-Host "Skipped $($_.FullName)"
    }
}
Write-Host "LiteralPath fonts updated successfully!"
