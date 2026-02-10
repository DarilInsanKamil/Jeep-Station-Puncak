import { MigrationBuilder } from 'node-pg-migrate';

export const shorthands = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('users', {
        id: { type: 'varchar(1000)', notNull: true },
        role: { type: 'varchar(100)', notNull: false },
        email: { type: 'varchar(1000)', notNull: true, unique: true },
        username: { type: 'varchar(1000)', notNull: true },
        password: { type: 'varchar(1000)', notNull: true },
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
    pgm.addConstraint('users', 'users_pkey', {
        primaryKey: 'id'
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('users')
}
