<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="https://glitch.com/favicon.ico" />

    <link rel="stylesheet" type="text/css" href="style.css" />

    <title>Clearing Feed Generator</title>


    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-core.min.js"></script>
    <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-pie.min.js"></script>

    <!--Bootstrap links-->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <!--     outer container -->
    <div
      class="flex flex-col w-full h-screen overflow-auto bg-[url('https://www.transparenttextures.com/patterns/checkered-pattern.png')]"
    >
      <div class="flex w-full justify-center px-4">
        <img
          src="https://cdn.glitch.global/7ab4f52d-6d6c-4e16-9244-84c1766734df/undraw_file_bundle_re_6q1e.svg?v=1649509702702"
          height="200"
          width="300"
        />

        <div class="flex flex-col h-full p-4 pl-6">
          <!--         title section -->
          <div class="flex justify-center py-20">
            <h1 class="text-4xl font-bold">Clearing Feed Generation System</h1>
          </div>

          <!--         upload and check buttons section -->
          <div class="flex justify-center">
            <div class="flex flex-col justify-center">
              <form:form method = "GET" action = "/upload">
                <div class="flex gap-4">
                  <h2 class="text-lg font-semibold">Step 1 :</h2>

                  <input
                    type="file"
                    id="myfile"
                    name="myfile"
                    class="rounded-lg px-4 py-2 bg-blue-600 text-white text-semibold shadow-lg hover:bg-blue-400"
                  />
                </div>
                
                <div class="flex gap-4 mt-4">
                  <h2 class="text-lg font-semibold">Step 2 :</h2>
                  <button id = "fileupload" type="submit" class="rounded-lg px-4 py-2 bg-blue-600 text-white text-semibold shadow-lg hover:bg-blue-400"
                  onclick="uploadFile()">
                    Check
                  </button>
                </div>
                
              </form:form>
            </div>
          </div>
          <div class="flex justify-start ml-16 mt-4">
            <h2 class="text-lg font-semibold">
              Step 3 : &nbsp; &nbsp; View the result below!
            </h2>
          </div>
        </div>

        <img
          src="https://cdn.glitch.global/7ab4f52d-6d6c-4e16-9244-84c1766734df/undraw_filing_system_re_56h6.svg?v=1649509604609"
          height="200"
          width="300"
        />
      </div>

      <!--       result tabs section -->

      <section id="tabs" class="project-tab mt-8 px-8">
        <div class="container">
          <div class="flex mb-4">
            <div class="col-md-12">
              <div class="tabContainer">
                <div class="buttonContainer">
                  <button onclick="showPanel(0,'#83f2be')">
                    <div class="flex gap-4 justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3388/3388530.png"
                        height="20"
                        width="20"
                      />
                      <span>Valid Records</span>
                    </div>
                  </button>
                  <button onclick="showPanel(1,'#fa9996')">
                    <div class="flex gap-4 justify-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828774.png"
                        height="10"
                        width="20"
                      />
                      <span>Invalid Records</span>
                    </div>
                  </button>
                </div>
                <div class="tabPanel">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Transaction Ref#</th>
                        <th scope="col">Value Date</th>
                        <th scope="col">Payer Name</th>
                        <th scope="col">Payer Account#</th>
                        <th scope="col">Payee Name</th>
                        <th scope="col">Payee Account#</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>12/02/2020</td>
                        <td>ABC</td>
                        <td>ABC123456</td>
                        <td>XYZ</td>
                        <td>XYZ123456</td>
                        <td>50000</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>22/02/2020</td>
                        <td>ABC</td>
                        <td>ABC123456</td>
                        <td>PQR</td>
                        <td>PQR123456</td>
                        <td>80000</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>17/05/2022</td>
                        <td>IJK</td>
                        <td>IJK123456</td>
                        <td>XYZ</td>
                        <td>XYZ123456</td>
                        <td>55000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="tabPanel">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Transaction Ref#</th>
                        <th scope="col">Value Date</th>
                        <th scope="col">Payer Name</th>
                        <th scope="col">Payer Account#</th>
                        <th scope="col">Payee Name</th>
                        <th scope="col">Payee Account#</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">4</th>
                        <td>12/02/2020</td>
                        <td>XYZ</td>
                        <td>XXX123456</td>
                        <td>DEF</td>
                        <td>XYZ123456</td>
                        <td>50000</td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td>22/02/2020</td>
                        <td>PQR</td>
                        <td>ABC123456</td>
                        <td>LMN</td>
                        <td>PQR123456</td>
                        <td>80000</td>
                      </tr>
                      <tr>
                        <th scope="row">6</th>
                        <td>17/05/2022</td>
                        <td>LMN</td>
                        <td>LMN123456</td>
                        <td>XYZ</td>
                        <td>XYZ123456</td>
                        <td>55000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
<!--       download button -->

      <div class="flex w-full justify-center mb-8 px-4">
        <a
          class="rounded-lg bg-blue-600 shadow-lg px-4 py-2 text-semibold text-lg text-white hover:bg-blue-400"
          href="valid.txt"
          download
          >Download valid transactions</a
        >
      </div>
      
<!--       charts section -->
      <div id="piechart" class="flex justify-center"></div>

      <!--       footer section -->
      <div class="flex w-full bg-black justify-center px-12 py-4 mt-8">
        <span class="text-sm text-gray-200"
          >Made by GROUP-19 for Citi Bridge 2022</span
        >
      </div>
    </div>
    
<!--     ------- Scripts ------------------- -->

	<script>
	//code to upload file to springboot 
	async function uploadFile(){
		console.log("upload file");
		let formData = new FormData();
		formData.append("file", myfile.files[0]);
		let response = await fetch('/upload', {
			method: "POST",
			body: formData
		});
	}
	
	</script>
    
    <script
      type="text/javascript"
      src="https://www.gstatic.com/charts/loader.js"
    ></script>

    <script type="text/javascript">
      // Load google charts
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);

      // Draw the chart and set the chart values
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ["Transaction Type", "Count"],
          ["Valid", 45],
          ["Invalid", 23],
        ]);

        // Optional; add a title and set the width and height of the chart
        var options = { title: "Transaction Results", width: 600, height: 400 };

        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.PieChart(
          document.getElementById("piechart")
        );
        chart.draw(data, options);
      }
    </script>

    <script src="script.js"></script>
  </body>
</html>
