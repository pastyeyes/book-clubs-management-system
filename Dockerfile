# Use the official PostgreSQL base image
#FROM postgres:latest
FROM postgres:alpine


# Set environment variables (optional)
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=mydb

# Copy table schema to deploy with the database instance.
COPY ./sql/schema.sql /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432

## docker build -t my-postgres .
## docker run -d --name my-postgres-container -p 5432:5432 my-postgres
