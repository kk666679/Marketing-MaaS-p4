import React from "react";
import { Card } from "../../components/ui/card";
import { Chart } from "../../components/ui/chart";

export default function AnalyticsDashboardPage() {
  return (
    <main className="container mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-extrabold text-center">Analytics Dashboard</h1>
      <section className="max-w-4xl mx-auto">
        <p className="text-lg leading-relaxed mb-6">
          Get insights into your marketing performance with our comprehensive analytics dashboard.
        </p>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Performance Overview</h2>
          <Chart />
        </Card>
      </section>
    </main>
  );
}
