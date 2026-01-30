# 一键推送：把本地修改同步到 GitHub，并触发 Pages 部署
Set-Location $PSScriptRoot

$msg = Read-Host "输入本次修改说明（直接回车则用默认说明）"
if ([string]::IsNullOrWhiteSpace($msg)) { $msg = "更新网页内容" }

git add .
git status
Write-Host ""
$confirm = Read-Host "确认推送以上修改？(Y/N，默认 Y)"
if ($confirm -eq "N" -or $confirm -eq "n") { Write-Host "已取消"; exit }

git commit -m $msg
git push origin main

Write-Host ""
Write-Host "推送完成。约 1-2 分钟后访问: https://davidsea-z.github.io/GameHotelModel/" -ForegroundColor Green
