# Laminor - AI-Powered Image & Video Analysis Platform

Laminor is a comprehensive AI-powered platform for analyzing images and videos using advanced machine learning models including Segment Anything Model (SAM), Llama, and GPT-OSS. The platform provides object detection, segmentation, counting, and AI-generated descriptions.

## Features

- 🖼️ **Image Analysis**: Upload images and get instant object detection, segmentation, and counts
- 🎥 **Video Processing**: Frame-by-frame analysis of video content with temporal tracking
- 🤖 **AI Descriptions**: LLM-powered intelligent descriptions using Llama and GPT-OSS
- 📦 **Product Detection**: Advanced product detection with classification and inventory management
- 📊 **Dashboard**: View all your analyses in one place with detailed results
- 🐳 **Docker Ready**: Fully containerized for easy deployment to AWS Lightsail or any Docker host

## Tech Stack

### Frontend & API
- **Next.js 15** - React framework with App Router
- **tRPC** - End-to-end typesafe APIs
- **Drizzle ORM** - TypeScript ORM for PostgreSQL
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe development

### ML Services
- **Segment Anything Model (SAM)** - Meta's state-of-the-art segmentation model
- **Llama** - Open-source LLM for descriptions
- **GPT-OSS** - Open-source GPT alternative
- **FastAPI** - Python web framework for ML service
- **OpenCV** - Computer vision library
- **PyTorch** - Deep learning framework

## Quick Start

### Prerequisites

- Node.js 20+ and npm
- PostgreSQL database
- Python 3.11+ (for ML service)
- Docker and Docker Compose (for containerized deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laminor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**
   ```bash
   npm run db:push
   ```

5. **Start the ML service** (in a separate terminal)
   ```bash
   cd ml-service
   pip install -r requirements.txt
   # Download SAM model checkpoint (see below)
   python main.py
   ```

6. **Start the Next.js app**
   ```bash
   npm run dev
   ```

7. **Access the application**
   - Web app: http://localhost:3000
   - ML service: http://localhost:8001
   - Analyze page: http://localhost:3000/analyze
   - Dashboard: http://localhost:3000/dashboard

### Downloading ML Models

#### Segment Anything Model

```bash
cd ml-service
wget https://dl.fbaipublicfiles.com/segment_anything/sam_vit_h_4b8939.pth
```

#### Llama Model

Download from Hugging Face or official source and set `LLAMA_MODEL_PATH` in your environment.

#### GPT-OSS Model

Download from the appropriate source and set `GPT_OSS_MODEL_PATH` in your environment.

## Docker Deployment

### Using Docker Compose

1. **Start all services**
   ```bash
   docker-compose up -d
   ```

2. **Run database migrations**
   ```bash
   docker-compose exec web npm run db:push
   ```

3. **Access the application**
   - Web: http://localhost:3000
   - ML Service: http://localhost:8001

See [DOCKER.md](./DOCKER.md) for detailed deployment instructions including AWS Lightsail setup.

## Project Structure

```
laminor/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── analyze/            # Image/video analysis page
│   │   ├── dashboard/          # Analysis dashboard
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   ├── server/
│   │   ├── api/
│   │   │   └── routers/        # tRPC routers
│   │   └── db/
│   │       └── schema.ts       # Database schema
│   └── trpc/                   # tRPC client setup
├── ml-service/                 # Python ML service
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   └── Dockerfile              # ML service Dockerfile
├── docker-compose.yml          # Docker Compose configuration
├── Dockerfile                  # Next.js Dockerfile
└── DOCKER.md                   # Docker deployment guide
```

## API Endpoints

### tRPC Procedures

- `analysis.analyzeImage` - Analyze an uploaded image
- `analysis.analyzeVideo` - Analyze an uploaded video
- `analysis.getJob` - Get analysis job details
- `analysis.getJobs` - List all analysis jobs
- `analysis.getJobResults` - Get results for a job
- `analysis.getJobCounts` - Get object counts for a job

### ML Service Endpoints

- `POST /analyze/image` - Analyze image
- `POST /analyze/video` - Analyze video
- `GET /health` - Health check
- `GET /results/*` - Serve cropped result images

## Database Schema

- **analysisJobs** - Stores analysis job metadata
- **analysisResults** - Stores individual detection results
- **analysisCounts** - Stores object type counts per job

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# ML Service
ML_SERVICE_URL=http://localhost:8001

# Model Paths (optional)
SAM_MODEL_PATH=sam_vit_h_4b8939.pth
LLAMA_MODEL_PATH=/path/to/llama
GPT_OSS_MODEL_PATH=/path/to/gpt-oss
```

## Development

### Running Database Migrations

```bash
npm run db:push          # Push schema changes
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:studio        # Open Drizzle Studio
```

### Code Quality

```bash
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run format:check     # Check formatting
npm run format:write     # Format code
npm run typecheck        # TypeScript type checking
```

## Deployment

### AWS Lightsail

See [DOCKER.md](./DOCKER.md) for detailed AWS Lightsail deployment instructions.

### Other Platforms

The application can be deployed to any platform that supports Docker:
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Railway
- Render

## Performance Considerations

- **ML Service**: Requires GPU for optimal performance (CPU fallback available)
- **Database**: Use connection pooling for production
- **Storage**: Consider S3 or similar for large file storage
- **Caching**: Add Redis for result caching in production

## Security

- Change default database passwords
- Use environment variables for secrets
- Configure CORS appropriately for production
- Enable HTTPS with SSL certificates
- Use private networking for database access

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

[Add your license here]

## Support

For issues or questions:
- Check the [DOCKER.md](./DOCKER.md) guide
- Review application logs: `docker-compose logs`
- Check service health: `docker-compose ps`

## Acknowledgments

- [Segment Anything Model](https://segment-anything.com/) by Meta
- [T3 Stack](https://create.t3.gg/) for the excellent starter template
- [Drizzle ORM](https://orm.drizzle.team/) for the type-safe database toolkit
