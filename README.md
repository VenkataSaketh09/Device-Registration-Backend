<h1>Device Registration Backend</h1>

<p>
  This repository hosts the backend API for the Device Registration and Availability Check project. 
  It serves as the logic layer for storing device information and simulating reachability checks.
</p>

<h2>Key Features</h2>

<ul>
  <li>
    <strong>API Endpoints:</strong>
    <ul>
      <li><code>POST /add_device</code>: Registers a new device, storing details like name, IP address, and password.</li>
      <li><code>GET /check_availability</code>: Validates the device password and simulates reachability.</li>
    </ul>
  </li>
  <li>
    <strong>Data Persistence:</strong> Stores device information in a MongoDB database with optional password encryption for added security.
  </li>
  <li>
    <strong>Simulated Reachability Logic:</strong> Implements a random-number-based algorithm to determine device reachability 
    (even = reachable, odd = not reachable).
  </li>
</ul>

<p>
  This backend is built with Node.js and Express, supporting a clean, RESTful architecture to complement the frontend repository.
</p>
