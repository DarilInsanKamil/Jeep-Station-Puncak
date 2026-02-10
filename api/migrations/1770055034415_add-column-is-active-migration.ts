import { MigrationBuilder } from 'node-pg-migrate';


export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addColumns('bundles', { is_active: { type: 'boolean' } });
}

export async function down(pgm: MigrationBuilder): Promise<void> { }
