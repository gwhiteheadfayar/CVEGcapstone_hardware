# CVEGcapstone_hardware
Fall 2023 - EECS Capstone Project - CVEG Asphalt Emulsion Streaming Platform - Hardware Portion.

HOW TO RUN:
1) Install OBS (https://obsproject.com/download)
    -go to settings -> stream
    -set SERVICE to Custom
    -set SERVER to "rtmp://localhost/live
    -set STREAM KEY to "stream"

2) Install NGINX (https://github.com/ustoopia/Live-stream-server-portable-Windows-Nginx-RTMP-HLS-Dash)
    -click NGINX.exe to run it while streaming from OBS

3) In VSCode, clone the repo
    -go to CMD, type "ipconfig", press enter, copy your ipv4
    -put the copied ip in place of "INSERT_IP_HERE"
    -in the CLI, run python -m http.server

4) Do all of the previo