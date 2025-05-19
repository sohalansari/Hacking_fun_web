// DOM Elements
const outputEl = document.getElementById('terminalContent');
const cmdInterface = document.getElementById('cmdInterface');
const cmdInput = document.getElementById('cmdInput');
const cmdOutput = document.getElementById('cmdOutput');
const codeEditor = document.getElementById('codeEditor');
const codeResult = document.getElementById('codeResult');
let editor;

// Initialize ACE Editor when code editor is shown
function initCodeEditor() {
  editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/python");
  editor.setFontSize(14);
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true
  });
}

// Role text animation
const roles = ['Penetration Tester', 'Security Researcher', 'Red Team', 'Ethical Hacker', 'Bug Hunter', 'Cyber Security Expert'];
let roleIndex = 0;

function animateRoles() {
  const roleText = document.getElementById('roleText');
  const currentRole = roles[roleIndex];
  
  // Clear current text with backspace effect
  let i = roleText.textContent.length;
  const backspace = setInterval(() => {
    if (i > 0) {
      roleText.textContent = roleText.textContent.substring(0, i - 1);
      i--;
    } else {
      clearInterval(backspace);
      
      // Type new role
      let j = 0;
      const typing = setInterval(() => {
        if (j <= currentRole.length) {
          roleText.textContent = currentRole.substring(0, j);
          j++;
        } else {
          clearInterval(typing);
          setTimeout(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            animateRoles();
          }, 2000);
        }
      }, 100);
    }
  }, 50);
}

// Initialize role animation
setTimeout(animateRoles, 1000);

// Show tool panels
function showTool(tool) {
  if (tool === 'console') {
    cmdInterface.classList.add('active');
    cmdInput.focus();
  } else if (tool === 'code') {
    codeEditor.classList.add('active');
    initCodeEditor();
  } else {
    const data = {
      metasploit: "🔥 Metasploit Framework Initialized...\n🔍 Loading exploits...\n💣 147 exploits loaded\n✔️ Ready for penetration testing",
      nmap: "🌐 Nmap 7.93 Initialized...\n🔍 Scanning network...\n📡 Found 8 active hosts\n✔️ Scan completed with 3 open ports",
      wireshark: "📡 Wireshark 3.6.8 Activated...\n👂 Listening on eth0...\n📦 Capturing packets...\n✔️ 42 packets analyzed",
      burp: "🕷️ Burp Suite Professional Activated...\n🔓 Starting proxy on 127.0.0.1:8080...\n✔️ Ready for web app testing"
    };
    const message = data[tool] || "Unknown tool.";
    typeWriter(outputEl, `> ${tool}\n${message}\n\n`);
  }
}

// Close console
function closeConsole() {
  cmdInterface.classList.remove('active');
}

// Close code editor
function closeCodeEditor() {
  codeEditor.classList.remove('active');
}

// Run code from editor
function runCode() {
  const code = editor.getValue();
  typeWriter(codeResult, "🚀 Executing code...\n\n");
  
  // Simulate code execution
  setTimeout(() => {
    if (code.includes("exploit")) {
      typeWriter(codeResult, "💣 Exploit executed successfully!\n✔️ Target compromised\n💰 Shell access gained\n\n", 0, true);
    } else if (code.includes("socket")) {
      typeWriter(codeResult, "🌐 Network operation completed\n📡 Connection established\n📦 Data transmitted successfully\n\n", 0, true);
    } else {
      typeWriter(codeResult, "✔️ Code executed successfully\n📊 Output: Hello from KaliTerm!\n\n", 0, true);
    }
  }, 1500);
}

// Save code (simulated)
function saveCode() {
  typeWriter(codeResult, "💾 Saving code to /root/exploits/exploit.py...\n✔️ File saved successfully\n\n", 0, true);
}

