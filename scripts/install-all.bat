@echo off
echo ========================================
echo Campus Connect - Install All Dependencies
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js found!
echo.

echo Installing backend dependencies...
cd ..\backend
call npm.cmd install
if %ERRORLEVEL% NEQ 0 (
    echo Backend installation failed!
    pause
    exit /b 1
)
cd ..\scripts

echo.
echo Installing frontend dependencies...
cd ..\frontend
call npm.cmd install
if %ERRORLEVEL% NEQ 0 (
    echo Frontend installation failed!
    pause
    exit /b 1
)
cd ..\scripts

echo.
echo ========================================
echo All dependencies installed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Double-click "scripts\start-backend.bat" to start the backend
echo 2. Double-click "scripts\start-frontend.bat" to start the frontend
echo 3. Open http://localhost:5173 in your browser
echo.
pause

