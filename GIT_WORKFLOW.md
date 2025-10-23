# 🌿 Git Workflow pentru Owlia

## Branch Strategy
- **`main`** → Production (owlia.ro)
- **`staging`** → Development & Testing

## Workflow Simplu

### 1. Development (pe staging)
```bash
# Lucrezi pe staging
git checkout staging

# Faci modificările...
# (editezi codul)

# Commit modificările
./scripts/git-workflow.sh commit "Am adăugat funcționalitate nouă"

# Deploy la staging
./scripts/git-workflow.sh deploy-staging
```

### 2. Production (când ești gata)
```bash
# Deploy la production (merge staging → main)
./scripts/git-workflow.sh deploy-prod
```

### 3. Verifică statusul
```bash
./scripts/git-workflow.sh status
```

## Comenzi Rapide

| Comandă | Descriere |
|---------|-----------|
| `./scripts/git-workflow.sh status` | Arată statusul curent |
| `./scripts/git-workflow.sh commit "mesaj"` | Commit modificările |
| `./scripts/git-workflow.sh deploy-staging` | Deploy la staging |
| `./scripts/git-workflow.sh deploy-prod` | Deploy la production |

## Exemplu Complet

```bash
# 1. Lucrezi pe staging
git checkout staging

# 2. Faci modificările...
# (editezi fișierele)

# 3. Commit
./scripts/git-workflow.sh commit "Am adăugat pagina de contact"

# 4. Deploy la staging (pentru testare)
./scripts/git-workflow.sh deploy-staging

# 5. Când ești mulțumit, deploy la production
./scripts/git-workflow.sh deploy-prod
```

## Coolify Integration

- **Staging branch** → Deploy automat la staging environment
- **Main branch** → Deploy automat la production (owlia.ro)

## Beneficii

✅ **Sigur** - Nu poți să strici production-ul  
✅ **Simplu** - Doar 2 comenzi pentru deployment  
✅ **Controlat** - Vezi exact ce se merge în production  
✅ **Reversibil** - Poți să faci rollback dacă ceva nu merge  

## Troubleshooting

### Dacă ai probleme cu merge-ul:
```bash
# Resetează la ultimul commit bun
git reset --hard HEAD~1

# Sau merge manual
git checkout main
git merge staging
git push origin main
```

### Dacă vrei să anulezi un commit:
```bash
git reset --soft HEAD~1  # Anulează commit-ul, păstrează modificările
git reset --hard HEAD~1  # Anulează commit-ul și modificările
```
