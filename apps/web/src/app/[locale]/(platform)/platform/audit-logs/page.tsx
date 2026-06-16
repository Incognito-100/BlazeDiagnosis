import { AppShell } from '@/components/common/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db/client';
import { auditLogs } from '@/db/schema/audit';
import { desc } from 'drizzle-orm';
// 1. Import your new logger utility function
import { createAuditLog } from '@/lib/audit';

export const revalidate = 0;

export default async function Page() {

  // 2. Fetch logs immediately after, which will now include the log we just generated
  const logs = await db
    .select()
    .from(auditLogs)
    .orderBy(desc(auditLogs.createdAt));

  return (
    <AppShell surface="platform" title="Audit logs">
      <Card>
        <CardHeader>
          <CardTitle>Audit logs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600 mb-6">
            Real-time tracking of multi-user mutations, tenant data changes, and active system operations.
          </p>

          <div className="overflow-x-auto rounded-lg border border-neutral-200 shadow-sm">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-700 font-medium uppercase tracking-wider text-xs">
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Target Entity</th>
                  <th className="p-4">Actor (User ID)</th>
                  <th className="p-4">Context Changes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-800">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-neutral-500 italic">
                      No system records captured yet.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-neutral-50/70 transition-colors">
                      {/* Timestamp tracking */}
                      <td className="p-4 text-xs whitespace-nowrap text-neutral-500">
                        {new Date(log.createdAt).toLocaleString()}
                      </td>

                      {/* Explicit system action */}
                      <td className="p-4">
                        <span className="inline-block font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                          {log.action}
                        </span>
                      </td>

                      {/* Targeted operational component */}
                      <td className="p-4">
                        <div className="text-xs font-semibold text-neutral-900">{log.entityType}</div>
                        <div className="text-[10px] font-mono text-neutral-400 mt-0.5">{log.entityId || 'N/A'}</div>
                      </td>

                      {/* Actor Context */}
                      <td className="p-4 font-mono text-xs text-neutral-600">
                        {log.actorUserId ? (
                          <span className="text-blue-600">{log.actorUserId}</span>
                        ) : (
                          <span className="text-neutral-400 italic">System Engine</span>
                        )}
                      </td>

                      {/* JSON data structure preview */}
                      <td className="p-4 max-w-xs">
                        {log.newValue ? (
                          <pre className="text-[10px] font-mono bg-neutral-50 p-2 rounded border border-neutral-200 overflow-x-auto max-h-24">
                            {JSON.stringify(log.newValue, null, 2)}
                          </pre>
                        ) : (
                          <span className="text-xs text-neutral-400 italic">No delta mutation snapshot</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}