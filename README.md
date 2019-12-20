# School Data Dashboard  
This is a School Data Dashboard that shows the latest assessment information for (a fictional) school,
Grange Hill Primary School. The mains users would be school leaders, team leaders, teachers and possibly inspectors.
The information enables the school to analyse the achievement of the students across the range of 
core subjects (Reading, Writing and Mathematics) and compare different groups using context filters.

The assessment information can be filtered by cohort, using the selector, so that appropriate resources can be targeted to 
raise achievement where the greatest support is needed.

The average graphs, in section 3, enable the school to compare the overall attainment in each cohort by subject.

## UX
### User Stories
* As a teacher I can analyse the performance my cohort so that I am able to identify strengths and areas to focus my teaching
interventions and which subject to develop my skills in.

* As a school leader I can compare the performance of cohorts using the selector tool or comparing averages 
so that I can target school resources for maximum proogress in student's outcomes.

* As a school leader I can view the whole school performance so that I can analyse the effectiveness of school strategies 
and adapt accordingly. 

* As the school's special educational needs coordinator and I can analyse the performance of children with special needs and
compare to children who do not have special needs so that I know how to target my staff resources.

* As the school's English Subject Leader I can see how well students are performing in reading and writing and see which cohorts 
or teachers may need great support or training.

* As a consultant (or inspector) I can analyse the performance of 'Pupil Premium' children to see how well the school is supporting
students who are disadvantaged and see how well the school is spending its 'Pupil Premium' funding. This is so that I can provide 
guidance to the school.

