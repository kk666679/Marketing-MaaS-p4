import React from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function MultiPlatformSyncPage() {
  return (
    <main className="container mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-extrabold text-center">Multi-Platform Sync</h1>
      <section className="max-w-4xl mx-auto">
        <p className="text-lg leading-relaxed mb-6">
          Seamlessly synchronize your marketing efforts across multiple platforms with our powerful sync tools.
        </p>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Sync Settings</h2>
          <Button variant="primary">Configure Sync</Button>
        </Card>
      </section>
    </main>
  );
}
