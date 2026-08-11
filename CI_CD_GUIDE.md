# UKPayCalc CI/CD Operational Guide

This document explains the CI/CD pipeline set up for **UKPayCalc** using **GitHub Actions** and **Fastlane**.

---

## 1. Automated Workflows Overview

| Workflow | File Path | Trigger | Actions / Outputs |
| :--- | :--- | :--- | :--- |
| **CI Quality Checks** | `.github/workflows/ci.yml` | Every Pull Request & push to `main` | Runs ESLint, TypeScript check (`tsc`), Jest test suite, Android Debug build, iOS Simulator build. |
| **Android Release** | `.github/workflows/release-android.yml` | Git tags `v*` or Manual Dispatch | Builds Release AAB/APK, uploads GitHub workflow artifacts, optionally deploys to Google Play Internal Track via Fastlane. |
| **iOS Release** | `.github/workflows/release-ios.yml` | Git tags `v*` or Manual Dispatch | Builds Release IPA on macOS runner, uploads GitHub workflow artifact, optionally deploys to TestFlight via Fastlane. |

---

## 2. GitHub Secrets Setup

To enable automated production/release builds, add the following secrets under:
**Repository Settings ➔ Secrets and variables ➔ Actions ➔ New repository secret**.

### Android Secrets

| Secret Name | Description | Example / Instructions |
| :--- | :--- | :--- |
| `ANDROID_KEYSTORE_BASE64` | Base64 encoded `.keystore` or `.jks` file | Generate with `base64 -i my-release-key.keystore \| pbcopy` |
| `ANDROID_KEY_ALIAS` | Key alias name defined when creating key | e.g. `my-key-alias` |
| `ANDROID_STORE_PASSWORD` | Keystore password | e.g. `SecretPassword123` |
| `ANDROID_KEY_PASSWORD` | Key password | e.g. `SecretPassword123` |
| `PLAY_STORE_JSON_BASE64` | Base64 encoded Google Play Service Account JSON key | Download Service Account JSON from Google Play Console ➔ `base64 -i service-account.json \| pbcopy` |

### iOS Secrets

| Secret Name | Description | Example / Instructions |
| :--- | :--- | :--- |
| `APPLE_ID` | Apple Developer Account Email | e.g. `developer@example.com` |
| `APPLE_TEAM_ID` | 10-character Apple Developer Team ID | e.g. `AB123C456D` |
| `BUILD_CERTIFICATE_BASE64` | Base64 encoded iOS Distribution Certificate (`.p12`) | Export `.p12` from Keychain Access ➔ `base64 -i cert.p12 \| pbcopy` |
| `P12_PASSWORD` | Password used to encrypt exported `.p12` | Password entered during export |
| `BUILD_PROVISION_PROFILE_BASE64` | Base64 encoded App Store Provisioning Profile (`.mobileprovision`) | `base64 -i profile.mobileprovision \| pbcopy` |
| `KEYCHAIN_PASSWORD` | Temporary keychain password for runner | Any random string, e.g. `ci-keychain-pass` |
| `APP_STORE_CONNECT_API_KEY` | App Store Connect API Key JSON or p8 secret for Fastlane | For automated TestFlight uploads |

---

## 3. Local Commands & Fastlane CLI

You can also run Fastlane commands locally on your machine:

```bash
# Check Fastlane installation
bundle exec fastlane --version

# Android Lanes
bundle exec fastlane android build_apk      # Builds debug/release APK locally
bundle exec fastlane android build_aab      # Builds release AAB locally
bundle exec fastlane android deploy_internal # Deploys AAB to Play Store internal track

# iOS Lanes
bundle exec fastlane ios build_ipa          # Builds IPA archive locally
bundle exec fastlane ios beta               # Builds & uploads to TestFlight
```

---

## 4. Triggering a Release

1. **Tag-based Triggering**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
2. **Manual Triggering**:
   - Go to **Actions** tab on GitHub repository.
   - Select **Android Release Build & Deploy** or **iOS Release Build & Deploy**.
   - Click **Run workflow** and toggle optional flags (e.g. `Deploy to Play Store` or `Upload to TestFlight`).
