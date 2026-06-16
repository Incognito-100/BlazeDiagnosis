import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Import the tables directly from the schema paths
import { tenants } from './schema/tenants';
import { customers } from './schema/customers';
import { auditLogs } from './schema/audit';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is missing at runtime.');
}

// Set up a direct, independent pool connection
const pool = new Pool({
  connectionString: databaseUrl,
});
const db = drizzle(pool);

const SYSTEM_TENANT_ID = '00000000-0000-0000-0000-000000000001';

async function main() {
  console.log('⏳ Starting isolated database seeding process...');

  try {
    // 1. Create a foundational Global Testing Tenant
    console.log('🏢 Seeding default developer tenant...');
    await db.insert(tenants).values({
      id: SYSTEM_TENANT_ID,
      name: 'Blaze POS Dev Workshop',
      slug: 'blaze-pos-dev-workshop', 
    }).onConflictDoNothing(); 

    // 2. Create sample Customer Profiles
    console.log('👥 Seeding mock customer profiles...');
    await db.insert(customers).values([
      {
        tenantId: SYSTEM_TENANT_ID,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
      {
        tenantId: SYSTEM_TENANT_ID,
        firstName: 'Sarah',
        lastName: 'Lee',
        email: 'sarah.lee@example.com',
      },
    ]).onConflictDoNothing();

    // 3. Create initial structural Audit Trails
    console.log('📜 Seeding baseline system audit records...');
    await db.insert(auditLogs).values([
      {
        tenantId: SYSTEM_TENANT_ID,
        action: 'SYSTEM_INITIALIZATION',
        entityType: 'SYSTEM',            
        entityId: SYSTEM_TENANT_ID,      
      },
    ]).onConflictDoNothing();

    console.log('✅ Database seeding operations completed successfully!');
  } catch (error) {
    console.error('❌ Critical failure encountered during seeding operation:', error);
    process.exit(1);
  } finally {
    await pool.end(); // Cleanly close the pool connection stream
    process.exit(0);
  }
}

main();