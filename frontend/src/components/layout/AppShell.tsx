import React from 'react';

interface AppShellProps {
  title?: string;
  children: React.ReactNode;
}

export function AppShell({ title = 'Vehicle Service Platform', children }: AppShellProps) {
  return (
    <div className='font-sans p-6 max-w-[1200px] mx-auto'>
      <header className="mb-6">
        <h1 className="mb-2">{title}</h1>
        <p className="text-[#555]">Starter operational shell for service stations, customers, and quotes.</p>
      </header>
      <section>{children}</section>
    </div>
  );
}
