import { MigrationBuilder } from 'node-pg-migrate';


export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('customers', {
        id: { type: 'text', notNull: true },
        nama_lengkap: { type: 'text', notNull: true },
        email: { type: 'varchar(100)', notNull: true },
        no_hp: { type: 'varchar(100)', notNull: true },
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
    pgm.addConstraint('customers', 'customers_pkey', {
        primaryKey: 'id'
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('customers')
}
