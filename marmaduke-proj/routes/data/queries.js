"use strict";

let fMooredNow = function (params) {
    const query = `SELECT 
    id_control_unit_data, ship_description, 
    array_states[control_unit_data.cursor_now+1] AS now,
    state_name
    FROM ships INNER JOIN control_unit_data
    ON fk_ship = id_ship 
    INNER JOIN sequences
    ON control_unit_data.fk_portinformer = sequences.fk_portinformer
    INNER JOIN states
    ON states.id_state = array_states[control_unit_data.cursor_now+1]
    WHERE is_active = true
    AND array_states[control_unit_data.cursor_now+1] in ${params.statesOfMooring}
    AND control_unit_data.fk_portinformer = ${params.id}`;

    return query;
};

module.exports = {
    mooredNow: fMooredNow
};
