CREATE TABLE IF NOT EXISTS conversions_time(
        source_id INTEGER NOT NULL REFERENCES units(id),
        destination_id INTEGER NOT NULL REFERENCES units(id),
        bidirectional BOOLEAN NOT NULL, 
        start_time TIMESTAMP, --  TIMESTAMP '-infinity'
        end_time TIMESTAMP, --  TIMESTAMP 'infinity'
        slope FLOAT, --this is the rate
        intercept FLOAT,
        note TEXT,
        CHECK (source_id != destination_id),
        PRIMARY KEY (source_id, destination_id)
    );