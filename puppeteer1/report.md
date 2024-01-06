- Vulnerability Title: cross-window messaging misconfiguration leads to credintials steal and Account TakeOver .

- Vulnerable Domain/URL: https://iclass.eccouncil.org/my-account/
- Severity: high

- Description:

Hi team,

I discovered a PostMessage Misconfiguration vulnerability that **leads to user credentials being stolen and Account takeover ** at the login & register page (https://iclass.eccouncil.org/my-account/).

Why this vulnerability happens:
this vulnerability happens due to some javascript function that handles any incoming window messages from postMessage , and it's used in the this js file "ecrp6wxlm7u5ya.js ( Unfortunately , I couldn't paste the vulnerable function here because your WAF seems prevent any js code included in the submited form ) the function receives messages from any window and the problem this function receives messages from any window and it don't check the sender origin and pass the "redirectTo" value of the received message object to "window.location.replace" without any filtration or sanitization, and if an attacker sends a message with `data.redirectTo` equal to some malicious js code , he will achieve a DOM-based XSS and execute js codes on the user browser session since the attacker can run js code on the user browser he easily can steal his credentials.


- Proof-of-concept: please see the attached POC-video.

- Impact of the vulnerability: as an attacker can execute javascript code in the user browser session , he can do any action in behave of the user , and also can steal user sensitive information like his cookies or even the cridintials (please see the steps to reporoduce that below)

- Steps to reproduce the issue:

## DOM-based XSS POC :
1 - open this link: https://localhost-mouhannadlrx.github.io/my-POCs/POC1.html
2 - wait for a few minutes, and you will see an XSS Pop-up

## Credentials stealing and Account Takeover :

1 - Open this link: https://localhost-mouhannadlrx.github.io/my-POCs/POC2.html
2 - In the login form, Enter your username and password, then hit the "Log-in" button.
3 - Now you see your username and password have been stolen and sent back to the attacker's external server!

- Remediation:
    - check the  message sender "origin" and  window "source" .
    - sanitize the message received data before using it.

- References :
- https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side_Testing/11-Testing_Web_Messaging
- https://hackerone.com/reports/900619
- https://hackerone.com/reports/826394
- https://hackerone.com/reports/603764

