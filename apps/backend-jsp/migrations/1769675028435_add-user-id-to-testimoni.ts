import { MigrationBuilder } from 'node-pg-migrate';


export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.addColumn('testimoni', {
        user_id: {
            type: 'text', notNull: false,
            references: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropColumn('testimoni', ['user_id'])
}
