import { MigrationBuilder } from 'node-pg-migrate';


export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('reservasi', {
        id: {
            type: 'text',
            notNull: true
        },
        kode_booking: {
            type: 'text',
            notNull: true,
            unique: true
        },
        armada_id: {
            type: 'text',
            notNull: false,
            references: 'armada',
            onDelete: 'RESTRICT'
        },
        jumlah_unit: {
            type: 'integer',
            notNull: true,
        },
        bundle_id: {
            type: 'text',
            notNull: false,
            references: 'bundles',
            onDelete: 'CASCADE'
        },
        tanggal_mulai: {
            type: 'date',
            notNull: true
        },
        tanggal_selesai: {
            type: 'date',
            notNull: true
        },
        durasi: {
            type: 'integer',
            notNull: true
        },
        total_harga: {
            type: 'bigint',
            notNull: true
        },
        minimal_dp: {
            type: 'bigint',
            notNull: true
        },
        sisa_pembayaran: {
            type: 'bigint',
            notNull: true
        },
        status_transaksi: {
            type: 'varchar(50)',
            default: 'Menunggu DP'
        },
        customer_id: {
            type: 'text',
            notNull: true,
            references: 'customers',
            onDelete: 'CASCADE'
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
    pgm.addConstraint('reservasi', 'reservasi_pkey', {
        primaryKey: 'id'
    })
    pgm.createIndex('reservasi', 'customer_id');
    pgm.createIndex('reservasi', 'armada_id');
    pgm.createIndex('reservasi', 'tanggal_mulai');
    pgm.createIndex('reservasi', 'tanggal_selesai');
    pgm.createIndex('reservasi', 'kode_booking');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('reservasi')
}
