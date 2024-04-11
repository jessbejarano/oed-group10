UPDATE conversions_time
        SET bidirectional = ${bidirectional},
            start_time = ${start_time},
            end_time = ${end_time},
            slope = ${slope},
            intercept = ${intercept},
            note = ${note}
        WHERE source_id = ${sourceId} AND destination_id = ${destinationId};