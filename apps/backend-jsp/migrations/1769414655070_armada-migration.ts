import { MigrationBuilder } from 'node-pg-migrate';


export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('armada', {
        id: { type: 'varchar(1000)', notNull: true },
        nama_armada: { type: 'varchar(1000)', notNull: true },
        gambar_armada: { type: 'text', notNull: false },
        plat_nomor: { type: 'varchar(20)', notNull: true },
        kapasitas: { type: 'integer', notNull: true },
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
