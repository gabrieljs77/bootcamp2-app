FROM nginx:alpine
COPY index.html script.js utils.js style.css /usr/share/nginx/html/
EXPOSE 80