// Show content for buttons
function showSection(section) {
  // First clear the output
  outputEl.textContent = '';
  
  const content = {
    projects: "💻 Projects:\n1. Advanced Network Scanner\n2. Custom Metasploit Modules\n3. Web Application Firewall Bypass\n4. Zero-Day Exploit Research\n5. Red Team Infrastructure",
    skills: "⚙️ Skills:\n- Penetration Testing\n- Reverse Engineering\n- Web App Security\n- Network Security\n- Exploit Development\n- Digital Forensics\n- Cryptography",
    contact: "📧 Contact:\nEmail: root@kali.org\nGitHub: @kaliuser\nTwitter: @ethicalhacker\nPGP Key: 0xDEADBEEF\nDiscord: hacker#1337",
    network: "🌐 Network Status:\n🔹 Interface: eth0\n🔹 IP: 192.168.1.105\n🔹 Gateway: 192.168.1.1\n🔹 DNS: 8.8.8.8\n🔹 Open Ports: 22, 80, 443"
  };
  
  const message = content[section] || "No data available.";
  
  // Add timestamp and section header
  const timestamp = new Date().toLocaleTimeString();
  const header = `[${timestamp}] > ${section}\n`;
  
  // Display the content with typing effect
  typeWriter(outputEl, header + message + "\n\n");
  
  // Ensure output window is visible
  const outputWindow = document.getElementById('output');
  outputWindow.style.display = 'block';
  outputWindow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Clear output window
function clearOutput() {
  outputEl.textContent = "[ output cleared ]\n";
}

// Maximize output window
function maximizeOutput() {
  const outputWindow = document.getElementById('output');
  if (outputWindow.classList.contains('maximized')) {
    outputWindow.classList.remove('maximized');
    outputWindow.style.height = '';
    outputWindow.style.maxHeight = '300px';
  } else {
    outputWindow.classList.add('maximized');
    outputWindow.style.maxHeight = 'none';
    outputWindow.style.height = '70vh';
  }
}

// Typewriter effect
function typeWriter(element, text, i = 0, overwrite = false) {
  if (overwrite) {
    element.textContent = '';
  }
  
  if (i < text.length) {
    element.textContent += text.charAt(i);
    setTimeout(() => typeWriter(element, text, i + 1, overwrite), Math.random() * 10 + 20);
    
    // Scroll to bottom as text is being typed
    element.scrollTop = element.scrollHeight;
  }
}

// Command line functionality
document.addEventListener('DOMContentLoaded', () => {
  // Focus input when console is shown
  cmdInput.addEventListener('focus', () => {
    cmdInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Handle Enter key in console
  cmdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const command = cmdInput.value.trim();
      if (command) {
        outputConsoleCommand(command);
        cmdInput.value = '';
      }
    }
  });
  
  // Initial system message
  typeWriter(outputEl, "KaliTerm v3.1.4 initialized...\nSystem ready. Type commands or click buttons to interact.\n\n");
});

// Run command from console button
function runCommand() {
  const command = cmdInput.value.trim();
  if (command) {
    outputConsoleCommand(command);
    cmdInput.value = '';
  }
}

// Minimize console
function minimizeConsole() {
  cmdInterface.style.display = 'none';
  setTimeout(() => {
    cmdInterface.style.display = 'block';
  }, 3000);
}

// Maximize console
function maximizeConsole() {
  if (cmdInterface.style.width === '95%') {
    cmdInterface.style.width = '90%';
    cmdInterface.style.height = 'auto';
  } else {
    cmdInterface.style.width = '95%';
    cmdInterface.style.height = '90vh';
  }
}

// Process console commands
function outputConsoleCommand(cmd) {
  const response = getCommandResponse(cmd.toLowerCase());
  const text = `root@kali:~# ${cmd}\n${response}\n\n`;
  
  typeWriter(cmdOutput, text);
  cmdOutput.scrollTop = cmdOutput.scrollHeight;
  cmdInput.focus();
}

