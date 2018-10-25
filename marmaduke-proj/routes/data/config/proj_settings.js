STATES = {
    MOORING: {
        TABLE_NAME: "data_ormeggio_nave", 
        ID: "17"
        },
    MOORING_TO_MOORING: {
        TABLE_NAME: "data_da_ormeggio_a_ormeggio",
        ID: "18"
        },
    ROADSTEAD_TO_MOORING: {
        TABLE_NAME: "data_da_rada_a_ormeggio",
        ID: "20"
        },
    WARPING: {
        TABLE_NAME: "data_tonneggio", 
        ID: "21"
    },
    SIDE_CHANGING: {
        TABLE_NAME: "data_rotazione",
        ID: "22"
    },
    ROADSTEAD: {
        TABLE_NAME: "data_arrivo_in_rada",
        ID: "16"
    },
    MOORING_TO_ROADSTEAD: {
        TABLE_NAME: "data_da_ormeggio_a_rada",
        ID: "19"
    }
}
    

module.exports = {
    SHIP_STATES: STATES,
    STATES_OF_MOORING: "(17, 18, 20, 21, 22)",
    STATES_OF_ROADSTEAD: "(16, 19, 23)",
    STATES_OF_ARRIVAL_PREVISION: "(10)",
    STATES_OF_ARRIVALS: "(13)",
    STATES_OF_DEPARTURES: "(26)",
};

