# AWS API Deployment Starter

A production-ready Node.js REST API with automated AWS EC2 deployment using GitHub Actions CI/CD pipeline.

## 🚀 Live Demo

**Production URL:** [http://54.164.73.226/](http://54.164.73.226/)

## Overview

This project demonstrates how to build and deploy a REST API to AWS EC2 with automated CI/CD using GitHub Actions. It includes a complete Node.js application with MongoDB integration, error handling, and production-ready deployment configuration.

## Features

- ✅ **RESTful API** with Express.js
- ✅ **MongoDB integration** with Mongoose ODM
- ✅ **Automated CI/CD** with GitHub Actions
- ✅ **AWS EC2 deployment** with zero-downtime strategies
- ✅ **Error handling** middleware
- ✅ **CORS enabled** for cross-origin requests
- ✅ **Environment-based configuration**
- ✅ **Sample data seeding** for development
- ✅ **Production-ready** with PM2 process management

## Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing

### DevOps & Deployment

- **GitHub Actions** - CI/CD pipeline
- **AWS EC2** - Cloud hosting
- **PM2** - Process manager
- **SSH** - Secure deployment

## Project Structure

```
aws-api-deployment-starter/
├── controllers/
│   └── userController.js    # User business logic
├── db/
│   └── db.js               # Database connection
├── middlewares/
│   └── errorhandler.js     # Global error handling
├── models/
│   └── user.js             # User data model
├── routes/
│   └── userRoutes.js       # API route definitions
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline
├── server.js               # Application entry point
├── package.json            # Dependencies and scripts
├── DEPLOYMENT_NOTES.md     # Deployment documentation
└── README.md              # This file
```

## Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **Git**

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/adeeshperera/aws-api-deployment-starter.git
   cd aws-api-deployment-starter
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file
   cp .env.example .env

   # Edit .env with your configuration
   NODE_ENV=development
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/aws-api-starter
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Test the API**
   ```bash
   curl http://localhost:8000/api/users
   ```

### Production Build

```bash
npm start
```

## API Endpoints

### Base URL

- **Local:** `http://localhost:8000`
- **Production:** `http://54.164.73.226`

### Users API

| Method | Endpoint     | Description       | Request Body                              |
| ------ | ------------ | ----------------- | ----------------------------------------- |
| `GET`  | `/api/users` | Get all users     | -                                         |
| `POST` | `/api/users` | Create a new user | `{ "name": "string", "email": "string" }` |

### Products API (Demo)

| Method | Endpoint        | Description                    |
| ------ | --------------- | ------------------------------ |
| `GET`  | `/api/products` | Demo endpoint for new features |

### Example Requests

**Create a user:**

```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

**Get all users:**

```bash
curl http://localhost:8000/api/users
```

## Environment Configuration

### Required Environment Variables

```env
# Server Configuration
NODE_ENV=production
PORT=8000

# Database
MONGODB_URI=mongodb://localhost:27017/aws-api-starter

# Optional: Custom configuration
DB_NAME=aws-api-starter
```

## Deployment

### Manual Deployment

1. **Prepare EC2 instance**

   ```bash
   # Install Node.js, PM2, and MongoDB
   sudo apt update
   sudo apt install nodejs npm mongodb
   sudo npm install -g pm2
   ```

2. **Deploy application**

   ```bash
   # Clone and setup
   git clone <repository-url>
   cd aws-api-deployment-starter
   npm ci --production

   # Start with PM2
   pm2 start server.js --name "aws-api"
   pm2 save
   pm2 startup
   ```

### Automated Deployment (Recommended)

This project includes automated deployment via GitHub Actions. See [CI/CD Pipeline](#cicd-pipeline) section.

## CI/CD Pipeline

### GitHub Actions Workflow

The project uses GitHub Actions for continuous deployment to AWS EC2.

#### Required Secrets

Configure these in **Settings → Secrets and variables → Actions**:

| Secret        | Description                  | Example                              |
| ------------- | ---------------------------- | ------------------------------------ |
| `EC2_HOST`    | EC2 public IP                | `54.164.73.226`                      |
| `EC2_USER`    | EC2 username                 | `ubuntu` or `ec2-user`               |
| `EC2_SSH_KEY` | Private SSH key (PEM format) | `-----BEGIN RSA PRIVATE KEY-----...` |
| `MONGODB_URI` | Database connection string   | `mongodb://localhost:27017/...`      |

#### Workflow Steps

1. **Code checkout** and dependency installation
2. **Run tests** (when available)
3. **Build production** bundle
4. **Deploy to EC2** via SSH
5. **Restart services** with PM2
6. **Health check** verification

#### Triggering Deployment

```bash
# Deploy to production
git push origin main
```

### Security Best Practices

- ✅ SSH keys stored securely in GitHub Secrets
- ✅ EC2 Security Groups restrict access
- ✅ Non-root user deployment
- ✅ Environment variables for sensitive data
- ✅ No secrets in repository code

## Production Considerations

### Performance

- **PM2 cluster mode** for multi-core utilization
- **MongoDB indexing** for query optimization
- **Compression middleware** for response optimization
- **Rate limiting** for API protection

### Monitoring

- **PM2 monitoring** with `pm2 monit`
- **Application logs** via PM2 logs
- **Health check endpoints** for uptime monitoring
- **Error tracking** with structured logging

### Scaling

- **Horizontal scaling** with load balancers
- **Database replication** for high availability
- **CDN integration** for static assets
- **Auto-scaling groups** for dynamic capacity

### Security

- **HTTPS** with SSL certificates (Let's Encrypt)
- **Firewall rules** and security groups
- **Input validation** and sanitization
- **Authentication/Authorization** middleware
- **Regular security updates**

## Development Workflow

### Local Development

```bash
# Start development server with hot reload
npm run dev

# Run in production mode locally
npm start

# Test API endpoints
curl http://localhost:8000/api/users
```

### Adding New Features

1. Create feature branch: `git checkout -b feature/new-endpoint`
2. Implement changes in appropriate directories
3. Test locally with `npm run dev`
4. Commit and push: `git push origin feature/new-endpoint`
5. Create Pull Request
6. Merge to `main` triggers automatic deployment

### Database Operations

```javascript
// In development, sample users are automatically seeded
// Access sample data:
const User = require("./models/user");
console.log(User.sampleUsers);

// Manual seeding:
await User.insertSampleUsers();
```

## Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Kill process on port 8000
sudo lsof -ti:8000 | xargs kill -9
```

**MongoDB connection issues:**

```bash
# Check MongoDB status
sudo systemctl status mongodb

# Restart MongoDB
sudo systemctl restart mongodb
```

**PM2 process issues:**

```bash
# Check PM2 status
pm2 status

# Restart application
pm2 restart aws-api

# View logs
pm2 logs aws-api
```

**SSH deployment failures:**

- Verify SSH key format and permissions
- Check EC2 security group allows SSH (port 22)
- Ensure EC2 user has proper permissions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and structure
- Add appropriate error handling
- Update documentation for new features
- Test changes locally before submitting PR
- Keep commits atomic and well-described

## Additional Resources

- **AWS EC2 Documentation:** [https://docs.aws.amazon.com/ec2/](https://docs.aws.amazon.com/ec2/)
- **GitHub Actions Documentation:** [https://docs.github.com/en/actions](https://docs.github.com/en/actions)
- **Express.js Guide:** [https://expressjs.com/](https://expressjs.com/)
- **MongoDB Documentation:** [https://docs.mongodb.com/](https://docs.mongodb.com/)
- **PM2 Documentation:** [https://pm2.keymetrics.io/](https://pm2.keymetrics.io/)
