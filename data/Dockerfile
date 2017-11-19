# Use Node v4 as the base image.
FROM node:8

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /app

# Install dependencies
RUN cd /app; \  
    npm install

# Expose our server port.
EXPOSE 4211

# Run our app.
CMD ["node", "/app/index.js"] 
