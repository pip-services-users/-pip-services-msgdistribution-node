#!/usr/bin/env pwsh

Set-StrictMode -Version latest
$ErrorActionPreference = "Stop"

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$stageImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-rc"
$latestImage="$($component.registry)/$($component.name):latest"

# Build docker image
docker build -f docker/Dockerfile -t $stageImage -t $latestImage .

# Set environment variables
$env:IMAGE = $stageImage

try {
    # Workaround to remove dangling images
    docker-compose -f ./docker/docker-compose.yml down

    docker-compose -f ./docker/docker-compose.yml up -d

    # Test using curl
    Start-Sleep -Seconds 10
    Invoke-WebRequest -Uri http://localhost:8080/heartbeat
    #$recipient = @{ name='User 1'; email='somebody@somewhere.com'; phone='+1233452345' }
    #$message = @{ subject='Test subject'; text='Test text'; html='Test html' }
    #$postParams = @ { recipient=$recipient; message=$message; method="all" }
    #Invoke-WebRequest -Uri http://localhost:8080/v1/msg_distribution/send_message -Method POST -Body $postParams

    Write-Host "The container was successfully built."
} finally {
    # Workaround to remove dangling images
    docker-compose -f ./docker/docker-compose.yml down
}
