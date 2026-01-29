import { MigrationBuilder } from 'node-pg-migrate';


export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('pembayaran', {
        id: {
            type: 'text',
            notNull: true
        },
        reservasi_id: {
            type: 'text',
            references: 'reservasi',
            onDelete: 'CASCADE',
            notNull: true
        },
        jenis_pembayaran: {
            type: 'varchar(50)',
            notNull: true
        },
        nominal: { type: 'bigint', notNull: true },
        metode_pembayaran: { type: 'text' },
        status: {
            type: 'varchar(30)',
            default: 'Success'
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
    pgm.addConstraint('pembayaran', 'pembayaran_pkey', {
        primaryKey: 'id'
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('pembayaran')
}
