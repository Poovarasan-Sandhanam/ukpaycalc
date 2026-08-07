# Security Key Safety & Credentials Policy

This document outlines the security rules and best practices for managing API keys, certificates, secrets, and environment configurations for the **UK Pay Calculator** project.

---

## 🔒 Fundamental Rule

**NEVER commit actual secret keys, API tokens, keystores, private keys, or environment files (`.env`) into Git.**

All sensitive credentials must be managed via local environment variables, secure key vaults, or CI/CD secrets (e.g., GitHub Actions Secrets).

---

## 📋 Security Standards Checklist

### 1. Environment Variables (`.env`)
- Local development secrets must be placed in a `.env` file (which is ignored by Git).
- Use `.env.example` as a public template to document required keys without exposing secret values.
- In React Native JS bundle, any string embedded in the Javascript layer can be reverse-engineered. **Do not embed super-secret keys (e.g. backend admin tokens, DB passwords, private API keys) in the client bundle.**

### 2. Android Keystores & Release Keys
- **Debug Keystore:** `android/app/debug.keystore` is for local debug builds only.
- **Release Keystore:** Keep your `release.keystore` / `*.jks` in a secure location outside the repository or pass it securely during build.
- Pass keystore passwords via environment variables in `gradle.properties` (placed in your user home directory `~/.gradle/gradle.properties` or set via CI/CD secrets):
  ```properties
  MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
  MYAPP_RELEASE_KEY_ALIAS=my-key-alias
  MYAPP_RELEASE_STORE_PASSWORD=*****
  MYAPP_RELEASE_KEY_PASSWORD=*****
  ```

### 3. iOS Certificates & Provisioning Profiles
- Signing certificates (`.p12`), private keys (`.p8`, `.pem`), and provisioning profiles (`.mobileprovision`) are excluded in `.gitignore`.
- Use tools like Fastlane Match or Apple Developer Portal CLI for automated, encrypted certificate management.
- Keep machine-specific settings like `ios/.xcode.env.local` untracked.

### 4. Third-Party Service Credentials (Firebase / Mobile Services)
- `android/app/google-services.json` and `ios/GoogleService-Info.plist` contain project identifiers.
- Place actual configuration files in their respective native locations (`android/app/` and `ios/` or `ios/UKPayCalc/`).
- Refer to `android/app/google-services.json.example` and `ios/GoogleService-Info.plist.example` for the required format.

---

## 🛡️ Secret Scanning & Prevention

Before pushing changes to GitHub, ensure no accidental secrets are exposed:

### Recommended Pre-Commit Tools
1. **[Gitleaks](https://github.com/gitleaks/gitleaks)**: Scan repository for secrets.
   ```bash
   gitleaks detect --verbose
   ```
2. **[git-secrets](https://github.com/awslabs/git-secrets)**: Prevent committing secret patterns.

### What to do if a secret is accidentally committed:
1. **Immediately revoke / rotate** the leaked API key or secret in the service provider console.
2. Remove the secret from Git history using tools like `git-filter-repo` or BFG Repo-Cleaner.
3. Do not assume deleting the line in a new commit makes it safe—Git history retains prior commits!
