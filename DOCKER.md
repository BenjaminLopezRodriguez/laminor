# Docker Deployment Guide

This guide explains how to deploy Laminor to AWS Lightsail or any Docker-compatible environment.

## Prerequisites

- Docker and Docker Compose installed
- AWS Lightsail instance (or any Docker host)
- Domain name (optional, for production)

## Architecture

The application consists of three main services:

1. **PostgreSQL Database** - Stores analysis jobs and results
2. **ML Service** - Python FastAPI service handling Segment Anything, Llama, and GPT-OSS
3. **Next.js Web Application** - Frontend and API server

## Local Development

### Using Docker Compose

1. Clone the repository and navigate to the project directory
2. Create a `.env` file with your configuration:

```env
DATABASE_URL=postgresql://laminor:laminor_password@postgres:5432/laminor_db
ML_SERVICE_URL=http://ml-service:8001
SAM_MODEL_PATH=sam_vit_h_4b8939.pth
LLAMA_MODEL_PATH=/path/to/llama/model
GPT_OSS_MODEL_PATH=/path/to/gpt-oss/model
```

3. Start all services:

```bash
docker-compose up -d
```

4. Run database migrations:

```bash
docker-compose exec web npm run db:push
```

5. Access the application at http://localhost:3000

### Building Individual Services

#### Build Next.js App

```bash
docker build -t laminor-web .
```

#### Build ML Service

```bash
cd ml-service
docker build -t laminor-ml-service .
```

## AWS Lightsail Deployment

### Option 1: Single Container (Recommended for Testing)

1. **Create Lightsail Instance**
   - Choose a container instance (e.g., 2GB RAM, 1 vCPU)
   - Select a container image or use Docker

2. **Prepare Docker Image**
   - Build the image locally or use CI/CD
   - Push to Docker Hub or AWS ECR

3. **Deploy via Lightsail Console**
   - Create a new container service
   - Use the docker-compose.yml or create a service definition
   - Configure environment variables
   - Set up public endpoint

### Option 2: Multi-Container Setup

1. **SSH into Lightsail Instance**

```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

2. **Install Docker and Docker Compose**

```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose -y
sudo usermod -aG docker ubuntu
```

3. **Clone Repository**

```bash
git clone <your-repo-url>
cd laminor
```

4. **Configure Environment**

Create `.env` file:

```env
DATABASE_URL=postgresql://laminor:your_secure_password@postgres:5432/laminor_db
ML_SERVICE_URL=http://ml-service:8001
NODE_ENV=production
```

5. **Start Services**

```bash
docker-compose up -d
```

6. **Run Migrations**

```bash
docker-compose exec web npm run db:push
```

7. **Configure Firewall**

Open ports 3000 (web), 8001 (ML service), and 5432 (database) if needed.

### Option 3: Using Lightsail Container Service

1. **Create Container Service**
   - Go to Lightsail → Containers
   - Create new container service
   - Choose capacity (1-20 nodes)

2. **Create Container Service Definition**

```json
{
  "containers": {
    "web": {
      "image": "your-dockerhub-username/laminor-web:latest",
      "environment": {
        "DATABASE_URL": "postgresql://...",
        "ML_SERVICE_URL": "http://ml-service:8001"
      },
      "ports": {
        "3000": "HTTP"
      }
    },
    "ml-service": {
      "image": "your-dockerhub-username/laminor-ml-service:latest",
      "ports": {
        "8001": "HTTP"
      }
    },
    "postgres": {
      "image": "postgres:16-alpine",
      "environment": {
        "POSTGRES_USER": "laminor",
        "POSTGRES_PASSWORD": "secure_password",
        "POSTGRES_DB": "laminor_db"
      }
    }
  },
  "publicEndpoint": {
    "containerName": "web",
    "containerPort": 3000,
    "healthCheck": {
      "path": "/",
      "intervalSeconds": 30,
      "timeoutSeconds": 5,
      "healthyThreshold": 2,
      "unhealthyThreshold": 2
    }
  }
}
```

3. **Deploy**

```bash
aws lightsail create-container-service-deployment \
  --service-name laminor \
  --cli-input-yaml file://container-service-definition.yaml
```

## Model Files Setup

### Segment Anything Model

1. Download SAM model checkpoint:
```bash
wget https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth
```

2. Place in `ml-service/` directory or mount as volume

### Llama Model

1. Download Llama model from Hugging Face or official source
2. Set `LLAMA_MODEL_PATH` environment variable
3. Mount model directory as volume in docker-compose

### GPT-OSS Model

1. Download GPT-OSS model
2. Set `GPT_OSS_MODEL_PATH` environment variable
3. Mount model directory as volume

## Production Considerations

### Security

1. **Change Default Passwords**
   - Update PostgreSQL password
   - Use secrets management (AWS Secrets Manager)

2. **Environment Variables**
   - Never commit `.env` files
   - Use Lightsail environment variables or secrets

3. **Network Security**
   - Use private networking for database
   - Configure security groups/firewall rules
   - Enable HTTPS with SSL certificate

### Performance

1. **Resource Allocation**
   - ML service needs GPU for best performance
   - Consider GPU instances for production
   - Allocate sufficient RAM (8GB+ recommended)

2. **Database**
   - Use managed PostgreSQL (AWS RDS) for production
   - Configure connection pooling
   - Set up backups

3. **Caching**
   - Consider Redis for caching results
   - Use CDN for static assets

### Monitoring

1. **Health Checks**
   - All services have health check endpoints
   - Set up CloudWatch or similar monitoring

2. **Logging**
   - Configure centralized logging
   - Use CloudWatch Logs or similar

3. **Metrics**
   - Monitor CPU, memory, disk usage
   - Track API response times
   - Monitor ML service queue

## Troubleshooting

### ML Service Not Starting

- Check if model files are accessible
- Verify GPU availability (if using GPU)
- Check logs: `docker-compose logs ml-service`

### Database Connection Issues

- Verify DATABASE_URL format
- Check PostgreSQL is running: `docker-compose ps`
- Test connection: `docker-compose exec postgres psql -U laminor -d laminor_db`

### Web App Build Failures

- Ensure all environment variables are set
- Check Node.js version compatibility
- Review build logs: `docker-compose logs web`

## Scaling

For production scaling:

1. **Horizontal Scaling**
   - Run multiple web containers behind load balancer
   - Use managed database service
   - Consider ML service queue (Redis + Celery)

2. **Vertical Scaling**
   - Increase instance size for ML service
   - Use GPU instances for faster inference

3. **Caching Layer**
   - Add Redis for result caching
   - Cache frequently accessed images

## Backup and Recovery

1. **Database Backups**
   ```bash
   docker-compose exec postgres pg_dump -U laminor laminor_db > backup.sql
   ```

2. **Restore Database**
   ```bash
   docker-compose exec -T postgres psql -U laminor laminor_db < backup.sql
   ```

3. **Volume Backups**
   - Backup PostgreSQL volume
   - Backup ML service results volume

## Support

For issues or questions, check:
- Application logs: `docker-compose logs`
- Service health: `docker-compose ps`
- Individual service logs: `docker-compose logs <service-name>`

