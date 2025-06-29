"use client";

import { Provider } from "react-redux";
import store, { persistor } from "@/slice/store";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </AppRouterCacheProvider>
  );
}
