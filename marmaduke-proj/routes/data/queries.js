"use strict";

let fShipsNow = function(params){
    const query = `SELECT 
    id_control_unit_data, ship_description,
    MAX_TRIP.last_record AS last_record, 
    array_states[cursor_now+1] AS act_state, state_name,
    main_event_field
    FROM states, ships
    INNER JOIN control_unit_data
    ON fk_ship = id_ship
    INNER JOIN sequences
    ON control_unit_data.fk_portinformer = sequences.fk_portinformer
    INNER JOIN (
        SELECT fk_control_unit_data,
        MAX(ts_main_event_field_val) AS last_record
        FROM trips_logs
        WHERE fk_state in ${params.statesOfInterest} 
        GROUP BY fk_control_unit_data
    ) as MAX_TRIP 
    ON MAX_TRIP.fk_control_unit_data = id_control_unit_data
    WHERE (is_active = true
    OR on_hold = true
    OR ts_archived >= '${params.mdate}')
    AND array_states[cursor_now+1] = states.id_state
    AND array_states[cursor_now+1] in ${params.statesOfInterest}
    AND control_unit_data.fk_portinformer = ${params.id}
    ORDER BY id_control_unit_data`;

    return query;
}

let fShipsStaticData = function(params){
    const query = `SELECT 
    id_control_unit_data, ship_description,
    MAX_TRIP.last_record AS last_record, 
    array_states[cursor_now+1] AS act_state, state_name,
    main_event_field
    FROM states, ships
    INNER JOIN control_unit_data
    ON fk_ship = id_ship
    INNER JOIN sequences
    ON control_unit_data.fk_portinformer = sequences.fk_portinformer
    INNER JOIN (
        SELECT fk_control_unit_data,
        MAX(ts_main_event_field_val) AS last_record
        FROM trips_logs
        WHERE fk_state in ${params.statesOfInterest}
        AND LENGTH(ts_main_event_field_val) > 4
        AND DATE(ts_main_event_field_val) = '${params.mdate}' 
        GROUP BY fk_control_unit_data
    ) as MAX_TRIP 
    ON MAX_TRIP.fk_control_unit_data = id_control_unit_data
    WHERE array_states[cursor_now+1] = states.id_state
    AND array_states[cursor_now+1] in ${params.statesOfInterest}
    AND control_unit_data.fk_portinformer = ${params.id}
    ORDER BY id_control_unit_data`;

    return query;
}


module.exports = {
    shipsNow: fShipsNow,
    shipsStatic: fShipsStaticData
};
