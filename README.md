# Clearing Feed Generation System

<img src="https://user-images.githubusercontent.com/73184612/162604862-5767d91d-060b-4b5b-89c1-e8f548609e91.gif" alt="gif" align="right" width="300" height="300"> 
<h2> Project made by GROUP-19 for Citi Bridge Program 2022 </h2>


### Introduction
- Clearing Feed Generation System is the part of banking software to validate the transaction entries and make the data ready for the clearing process.
- This system takes an input file from the user, containing transaction records in any format. 
- It validates each record in the file according to the given specifications and generates an output file containing only the valid records. 
- This output file serves as the input to the transaction clearing system of the bank.


<br />
<img width="700" alt="image" src="https://user-images.githubusercontent.com/73184612/188896492-85a58d24-27a7-4b5b-98a8-54d7d1deb1d9.png">


### Screenshots:
<img width="960" alt="image" src="https://user-images.githubusercontent.com/73184612/191727648-757ed4c0-fbaf-4e43-8f96-d8d2c714ada6.jpeg">
<img width="960" alt="image" src="https://user-images.githubusercontent.com/73184612/191727534-422799ef-65f8-4254-ad2b-6e321e87f397.jpeg">
<img width="960" alt="image" src="https://user-images.githubusercontent.com/73184612/191727401-f9c79273-67f6-4b89-a1e8-77cb5f4462bc.jpeg">


### Functional Features:
:white_check_mark: Polling a local folder to select input file 📂 </br>
:white_check_mark: Reading the uploaded file and moving it to archive folder  </br>
:white_check_mark: Validations on the transaction record format: naming convention, length, number of fields, field length, date format, currency format </br>
:white_check_mark: Generating a Clearing Feed File having transactions listed in given format 🗒️ </br>
:white_check_mark: UI screen to separately show the transactions that have validation passed and validation failed 💻 </br>
:white_check_mark: Functionality for user to download the valid transactions file ⬇️ </br>
:white_check_mark: Visualization of metrics around the clearing feed generation 📊 </br>

### System Diagram
<img width="960" alt="image" src="https://user-images.githubusercontent.com/73184612/191729032-f61ea2aa-fd52-4a1d-81ab-d0382094f94b.png">



### Technologies Used:
| Name | Description
| ------ | ------ |
| React JS  | React is a free and open-source front-end JavaScript library for building user interfaces based on UI components.  |
| JavaScript | JavaScript is a text-based programming language used both on the client-side and server-side that allows you to make web pages interactive. It is a dynamic programming language that's used for web development, in web applications, for game development, and lots more |
| CSS3 | CSS3 stands for Cascading Style Sheet level 3, which is the advanced version of CSS. It is used for structuring, styling, and formatting web pages. |
| Java | Java is a programming language and computing platform first released by Sun Microsystems in 1995. It is a widely used object-oriented programming language and software platform that runs on billions of devices, including notebook computers, mobile devices, gaming consoles, medical devices, etc |
| Java Servlet | Servlets are the Java programs that run on the Java-enabled web server or application server. They are used to handle the request obtained from the webserver, process the request, produce the response, then send a response back to the webserver. It is a software component that extends the capabilities of a server. |
| Spring Tools Suite | Spring Tool Suite (STS) is a java IDE tailored for developing Spring-based enterprise applications. Powered by VMWare, it is easier, faster, free, open-source and based on Eclipse IDE |
| Apache Tomcat Server | Apache Tomcat is a popular open source web server and Servlet container for Java code. |

### Future Enhancements:
- 📜 UI screen that allows the user to access the last 5 validation results
- 📧 Feature for the bank authorities to enable a daily email report containing count of valid and invalid transactions. 
- 📊 Weekly/ monthly analysis reports based on the transaction history stored in a database.

***

### Local Setup:

Download Code folder </br>
- **Backend** :
1. Open Eclipse or STS.
2. Go to File -> Import Project -> Maven -> Existing Maven Projects -> Browse Folder location -> check "Add project to working set" -> Finish
3. Right click on pom.xml -> Maven -> Update Project
4. Open Boot Dashboard
5. Right Click on Project -> start
6. Server will get started on port 8080

- **Frontend** :
1. Open folder with VS Code 
2. Open terminal
3. Run command 'npm install' to install the dependencies. 
4. Run command 'npm start' to start the server
5. Open http://localhost:3000 from your browser

***

### References/ Additional sources:

**UI components**: https://mui.com/ </br>
**Icons**: https://fontawesome.com/ </br>
**Charts & Visualization** : https://react-chartjs-2.js.org/ </br>
**Open Source Vector Images**: https://undraw.co/ , https://storyset.com/ </br>
https://www.smartcheque.com.au/solutions/cheque-truncation-system-cts.html

***
## Group 19 team members
- <a href="https://github.com/AJgthb2002"><img src="https://user-images.githubusercontent.com/73184612/190358185-66c69665-94d3-4562-9649-ffd7e58e8730.png" height="20" width="20"></a> Ananya Joshi

- <a href="https://github.com/ishashivalkar25"><img src="https://user-images.githubusercontent.com/73184612/190358185-66c69665-94d3-4562-9649-ffd7e58e8730.png" height="20" width="20"></a> Isha Shivalkar  
- <a href=""><img src="https://user-images.githubusercontent.com/73184612/190358185-66c69665-94d3-4562-9649-ffd7e58e8730.png" height="20" width="20"></a> Prachi Narlawar 
- <a href="https://github.com/samruddhideode"><img src="https://user-images.githubusercontent.com/73184612/190358185-66c69665-94d3-4562-9649-ffd7e58e8730.png" height="20" width="20"></a> Samruddhi Deode  
- <a href="https://github.com/Swati0511-debug"><img src="https://user-images.githubusercontent.com/73184612/190358185-66c69665-94d3-4562-9649-ffd7e58e8730.png" height="20" width="20"></a> Swati Borse   
