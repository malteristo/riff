# Supabase Setup for Excalidraw

This document outlines the steps to set up Supabase as a replacement for Firebase in the Excalidraw app.

## Prerequisites

1. A Supabase account (create one at [supabase.com](https://supabase.com) if you don't have one)
2. A new Supabase project

## Setup Steps

### 1. Environment Variables

Update your environment variables in `.env.development` and `.env.production` with your Supabase credentials:

```
VITE_APP_SUPABASE_URL='https://your-project-url.supabase.co'
VITE_APP_SUPABASE_ANON_KEY='your-anon-key'
```

You can find these values in your Supabase project dashboard under Settings > API.

### 2. Database Setup

Run the SQL script provided in `supabase-setup.sql` in the Supabase SQL Editor to set up the necessary database tables and functions.

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy and paste the contents of `supabase-setup.sql`
5. Run the query

### 3. Storage Setup

Create a storage bucket for file uploads:

1. Go to your Supabase project dashboard
2. Navigate to Storage
3. Create a new bucket named `riff-files`
4. Configure bucket settings:
   - Public access: Enabled
   - Security: Allow file uploads without authentication

### 4. CORS Configuration

Configure CORS (Cross-Origin Resource Sharing) to allow requests from your Excalidraw domain:

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Under CORS, add the following configuration:
   - Allowed Origins: `*` (or your specific domain for production)
   - Allowed Methods: `GET, POST, PUT, DELETE, OPTIONS`
   - Allowed Headers: `*`
   - Max Age: `86400`

## Migration from Firebase

The migration involves replacing Firebase functions with equivalent Supabase functions:

| Firebase Feature | Supabase Replacement |
|------------------|----------------------|
| Firestore Database | Supabase Database (PostgreSQL) |
| Firebase Storage | Supabase Storage |
| Firebase Authentication | Supabase Auth (if needed) |

The implementation in `supabase.ts` provides equivalent functionality for:

- Saving scenes to the database
- Loading scenes from the database
- Saving files to storage
- Loading files from storage

## Verification

After completing the setup, verify the migration works by:

1. Creating a new room/scene and checking if it's saved to Supabase
2. Loading an existing room/scene and verifying data is retrieved correctly
3. Uploading files and ensuring they're stored in Supabase Storage
4. Testing collaboration features to ensure real-time updates work

## Troubleshooting

- **Database Errors**: Check the database structure matches the expected schema in `supabase.ts`
- **Storage Errors**: Verify the bucket permissions are set correctly
- **Authentication Errors**: Make sure your anon key has the necessary permissions
- **CORS Errors**: Ensure CORS is configured to allow requests from your domain

If you encounter issues, check the browser console for specific error messages from the Supabase client. 