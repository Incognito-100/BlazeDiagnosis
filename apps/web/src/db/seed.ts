import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv'; // 1. Import dotenv

// 2. Load the environment variables from your local .env file
dotenv.config({ path: '.env.local' }); // Or use '.env' if your string is in the main .env file

// Import the tables directly from the schema paths
import { tenants } from './schema/tenants';
import { customers } from './schema/customers';
import { auditLogs } from './schema/audit';

// Import our external filler data JSON payload safely
import fillerData from './filler-data.json';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is missing at runtime.');
}

const pool = new Pool({
  connectionString: databaseUrl,
});
const db = drizzle(pool);

const SYSTEM_TENANT_ID = '00000000-0000-0000-0000-000000000001';

async function main() {
  console.log('⏳ Starting isolated database seeding process from JSON sources...');

  try {
    // 1. Create a foundational Global Testing Tenant
    console.log('🏢 Seeding default developer tenant...');
    await db.insert(tenants).values({
      id: SYSTEM_TENANT_ID,
      name: 'Blaze POS Dev Workshop',
      slug: 'blaze-pos-dev-workshop', 
    }).onConflictDoNothing(); 

    // 2. Map and Create sample Customer Profiles from JSON
    console.log(`👥 Seeding ${fillerData.customers.length} mock customer profiles...`);
    const customersToInsert = fillerData.customers.map((c) => ({
      tenantId: SYSTEM_TENANT_ID,
      firstName: c.firstName,
      lastName: c.lastName,
      email: c.email,
    }));
    
    await db.insert(customers).values(customersToInsert).onConflictDoNothing();

    // 3. Map and Create structural Audit Trails from JSON
    console.log(`📜 Seeding ${fillerData.auditLogs.length} baseline system audit records...`);
    const logsToInsert = fillerData.auditLogs.map((log) => ({
      tenantId: SYSTEM_TENANT_ID,
      action: log.action,
      entityType: log.entityType,
      entityId: SYSTEM_TENANT_ID, // Pointing to system container root
    }));

    await db.insert(auditLogs).values(logsToInsert).onConflictDoNothing();

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