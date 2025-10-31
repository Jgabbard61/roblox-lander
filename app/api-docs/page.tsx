
'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Loader2 } from 'lucide-react'

// Dynamically import Swagger UI to avoid SSR issues
const SwaggerUI = dynamic(
  () => import('swagger-ui-react').then(mod => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center py-20">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          <span className="text-gray-600">Loading API Documentation...</span>
        </div>
      </div>
    )
  }
)

export default function ApiDocsPage() {
  const [swaggerSpec, setSwaggerSpec] = useState(null)

  useEffect(() => {
    // Load OpenAPI specification
    fetch('/openapi.yaml')
      .then(response => response.text())
      .then(spec => {
        // Parse YAML to JSON for SwaggerUI
        const yamljs = require('yamljs')
        const parsedSpec = yamljs.parse(spec)
        setSwaggerSpec(parsedSpec)
      })
      .catch(error => {
        console.error('Failed to load OpenAPI spec:', error)
      })
  }, [])

  return (
    <main className="w-full min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                VerifyLens API Documentation
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete reference guide for integrating Roblox user verification into your applications.
              </p>
            </div>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Get Your API Key</h3>
                <p className="text-gray-600 mb-4">
                  Request API access through our registration form. You'll receive your API key via email within 24 hours.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Authentication</h3>
                <p className="text-gray-600 mb-4">
                  Include your API key in every request header:
                </p>
                <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
                  <code>X-API-Key: vl_live_your_api_key_here</code>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Make Your First Request</h3>
                <p className="text-gray-600 mb-4">
                  Here's a simple cURL example:
                </p>
                <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <code>{`curl -X POST "https://api.verifylens.com/v1/verify/smart" \\
  -H "X-API-Key: vl_live_your_key" \\
  -H "Content-Type: application/json" \\
  -d '{"username": "TestUser123"}'`}</code>
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Code Examples</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">JavaScript (Node.js)</h3>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                  <pre><code>{`const response = await fetch('https://api.verifylens.com/v1/verify/smart', {
  method: 'POST',
  headers: {
    'X-API-Key': 'vl_live_your_api_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: 'TestUser123',
    filters: {
      minAge: 13,
      verifiedBadge: true
    }
  })
});

const data = await response.json();
console.log(data);`}</code></pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Python</h3>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                  <pre><code>{`import requests

url = "https://api.verifylens.com/v1/verify/smart"
headers = {
    "X-API-Key": "vl_live_your_api_key",
    "Content-Type": "application/json"
}
data = {
    "username": "TestUser123",
    "filters": {
        "minAge": 13,
        "verifiedBadge": True
    }
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`}</code></pre>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">PHP</h3>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                  <pre><code>{`<?php
$url = "https://api.verifylens.com/v1/verify/smart";
$data = array(
    "username" => "TestUser123",
    "filters" => array(
        "minAge" => 13,
        "verifiedBadge" => true
    )
);

$options = array(
    'http' => array(
        'header' => "X-API-Key: vl_live_your_api_key\\r\\n" .
                   "Content-Type: application/json\\r\\n",
        'method' => 'POST',
        'content' => json_encode($data)
    )
);

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$response = json_decode($result, true);
print_r($response);
?>`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Swagger UI */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {swaggerSpec ? (
              <SwaggerUI 
                spec={swaggerSpec}
                deepLinking={true}
                displayOperationId={false}
                defaultModelsExpandDepth={1}
                defaultModelExpandDepth={1}
                displayRequestDuration={true}
                docExpansion="list"
                filter={true}
                showExtensions={true}
                showCommonExtensions={true}
                tryItOutEnabled={true}
              />
            ) : (
              <div className="flex items-center justify-center py-20">
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  <span className="text-gray-600">Loading API Documentation...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
