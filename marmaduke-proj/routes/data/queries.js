"use strict";

let qShipsNow = function(params){
    return `SELECT id_control_unit_data, ship_description, ts_fine_ormeggio, 
            quays.description AS quay_description, berths.description AS berth_description
            FROM data_ormeggio_nave 
            INNER JOIN control_unit_data
            ON fk_control_unit_data = id_control_unit_data
            INNER JOIN ships 
            ON fk_ship = id_ship
            INNER JOIN trips_logs
            ON trips_logs.fk_control_unit_data = id_control_unit_data
            INNER JOIN maneuverings
            ON fk_maneuvering = id_maneuvering
            INNER JOIN quays
            ON fk_stop_quay = id_quay
            INNER JOIN berths
            ON fk_stop_berth = id_berth
            WHERE trips_logs.fk_state = ${params.stateOfInterest}
            AND is_active = true
            AND trips_logs.fk_portinformer = ${params.id}
            AND data_ormeggio_nave.id_data_ormeggio_nave = data_table_id::INTEGER`;
}

let qMooredNow = function(params){
    return `SELECT id_control_unit_data, ship_description, ts_fine_ormeggio, 
            quays.description, berths.description
            FROM data_ormeggio_nave 
            INNER JOIN control_unit_data
            ON fk_control_unit_data = id_control_unit_data
            INNER JOIN ships 
            ON fk_ship = id_ship
            INNER JOIN trips_logs
            ON trips_logs.fk_control_unit_data = id_control_unit_data
            INNER JOIN maneuverings
            ON fk_maneuvering = id_maneuvering
            INNER JOIN quays
            ON fk_stop_quay = id_quay
            INNER JOIN berths
            ON fk_stop_berth = id_berth
            WHERE trips_logs.fk_state = ${params.id_state}
            AND is_active = true
            AND trips_logs.fk_portinformer = ${params.id}
            AND data_ormeggio_nave.id_data_ormeggio_nave = data_table_id::INTEGER`;
}


let qShipsArchive = function(params){
    return `SELECT ship_description, MAX(ts_main_event_field_val) AS ts_max,
    fk_control_unit_data
    FROM trips_logs INNER JOIN control_unit_data 
    ON fk_control_unit_data = id_control_unit_data
    INNER JOIN ships on fk_ship = id_ship
    WHERE fk_state in ${params.statesOfInterest}
    AND control_unit_data.fk_portinformer = ${params.id}
    AND ts_main_event_field_val BETWEEN '${params.startTimestamp}'
    AND '${params.stopTimestamp}'
    GROUP BY fk_control_unit_data, ship_description`;
}

let qShipsStaticData = function(params){
    return `SELECT 
    id_control_unit_data, ship_description, 
    ts_main_event_field_val
    FROM trips_logs
    INNER JOIN control_unit_data
    ON fk_control_unit_data = id_control_unit_data
    INNER JOIN ships
    ON fk_ship = id_ship
    WHERE LENGTH(ts_main_event_field_val) > 4
    AND control_unit_data.fk_portinformer = ${params.id}
    AND DATE(ts_main_event_field_val) = '${params.mdate}'
    AND fk_state in ${params.statesOfInterest}
    ORDER BY id_control_unit_data`;
}

let qShipsArrivalPrevData = function(params){
    return `SELECT ts_arrival_prevision,
    ship_description 
    FROM planned_arrivals INNER JOIN ships
    ON fk_ship = id_ship
    WHERE is_active = true
    AND fk_portinformer = ${params.id}`;
}

let qArrivalPrevisionsArchive = function(params){
    return `SELECT ts_arrival_prevision,
    ship_description 
    FROM planned_arrivals INNER JOIN ships
    ON fk_ship = id_ship
    WHERE LENGTH(ts_arrival_prevision) > 0
    AND ts_arrival_prevision::DATE = '${params.inputDate}' 
    AND fk_portinformer = ${params.id}`;
}

let qShippedGoodsNow = function(params){
    return `SELECT id_control_unit_data, quantity, unit, 
    ship_description, description as goods_category,
    goods_mvmnt_type 
    FROM goods_categories INNER JOIN shipped_goods 
    ON fk_goods_category  = id_goods_category
    INNER JOIN control_unit_data
    on shipped_goods.fk_control_unit_data = id_control_unit_data
    INNER JOIN ships
    ON fk_ship = id_ship
    WHERE control_unit_data.is_active = true
    AND control_unit_data.fk_portinformer = ${params.id}`;
} 

let qTrafficListNow = function(params){
    return `SELECT id_control_unit_data, 
    ship_description, num_container, num_camion, num_passengers, 
    num_furgoni, num_rimorchi, num_auto, num_moto, num_camper,
    num_bus, num_minibus, traffic_list_mvnt_type
    FROM ships INNER JOIN control_unit_data
    ON fk_ship = id_ship
    INNER JOIN traffic_list 
    ON fk_control_unit_data  = id_control_unit_data
    WHERE control_unit_data.is_active = true
    AND control_unit_data.fk_portinformer = ${params.id}`;
} 

module.exports = {
    shipsNow: qShipsNow,
    shipsStatic: qShipsStaticData,
    shipsArrivalPrevs: qShipsArrivalPrevData,
    shippedGoodsNow: qShippedGoodsNow,
    trafficListNow: qTrafficListNow,
    shipsArchive: qShipsArchive,
    mooredNow: qMooredNow,
    arrivalPrevisionsArchive: qArrivalPrevisionsArchive,
};
