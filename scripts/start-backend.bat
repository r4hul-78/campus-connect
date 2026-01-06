@echo off
echo Starting Campus Connect Backend Server...
cd ..\backend
if not exist "node_modules" (
    echo Dependencies not found. Installing...
    call npm.cmd install
)
echo.
echo Starting server on http://localhost:3001
echo Keep this window open!
echo.
call npm.cmd start
pause

