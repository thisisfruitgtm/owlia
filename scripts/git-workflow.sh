#!/bin/bash

# Git Workflow Script pentru Owlia
# Workflow simplu: staging → main → production

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

# Function to show current status
show_status() {
    echo ""
    echo "📊 Current Git Status:"
    echo "  Branch: $(git branch --show-current)"
    echo "  Status: $(git status --porcelain | wc -l | xargs) files changed"
    echo ""
}

# Function to commit changes
commit_changes() {
    local message="$1"
    print_status "Committing changes: $message"
    
    git add .
    git commit -m "$message"
    print_success "Changes committed"
}

# Function to push to remote
push_branch() {
    local branch="$1"
    print_status "Pushing to $branch..."
    
    git push origin "$branch"
    print_success "Pushed to $branch"
}

# Function to merge staging to main
merge_to_main() {
    print_status "Merging staging → main..."
    
    # Switch to main
    git checkout main
    git pull origin main
    
    # Merge staging
    git merge staging --no-ff -m "Merge staging to main - $(date +'%Y-%m-%d %H:%M')"
    
    # Push main
    git push origin main
    
    print_success "Merged to main and pushed!"
}

# Main menu
case "${1:-menu}" in
    "status")
        show_status
        ;;
    
    "commit")
        message="${2:-Update from staging}"
        commit_changes "$message"
        ;;
    
    "push")
        branch="${2:-$(git branch --show-current)}"
        push_branch "$branch"
        ;;
    
    "deploy-staging")
        print_status "Deploying to staging..."
        commit_changes "Deploy to staging - $(date +'%H:%M')"
        push_branch "staging"
        print_success "Staging deployment triggered!"
        ;;
    
    "deploy-prod")
        print_status "Deploying to production..."
        merge_to_main
        print_success "Production deployment triggered!"
        ;;
    
    "workflow")
        echo "🌿 Git Workflow pentru Owlia:"
        echo ""
        echo "1. Development (pe staging):"
        echo "   git checkout staging"
        echo "   # faci modificările..."
        echo "   ./scripts/git-workflow.sh commit 'Descrierea modificărilor'"
        echo "   ./scripts/git-workflow.sh deploy-staging"
        echo ""
        echo "2. Production (când ești gata):"
        echo "   ./scripts/git-workflow.sh deploy-prod"
        echo ""
        echo "3. Verifică statusul:"
        echo "   ./scripts/git-workflow.sh status"
        echo ""
        ;;
    
    "menu"|*)
        echo "🚀 Git Workflow pentru Owlia"
        echo ""
        echo "Comenzi disponibile:"
        echo "  status          - Arată statusul curent"
        echo "  commit [msg]    - Commit modificările"
        echo "  push [branch]   - Push la branch"
        echo "  deploy-staging - Deploy la staging"
        echo "  deploy-prod    - Deploy la production"
        echo "  workflow       - Arată workflow-ul complet"
        echo ""
        echo "Exemple:"
        echo "  ./scripts/git-workflow.sh commit 'Am adăugat funcționalitate nouă'"
        echo "  ./scripts/git-workflow.sh deploy-staging"
        echo "  ./scripts/git-workflow.sh deploy-prod"
        echo ""
        ;;
esac
