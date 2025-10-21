import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

function StatsCard({ stat }: any) {
  const Icon = stat.icon;

  const bgFromTailwind = (tw?: string) => {
    switch (tw) {
      case "bg-emerald-500":
        return "#10B981";
      case "bg-emerald-600":
        return "#059669";
      case "bg-teal-600":
        return "#0D9488";
      default:
        return "primary.main" as any;
    }
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="text.secondary">
              {stat.title}
            </Typography>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              {stat.value}
            </Typography>
            <Typography variant="body2" color="success.main" fontWeight={600}>
              {stat.change}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              bgcolor: bgFromTailwind(stat.color),
              color: "#fff",
              display: "inline-flex",
            }}
          >
            <Icon size={24} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StatsCard;
