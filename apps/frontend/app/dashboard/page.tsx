"use client"
import { useState } from "react";
import { Check, X } from "lucide-react";
import { Client } from "@clerk/nextjs/server";

export default function MonitoringDashboard() {
  // Mock regions (servers)
  const servers: Array<"Server 1" | "Server 2" | "Server 3"> = ["Server 1", "Server 2", "Server 3"];
  
  const [websites, setWebsites] = useState([
    {
      id: "1",
      name: "Example Website",
      url: "https://example.com",
      status: {
        "Server 1": "up",
        "Server 2": "up",
        "Server 3": "down",
      }
    }
  ]);
  
  const [newWebsite, setNewWebsite] = useState({
    name: "",
    url: ""
  });
  
  const handleAddWebsite = () => {
    if (newWebsite.name && newWebsite.url) {
      // Generate random status for each server
      const randomStatus = () => Math.random() > 0.5 ? "up" : "down";
      
      const website = {
        id: Date.now().toString(),
        name: newWebsite.name,
        url: newWebsite.url,
        status: {
          "Server 1": randomStatus(),
          "Server 2": randomStatus(),
          "Server 3": randomStatus(),
        } as Record<"Server 1" | "Server 2" | "Server 3", string>
      };
      
      setWebsites([...websites, website]);
      setNewWebsite({ name: "", url: "" });
    }
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Website Monitoring Dashboard</h1>
      
      {/* Simple form to add websites */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newWebsite.name}
            onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
            placeholder="Website Name"
            className="px-4 py-2 border rounded"
          />
          <input
            type="text"
            value={newWebsite.url}
            onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
            placeholder="Website URL"
            className="px-4 py-2 border rounded"
          />
          <button
            onClick={handleAddWebsite}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Website
          </button>
        </div>
      </div>
      
      {/* List of websites */}
      <div className="space-y-4">
        {websites.map((website) => (
          <div key={website.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">{website.name}</h2>
                <a href={website.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {website.url}
                </a>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {servers.map((server) => (
                <div key={server} className="border rounded p-3 flex justify-between items-center">
                  <span className="font-medium">{server}</span>
                  {website.status[server] === "up" ? (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                      <X className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}