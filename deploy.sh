#!/bin/bash

echo "Removing node_modules and package-lock.json..."

# Remove node_modules directory
rm -rf node_modules

# Remove package-lock.json
rm -f package-lock.json

echo "Cleanup complete."

# Install dependencies
echo "Installing dependencies..."
npm install
echo "Dependencies installed."

# Start the server
npm start

# Print a message
echo "App running locally!"