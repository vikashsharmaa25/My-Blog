import { BarChart3 } from "lucide-react";
import React from "react";
import { Box, Paper, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";

function Sidebar({ sidebarOpen, activeTab, setActiveTab, sidebarItems }: any) {
  return (
    <Paper
      elevation={1}
      sx={{
        width: sidebarOpen ? 256 : 64,
        transition: 'width 300ms ease',
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Box px={2.5} py={2} borderBottom={1} borderColor="divider" display="flex" alignItems="center" gap={1.5}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1,
            background: "linear-gradient(90deg, #10B981, #0D9488)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <BarChart3 size={18} />
        </Box>
        {sidebarOpen && (
          <Box>
            <Typography variant="subtitle1" fontWeight={700} color="text.primary">
              BlogAdmin
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Management Portal
            </Typography>
          </Box>
        )}
      </Box>

      <Box flex={1} overflow="auto">
        <List sx={{ py: 1 }}>
          {sidebarItems.map((item: any) => {
            const active = activeTab === item.id;
            const Icon = item.icon;
            return (
              <ListItemButton
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  ...(active
                    ? { bgcolor: "success.50", color: "success.main", borderRight: 2, borderColor: "success.main" }
                    : {}),
                }}
              >
                <ListItemIcon sx={{ minWidth: 32, color: active ? "success.main" : "text.secondary" }}>
                  <Icon size={18} />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primaryTypographyProps={{ fontWeight: 500 }} primary={item.label} />}
              </ListItemButton>
            );
          })}
        </List>
      </Box>
      <Divider />
    </Paper>
  );
}

export default Sidebar;
