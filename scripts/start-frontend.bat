@echo off
echo Starting Campus Connect Frontend Server...
cd ..\frontend
if not exist "node_modules" (
    echo Dependencies not found. Installing...
    call npm.cmd install
)
echo.
echo Starting development server on http://localhost:5173
echo Keep this window open!
echo.
call npm.cmd run dev
pause

