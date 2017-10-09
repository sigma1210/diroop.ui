# diroop.ui


diroop.ui is a the ui for the diroop tools. It allows a developer to search, view,
expand and create lorem ipsom examples of Json schemas as define in the readme.md for diroop tools

diroop.ui is self contained application that can be viewed with in a modern web browser by opening the  the index.html

diroop.ui is in addition to be a self contained application used to view Json schema it is also meant as an angular seed application.

The source for the application is well organized into functional areas with the UI and service logic being separated to facilitate reuse and rebranding. Presentation is defined in the ui module and the core services are defined in the tool module.

Unit test are defined for each component and a coverage report can be viewed in the diroop.ui/coverage/html/index.html

To build this application it is assumed Node.js( https://nodejs.org) and git(https://git-scm.com/downloads) are installed on the developer's computer.


The steps to build, package and test the application are as follows

1. clone diroop.ui
    git clone https://github.com/sigma1210/diroop.ui.git
2. change directors to the diroop.ui folder and execute *npm install*  command  ~with administrator privileges~ to load the required node modules
3. execute the *bower install* command to load all required bower components
4. Build and test the application by executing the *gulp test* command
    A coverage report for the test can be viwed at diroop.ui/coverage/html/index.html

    The application can be viewed at diroop.ui/index.html


The application is comprised of a simple view the demonstareds the use of angular routes to view different angular views within a single page application.
The main view of the application contains the Schema viewer - a reusable component that code be easily reused in other angular applications.

The viewer is comprised of a Type ahead component that allows the the user to search for loaded schemas with in the tool.
When the user selects a loaded schema, they are presented with several tabs above a Json viewer of the schema labeled raw , expanded, sample and if and only if there is an error reading or expanding the schema an error tab.

  Selecting raw will load the schema without $ref being expanded
  Selecting expand will expand all the $ref schemas and display the schema fully expanded
  Selecting sample will create 'lorem ipsum' filled javascript objects that adheres to the schema specified. This sample can be used to create mock UIs which will adhere to the json served by Rest Api Calls.
