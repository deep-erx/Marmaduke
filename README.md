# The Dook
REST APIs - Documentation 

**REAL TIME DATA**

|-|API | URL | Description|JSON|
|:|:----|:-----|:------------|:--|
|1|Moored now|/live_data/moored/:id/|Get portinformer's currently moored| * |
|2|At roadstead now|/live_data/roadstead/:id/|Get portinformer's currently at roadstead|
|3|Arrivals|/live_data/arrivals/:id|Get portinformer's arrivals today| 
|4|Departures|/live_data/departures/:id    | Get portinformer's departures today| 
|5|Arrival previsions today|/live_data/arrival_previsions/:id    |Get portinformer's arrival previsions  |
|6|Traffic list|/live_data/traffic_list/:id    |Get portinformer's traffic list data   |
|7|Commercial operations|/live_data/shipped_goods/:id    |Get portinformer's shipped goods data    |


**ARCHIVE DATA**

|API | URL | Description|
|:----|:-----|:------------|
|Moored|/archive_data/moored/:id/:startTimestamp/:stopTimestamp/|Get portinformer moored|
|At roadstead|/archive_data/roadstead/:id/:startTimestamp/:stopTimestamp/|Get portinformer at roadstead|
|Arrival previsions|/archive_data/arrival_previsions/:id    |Get portinformer's arrival previsions  |
|Arrivals|/archive_data/arrivals/:id/:startTimestamp/:stopTimestamp/|Get portinformer arrivals|
|Departures|/archive_data/departures/:id/:startTimestamp/:stopTimestamp/|Get portinformer departures| 
|Traffic list|    |    |
|Commercial operations|    |    |
