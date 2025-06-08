import React from "react";
import { Card } from "../../components/ui/card";
import { Avatar } from "../../components/ui/avatar";

export default function AboutUsPage() {
  return (
    <main className="container mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-extrabold text-center">About Us</h1>
      <section className="text-center max-w-3xl mx-auto">
        <p className="text-lg leading-relaxed">
          Welcome to our company! We are dedicated to delivering the best marketing solutions powered by cutting-edge technology and innovative strategies.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card className="p-4 flex flex-col items-center">
<Avatar src="/placeholder-user.jpg" alt="Jane Doe" />
            <h3 className="mt-2 font-semibold">Jane Doe</h3>
            <p className="text-sm text-muted-foreground">CEO</p>
          </Card>
          <Card className="p-4 flex flex-col items-center">
<Avatar src="/placeholder-user.jpg" alt="John Smith" />
            <h3 className="mt-2 font-semibold">John Smith</h3>
            <p className="text-sm text-muted-foreground">CTO</p>
          </Card>
          <Card className="p-4 flex flex-col items-center">
<Avatar src="/placeholder-user.jpg" alt="Alice Johnson" />
            <h3 className="mt-2 font-semibold">Alice Johnson</h3>
            <p className="text-sm text-muted-foreground">Marketing Lead</p>
          </Card>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-center text-lg leading-relaxed">
          To empower businesses with innovative marketing tools that drive growth and engagement across multiple platforms.
        </p>
      </section>
    </main>
  );
}
