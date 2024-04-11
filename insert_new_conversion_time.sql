INSERT INTO conversions_time(source_id, destination_id, bidirectional, start_time, end_time, slope, intercept, note)
        VALUES (${sourceId}, ${destinationId}, ${bidirectional}, ${start_time}, ${end_time} ${slope}, ${intercept}, ${note});

        --Example Insert: With -infinity & infinity
        -- INSERT INTO conversions_time (source_id, destination_id, bidirectional, start_time, end_time, slope, intercept, note)
        -- VALUES (1, 2, true, '-infinity', 'infinity', 0.5, 2.0, 'Example conversion');