// Get responses for console commands
function getCommandResponse(cmd) {
  const responses = {
    help: `Available Commands:
- help: Show this help message
- status: Check system status
- scan: Scan network with Nmap
- exploit: Launch Metasploit exploit
- clear: Clear the console
- update: Update Kali Linux
- ifconfig: Show network config
- whoami: Show user info
- ls: List files
- cd: Change directory
- msfconsole: Launch Metasploit
- sqlmap: Run SQL injection test
- wireshark: Launch Wireshark
- burp: Launch Burp Suite`,

    status: `🟢 Kali Linux Status:
OS: Kali Linux 2023.3
Kernel: 6.1.0-kali5-amd64
CPU: ██████████ 92% (4 cores)
RAM: ████████░░ 78% (8GB/16GB)
Storage: █████░░░░░ 45% (120GB/256GB SSD)`,

    scan: `Starting Nmap 7.93 ( https://nmap.org )
Scanning 192.168.1.0/24...
Nmap scan report for 192.168.1.1
Host is up (0.045s latency).
Not shown: 995 closed ports
PORT    STATE SERVICE
22/tcp  open  ssh
53/tcp  open  domain
80/tcp  open  http
443/tcp open  https
8080/tcp open  http-proxy

Nmap done: 256 IP addresses (8 hosts up) scanned in 12.45 seconds`,

    exploit: `msf6 > use exploit/multi/handler
msf6 exploit(multi/handler) > set payload linux/x64/meterpreter/reverse_tcp
msf6 exploit(multi/handler) > exploit

[*] Started reverse TCP handler on 192.168.1.105:4444 
[*] Meterpreter session 1 opened (192.168.1.105:4444 -> 192.168.1.110:54321) at 2023-10-18 15:23:45 +0000

meterpreter > sysinfo
Computer     : target-server
OS           : Ubuntu 20.04 (Linux 5.4.0-125-generic)
Architecture : x64
Meterpreter  : x64/linux`,

    update: `root@kali:~# apt update && apt full-upgrade -y
Get:1 https://http.kali.org/kali kali-rolling InRelease [30.5 kB]
Get:2 https://http.kali.org/kali kali-rolling/main amd64 Packages [18.5 MB]
...
147 packages upgraded, 23 newly installed, 12 to remove and 0 not upgraded.
Need to get 286 MB of archives.
After this operation, 145 MB of additional disk space will be used.`,

    ifconfig: `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.105  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fe4a:1234  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:4a:12:34  txqueuelen 1000  (Ethernet)
        RX packets 12456  bytes 10485760 (10.4 MB)
        TX packets 8765  bytes 5242880 (5.2 MB)

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)`,

    whoami: `root
uid=0(root) gid=0(root) groups=0(root),24(cdrom),25(floppy),27(sudo),29(audio),30(dip),44(video),46(plugdev),109(netdev),117(bluetooth),132(scanner)`,

    ls: `drwxr-xr-x  2 root root  4096 Oct 18 14:23 Desktop
drwxr-xr-x  4 root root  4096 Oct 18 14:23 Documents
drwxr-xr-x  3 root root  4096 Oct 18 14:23 Downloads
drwxr-xr-x  2 root root  4096 Oct 18 14:23 Music
drwxr-xr-x  2 root root  4096 Oct 18 14:23 Pictures
drwxr-xr-x  2 root root  4096 Oct 18 14:23 Public
drwxr-xr-x  2 root root  4096 Oct 18 14:23 Templates
drwxr-xr-x  2 root root  4096 Oct 18 14:23 Videos
drwxr-xr-x  5 root root  4096 Oct 18 14:23 exploits
-rw-r--r--  1 root root   123 Oct 18 14:23 notes.txt`,

    cd: `Changing directory to /root/exploits`,

    msfconsole: `Starting Metasploit Framework Console...
       =[ metasploit v6.3.12-dev                          ]
+ -- --=[ 2291 exploits - 1205 auxiliary - 404 post       ]
+ -- --=[ 968 payloads - 45 encoders - 11 nops           ]
+ -- --=[ 9 evasion                                       ]

msf6 > _`,

    sqlmap: `        ___
       __H__
 ___ ___[.]_____ ___ ___  {1.7.2#stable}
|_ -| . ["]     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org

[!] legal disclaimer: Usage of sqlmap for attacking targets without prior mutual consent is illegal.`,

    wireshark: `Launching Wireshark 3.6.8...
Capturing on 'eth0'
File: /tmp/wireshark_eth0_20231018152345.pcapng
Packets: 42 (42 displayed)`,

    burp: `Starting Burp Suite Professional 2023.6
Loading configuration...
Proxy listener started on 127.0.0.1:8080
Ready for web application testing`,

    // Easter eggs
    sudo: `🤖 You're already root! No need for sudo.`,
    matrix: `🟢 You've entered the Matrix... follow the white rabbit.`,
    bitcoin: `₿ Current BTC price: $34,218.45
💰 Your wallet balance: 0.005 BTC ($171.09)`,
    nsa: `🕵️ Connection to NSA mainframe established...
⚠️ Warning: Your activity is being monitored.`,
    hack: `💣 Initializing hacking sequence...
🔓 Bypassing security measures...
📂 Accessing target systems...
💰 Data exfiltration in progress...
✔️ Hack completed successfully!`
  };

  if (cmd in responses) {
    return responses[cmd];
  } else {
    return `❌ Command not found: ${cmd}\nType 'help' for available commands.`;
  }
}
function outputConsoleCommand(cmd) {
    if (cmd === 'clear') {
      cmdOutput.textContent = "[ console cleared ]\n KaliTerm v3.1.4 initialized...\nSystem ready. Type commands or click buttons to interact.\n\n";
    } else {
      const response = getCommandResponse(cmd.toLowerCase());
      const text = `root@kali:~# ${cmd}\n${response}\n\n`;
      typeWriter(cmdOutput, text);
    }
  
    cmdOutput.scrollTop = cmdOutput.scrollHeight;
    cmdInput.focus();
  }
  