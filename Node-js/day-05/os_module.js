const os = require('os'); 
// 👉 Node.js ka built-in OS module import kar rahe hain
// 👉 Ye module hume system (computer) ki details deta hai

// 1. get os platform & user info

console.log('OS Platform:', os.platform());
// 👉 Operating system ka platform batata hai
// 👉 Example: win32 (Windows), linux, darwin (Mac)

console.log("User Info:", os.userInfo());
// 👉 Current logged-in user ki details deta hai
// 👉 Jaise: username, home directory, shell, etc



// 2. Get the Os CPU architecture

console.log('CPU Architecture:', os.arch()); // x64
// 👉 CPU ka architecture batata hai
// 👉 x64 = 64-bit processor
// 👉 x86 = 32-bit processor


// 3. Get the Os CPU core info
console.log('CPU Core Info:', os.cpus());
// 👉 System ke sabhi CPU cores ka detailed info deta hai
// 👉 Har core ka: model, speed, aur time usage

console.log('CPU Core Info:', os.cpus().length); // 4
// 👉 Total CPU cores ki count deta hai
// 👉 Example: 4 cores = quad-core processor



// 4. Get the Free memory of the system
console.log('Free Memory:', os.freemem() , "bytes"); 
// 👉 Abhi system me kitni RAM free hai (bytes me)
// 👉 Performance monitoring ke liye useful


// 5. Get the total memory of the system
console.log('Total Memory:', os.totalmem() , "bytes");  
// 👉 System ki total RAM capacity batata hai
// 👉 Free + Used = Total memory


// 6. Get the home directory of the user
console.log('Home Directory:', os.homedir());   
// 👉 Current user ka home folder ka path deta hai
// 👉 Example: C:\Users\Harshal Chauhan


// 7. Get the host name of the system
console.log('Host Name:', os.hostname());  
// 👉 System ka network name / device name deta hai
// 👉 Network me identify karne ke kaam aata hai


// 8. Get the network interfaces of the system
console.log('Network Interfaces:', os.networkInterfaces());  
// 👉 System ke saare network interfaces ka info deta hai
// 👉 WiFi, Ethernet, IP address, IPv4 / IPv6 details
// 👉 Networking & server debugging me kaafi useful


// 9. Get the os release info
console.log('OS Release:', os.release());  
// 👉 Operating system ka release / build version deta hai
// 👉 Example: Windows build number


// 10. Get the os temp directory
console.log('OS Temp Directory:', os.tmpdir());  
// 👉 System ka temporary files store karne ka folder path
// 👉 Node.js temporary files yahi banata hai


// 11. Get the os uptime
console.log('OS Uptime:', os.uptime(), "seconds");  
// 👉 System kitni der se ON hai (seconds me)
// 👉 Server reliability check karne ke kaam aata hai


// 12. Get the os version
console.log('OS Version:', os.version());  
// 👉 OS ka readable version name deta hai
// 👉 Example: Windows 10 Pro


// 13. Get the os load average
console.log('OS Load Average:', os.loadavg());  
// 👉 System load average deta hai (1, 5, 15 minutes)
// 👉 Windows me mostly [0,0,0] hota hai
// 👉 Linux / Mac me meaningful hota hai


// 14. Get the os endianness
console.log('OS Endianness:', os.endianness());   
// 👉 CPU data kis byte order me store karta hai
// 👉 LE = Little Endian (mostly modern systems)


// 15. Get the os constants
console.log('OS Constants:', os.constants);
// 👉 Operating system ke constant values deta hai
// 👉 Error codes, signals, priority constants etc.


// 16. os type
console.log('OS Type:', os.type());   
// 👉 OS ka internal type name deta hai
// 👉 Example: Windows_NT, Linux, Darwin
