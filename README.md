# The Dook
REST APIs - Documentation 

**REAL TIME DATA**

|Nr|API | URL | Description|JSON response|
|:--|:----|:-----|:------------|:--|
|R1|Moored now|/live_data/moored/:id/|Get portinformer's currently moored| YES |
|R2|At roadstead now|/live_data/roadstead/:id/|Get portinformer's currently at roadstead|YES|
|R3|Arrivals|/live_data/arrivals/:id|Get portinformer's arrivals today| YES |
|R4|Departures|/live_data/departures/:id    | Get portinformer's departures today|YES| 
|R5|Arrival previsions today|/live_data/arrival_previsions/:id    |Get portinformer's arrival previsions  |YES|
|R6|Traffic list|/live_data/traffic_list/:id    |Get portinformer's traffic list data   ||
|R7|Commercial operations|/live_data/shipped_goods/:id    |Get portinformer's shipped goods data    ||


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


**Format details**

R1:

```json
{ "id_trip": {
    "id_trip": <string>,
    "ship_name": <string>,
    "stop_quay": <string>,
    "stop_berth": <string>,
    "mooring_time": <string>
    },
...
}
```

R2:

```json
{ "id_trip": {
    "id_trip": <string>,
    "ship_name": <string>,
    "anchorage_point": <string>,
    "anchorage_time": <string>
    },
...
}
```

R3:

```json
{ "counter": {
    "id_trip": <string>,
    "ship_name": <string>,
    "sighting_time": <string>
    },
...
}
```

R4:

```json
{ "counter": {
    "id_trip": <string>,
    "ship_name": <string>,
    "ts_out_of_sight": <string>
    },
...
}
```

R5:

```json
{ "counter": {
    "id_trip": <string>,
    "ship_name": <string>,
    "ts_arrival_prevision": <string>
    },
...
}
```


