import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { tenants } from './schema/tenants';
import { customers } from './schema/customers';
import { auditLogs } from './schema/audit';

const fillerDataPath = path.join(__dirname, 'filler-data.json');
let fillerData: any = {};
if (fs.existsSync(fillerDataPath)) {
  fillerData = JSON.parse(fs.readFileSync(fillerDataPath, 'utf-8'));
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);
const SYSTEM_TENANT_ID = '00000000-0000-0000-0000-000000000001';

async function main() {
  console.log('⏳ Starting isolated database seeding process...');

  try {
    await db.insert(tenants).values({
      id: SYSTEM_TENANT_ID,
      name: 'Blaze POS Dev Workshop',
      slug: 'blaze-pos-dev-workshop',
    }).onConflictDoNothing();

    const customerData = fillerData.customers?.length
      ? fillerData.customers.map((c: any) => ({
          tenantId: SYSTEM_TENANT_ID,
          firstName: c.firstName,
          lastName: c.lastName,
          email: c.email,
        }))
      : [
          { tenantId: SYSTEM_TENANT_ID, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
          { tenantId: SYSTEM_TENANT_ID, firstName: 'Sarah', lastName: 'Lee', email: 'sarah.lee@example.com' },
        ];

    await db.insert(customers).values(customerData).onConflictDoNothing();

    const logsToInsert = fillerData.auditLogs?.length
      ? fillerData.auditLogs.map((log: any) => ({
          tenantId: SYSTEM_TENANT_ID,
          action: log.action,
          entityType: log.entityType,
          entityId: SYSTEM_TENANT_ID,
        }))
      : [
          { tenantId: SYSTEM_TENANT_ID, action: 'SYSTEM_INITIALIZATION', entityType: 'SYSTEM', entityId: SYSTEM_TENANT_ID },
        ];

    await db.insert(auditLogs).values(logsToInsert).onConflictDoNothing();

    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Critical failure during seeding:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