### Wireframes - links from Adobe XD
[Wireframe v1] (https://xd.adobe.com/view/1ee6e074-8697-49e8-4e0e-4ded2cb78a95-68d7/)
[Wireframe v2] (https://xd.adobe.com/view/1ee6e074-8697-49e8-4e0e-4ded2cb78a95-68d7/)

PDF files also available in the project folders.

## Features
### Feature 1 - Cohort Selector
This allows all users to select a specific cohort by using the dropdown menu.

### Feature 2 - Context Filters
This allows users to analyse the context of the school (eg how many boys compared to girls) and then filter
by clicking on the chart segments to compare data with regars to that specific selection.

### Feature 3 - Subject Attainment Spread
This allows users to analyse the attainment spread of students for each subject. Results can be filtered by cohort using 
the selector (above) or by clicking one of the chart segments to filter further still. The latter enbales users to see
how well students perform across more than one subbject.

### Feature 4 - Cohort Average Comparisons
This allows school leaders to compare cohorts by average attainment (based on 2 being equal to the minimum expectation). You can click on the bars or use 
selector to filter by cohort.

## Technologies Used
### d3 / dc and Crossfilter
The project uses d3, dc and crossfilter libraries to create the charts and make turn them into interactive filtering tools.

### JQuery
The project uses JQuery to create an event that makes the website responsive.

### Bootstrap / Bootswatch
The project uses the Yeti theme from Bootswatch which benefits from the Bootstrap library.

https://www.bootstrapcdn.com/bootswatch/
https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/yeti/bootstrap.min.css

## Testing
###  Test 1: Use selector tool to see Year 2 students only
Try to select Year 2 cohort from the dropdown selector and all charts transition to show to data for Y2 onlt.

### Test 2: Use Context filter to see boys only
Try to view boys assessment dat only by clking on the relevant pie sgement on the gender chart and all charts transition to 
reveal data for boys only, including other context graphs, subjects and average charts.

### Test 3: Compare average assessment data for children with an EHCP (Educational Health Care Plan)
Use the context selector to click on the segment that represents 'EHCP' and the average charts for each subject show students
with an EHCP only.

### Test 4: Responsiveness
Chart Sections adpat according to screen size appropriately. JQuery has been used to identify changes in screen sizes and react by 
causing the charts to re-render and adapt accordingly. Boostrap and css media queries have been used to support the changes 
in html structure in order to look clean and efficient on desktop, tablet and mobile. The site has been tested on an Macbook Pro, iPad and iPhone 6
as well as using the Chrome inspector tool to view on various screen sizes.

### Device Testing
The application loads well on all thre devices testes, which include iPhone 6 and iPad Pro (9 inch version). It appears that the tooltip does not
work on these devices so this will need some reworking in the next version.

## Bugs and Problems
### Crossfilter and dc limitations
I initially set out to have one chart per cohort and be able to select subjects via a dropdown menu or button. This was more challenging 
than I thought it would be. d3 was uanable to read the data in the way I wanted despite hours of research and attempts at creating
charts with limted success. There ways around this such as creating several website pages and clicking through using a button buttonI decided
to play to the strengths of dc and crossfilter and adpat my site accordingly. I restructured my data file numerous times to get the output 
and distilled my goal from something too complex to something more achievable for my ability. Instead the outcome was the simples
pie charts that can be seen in the subject sections.

During the project I found very little documentation and guidance in d3, dc and crossfilter. I made use of the examples 
available and Tutor Support but to gain a deeper understanding so that I could manipulate the codeto achiev
my end goal proved to be (fun but) challenging.

### The importance of the 'value accessor' in the average charts
It took me a long time to realise that I needed the value accessor to ensure the average charts returned any response.

### parse data to change ot to integers
Intitially I tried changing the data in my google sheets file to ensure the format was integers but despite this 
realised that I needed to parse the data into integers using a forEach loop due to the structure of the data file.

### Challenges with JQuery for responsiveness
Trying to make the site responsive using the JQuery events presented challenges and I drew upon support from the Code Institute
Tutor Support. It took many hours and going back and forth with a number of differne tutors before settling on what looks like
the simplest two lines of code possible. It took a few more adapatations following their support, such as, playing with the 
chart radii and heights to see what works best and looks cleanest. With the help of Tutor Support I adpated the Bootstrap structure
for tablets so that the charts did not overlap each other.

### Pie Chart labelling
For the purpose of my site I wanted very specific labelling for each of the chart segments. I eventually adapted some code I found
on Stack Overflow to meet my end goal of showing % and number of incidents, i.e. students.

### Centering / aligning charts and legends
Due to the nature of dc it was a challengint co align the charts correctly with html headings and without overlapping legends. I 
played with the legend x and y position to get this right but it fell to using css - structuring the columns and padding to 
achieve (as close to as I can get) the desirable appearance. 

### dc version
At the very beginning I had trouble parsing the data file due to the version of dc that I was using. With the help of my mentor
we tried an earlier version of dc which was ensured success.

### Deployment
#### GitHub Pages
The site was deployed using GitHub Pages. To do this from within the GitHub repository follow the `settings` link and then scroll to 
the bottom of the page to find GitHub pages. Select `master branch` as the source and then click save.

#### Local Deployment
You can also deploy the project locally by following the `clone / download` link from the main repository page and copy the link. 
Then, open up a new terminal in your IDE and type 'git clone' followed directly by the copied link.

## New Features to follow in the next version
* Add in the ability to reset all filters with a reset button
* Add in landing page, contact page and support
* Improve responsive design by smoothing / improving how charts re-draw
* Fix the help-tip for iPad and other devices with touch screen.

## Credits
* https://tutorialzine.com/2014/07/css-inline-help-tips (for the little question mark to help explain education abbreviations)
* Code Institute lessons on d3, dc and crossfilter, including GitHub example code. Especially the mini-project on Professors 
data dashboard.
* Boostrap / Bootswatch- Yeti theme
* https://stackoverflow.com/questions/25209971/add-percentages-to-the-pie-chart-label-in-dc-js 
    Stack Overflow for the basis of the pie chart labels
* https://dc-js.github.io/dc.js/examples/ (to look for examples similar to my end goal)
* https://api.jquery.com/resize/ (to gain further depth of understanding on JQuery events for resizing)
