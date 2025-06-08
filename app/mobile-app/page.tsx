import React from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function MobileAppPage() {
  return (
    <main className="container mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-extrabold text-center">Mobile App</h1>
      <section className="max-w-4xl mx-auto">
        <p className="text-lg leading-relaxed mb-6">
          Discover our mobile app that lets you manage your marketing campaigns on the go, anytime and anywhere.
        </p>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Download Now</h2>
          <Button variant="primary">Get the App</Button>
        </Card>
      </section>
    </main>
  );
}
