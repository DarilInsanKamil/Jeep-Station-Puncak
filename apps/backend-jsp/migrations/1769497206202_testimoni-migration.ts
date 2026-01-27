import { MigrationBuilder } from 'node-pg-migrate';


export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('testimoni', {
        id: { type: 'varchar(100)', notNull: true },
        name: { type: 'varchar(100)', notNull: true },
        komentar: { type: 'text', notNull: true },
        rating: { type: 'integer', notNull: true },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> { }
