import { MigrationBuilder } from 'node-pg-migrate';


export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('bundles', {
        id: {
            type: 'text',
            notNull: true
        },
        title: {
            type: 'varchar(100)',
            notNull: true
        },
        harga: {
            type: 'bigint',
            notNull: true
        },
        deskripsi: {
            type: 'text',
            notNull: true
        },
        jumlah_unit: {
            type: 'integer',
            notNull: true,
            default: 1
        },
        addOns: {
            type: 'jsonb'
        },
        gambar_bundles: {
            type: 'text',
            notNull: true
        },
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
    pgm.addConstraint('bundles', 'bundles_pkey', {
        primaryKey: 'id'
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('bundles')
}
