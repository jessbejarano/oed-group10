const database = require('./database');
    const sqlFile = database.sqlFile;

    class ConversionTime {
        /**
        * @param {*} sourceId The unit id of the source.
        * @param {*} destinationId The unit id of the destination.
        * @param {*} bidirectional Is this conversion bidirectional?
        * @param {*} startTime
        * @param {*} endTime
        * @param {*} slope The slope of the conversion.
        * @param {*} intercept The intercept of the conversion.
        * @param {*} note Comments by the admin or OED inserted.
        */
        constructor(sourceId, destinationId, bidirectional, startTime, endTime, slope, intercept, note) {
            this.sourceId = sourceId;
            this.destinationId = destinationId;
            this.bidirectional = bidirectional;
            this.startTime = startTime;
            this.endTime = endTime;
            this.slope = slope;
            this.intercept = intercept;
            this.note = note;
        }

        /**
        * Returns a promise to create the conversions table.
        * @param {*} conn The connection to use.
        * @returns {Promise.<>}
        */
        static createTable(conn) {
            return conn.none(sqlFile('conversion/create_conversions_time_table.sql'));
        }

        /**
        * Creates a new conversion from the row's data.
        * @param {*} row The row from which the conversion will be created.
        * @returns The new conversion object.
        */
        static mapRow(row) {
            return new Conversion(row.source_id, row.destination_id, row.bidirectional, row.start_time, row.end_time, row.slope, row.intercept, row.note);
        }

        /**
        * Get all conversions in the database.
        * @param {*} conn The connection to use.
        * @returns {Promise.<Array.<Conversion>>}
        */
        static async getAll(conn) {
            const rows = await conn.any(sqlFile('conversion/get_all_conversions_time.sql'));
            return rows.map(Conversion.mapRow);
        }

        /**
        * Returns the conversion associated with source and destination. If the conversion doesn't exist then return null.
        * @param {*} source The source unit id.
        * @param {*} destination The destination unit id.
        * @param {*} conn The connection to use.
        * @returns {Promise.<Conversion>}
        */
        static async getBySourceDestination(source, destination, conn) {
            const row = await conn.oneOrNone(sqlFile('conversion/get_conversions_time_by_source_destination.sql'), {
                source: source,
                destination: destination
            });
            return row === null ? null : Conversion.mapRow(row);
        }

        /**
        * Inserts a new conversion to the database.
        * @param {*} conn The connection to use.
        */
        async insert(conn) {
            const conversion = this;
            await conn.none(sqlFile('conversion/insert_new_conversion_time.sql'), conversion);
        }

        /**
        * Updates an existed conversion in the database.
        * @param {*} conn The connection to use.
        */
        async update(conn) {
            const conversion = this;
            await conn.none(sqlFile('conversion/update_conversion_time.sql'), conversion);
        }

        /**
        * Deletes the conversion associated with source and destination from the database.
        * @param {*} source The source unit id.
        * @param {*} destination The destination unit id.
        * @param {*} conn The connection to use.
        */
        static async delete(source, destination, conn) {
            await conn.none(sqlFile('conversion/delete_conversion_time.sql'), {
                source: source,
                destination: destination
            });
        }
    }
    module.exports = ConversionsTime;
