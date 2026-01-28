import { MigrationBuilder } from 'node-pg-migrate';


export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('gallery', {
        id: { type: 'text', notNull: true },
        gambar_url: { type: 'text', notNull: true },
        deskripsi: { type: 'text', notNull: true },
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
