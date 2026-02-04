import type { ServerFunctionClient } from 'payload';

import config from '@payload-config';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import React from 'react';

import { importMap } from './(payload)/admin/importMap';

// Import Payload admin CSS
import '@payloadcms/next/css';
import './(payload)/custom.scss';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type RootLayoutProps = {
  children: React.ReactNode;
};

const serverFunctions: ServerFunctionClient = async function (args) {
  'use server';
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: RootLayoutProps) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunctions}>
    {children}
  </RootLayout>
);

export default Layout;
