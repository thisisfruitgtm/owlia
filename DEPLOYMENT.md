# 🚀 Deployment Guide

## Branch Strategy
- `main` → Production (owlia.ro)
- `staging` → Staging (staging.owlia.ro)

## Quick Commands

### Deploy to Staging
```bash
./scripts/quick-deploy.sh staging
```

### Deploy to Production
```bash
./scripts/quick-deploy.sh prod
```

### Full Deployment (with checks)
```bash
./scripts/deploy.sh staging
./scripts/deploy.sh production
```

## Workflow

1. **Development**: Work on `staging` branch
2. **Test**: Deploy to staging environment
3. **Production**: Merge staging → main and deploy

## Environment Variables

- `.env` - Local development
- `.env.staging` - Staging environment
- `.env.production` - Production environment

## Coolify Integration

- Main branch auto-deploys to production
- Staging branch auto-deploys to staging
- Manual deployment via Coolify dashboard also available
