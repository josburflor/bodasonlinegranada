# Security Specification - BodasOnline

## 1. Data Invariants
- **User Profiles**: Only the owner (UID matches document ID) can write to their own profile. Public read access is restricted (must be owner).
- **Providers**: Managed by admins (simulation for now). Pairings with images and locations must be valid. Publicly readable.
- **Spaces**: Managed by admins. Publicly readable.
- **Weddings**: Only the `ownerId` can read or write to a wedding document.
- **Relational Integrity**: A wedding must have a valid `ownerId` matching the creator.

## 2. The "Dirty Dozen" Payloads (Red Team)
1. **Identity Spoofing**: Attempt to create a user profile with a different UID in the payload than the authenticated user.
2. **PII Breach**: Authenticated user trying to read another user's private info.
3. **Admin Escalation**: User trying to update their profile to add an `isAdmin` field.
4. **Data Corruption**: Sending a wedding update with a 2MB string in the `location` field.
5. **State Shortcut**: Updating a wedding status directly to "completed" without following a logical flow (if enforced).
6. **Orphaned Writing**: Creating a wedding for a non-existent user UID (if RELATIONAL sync is enforced).
7. **Malicious ID**: Creating a document with a 2KB string as ID to cause resource exhaustion.
8. **Shadow Field**: Adding a `verified: true` field to a Provider document from a client.
9. **Timestamp Spoof**: Sending a client-side timestamp in `updatedAt` instead of `request.time`.
10. **Privilege Overlap**: A provider trying to delete another provider's data.
11. **Blanket List Query**: Requesting `weddings` collection without a `where('ownerId', '==', uid)` clause.
12. **Id Poisoning**: Using slashes or special characters in IDs to break path resolution.

## 3. Implementation Plan
- Define `isValidUser`, `isValidProvider`, `isValidSpace`, `isValidWedding` helpers.
- Implement "Master Gate" for all writes.
- Enforce strict size limits and type checks.
- Use `request.time` for all temporal fields.
