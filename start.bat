@echo off
chcp 65001 >nul
title AuraTranslate - 极光翻译
echo.
echo  ============================================
echo    AuraTranslate  ^|  极光翻译与英语备考系统
echo  ============================================
echo.
echo  正在启动本地服务器...
start "" "http://localhost:8080"
python -m http.server 8080
