/*
  # Add missing columns to rfq_submissions table

  1. Changes
    - Add `specifications` column for product specifications
    - Add `destination` column for delivery destination
    - Add `incoterm` column for Incoterm preferences
    - Add `inspection_required` boolean for inspection requirements
    - Add `consolidation_needed` boolean for consolidation needs
    - Add `translation_needed` boolean for translation services
    - Add `recaptcha_token` for spam protection

  2. Notes
    - All new columns are nullable to maintain compatibility
    - Boolean fields default to false
    - Text fields default to empty string where appropriate
*/

DO $$
BEGIN
  -- Add specifications column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rfq_submissions' AND column_name = 'specifications'
  ) THEN
    ALTER TABLE rfq_submissions ADD COLUMN specifications text DEFAULT '';
  END IF;

  -- Add destination column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rfq_submissions' AND column_name = 'destination'
  ) THEN
    ALTER TABLE rfq_submissions ADD COLUMN destination text DEFAULT '';
  END IF;

  -- Add incoterm column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rfq_submissions' AND column_name = 'incoterm'
  ) THEN
    ALTER TABLE rfq_submissions ADD COLUMN incoterm text DEFAULT '';
  END IF;

  -- Add inspection_required column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rfq_submissions' AND column_name = 'inspection_required'
  ) THEN
    ALTER TABLE rfq_submissions ADD COLUMN inspection_required boolean DEFAULT false;
  END IF;

  -- Add consolidation_needed column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rfq_submissions' AND column_name = 'consolidation_needed'
  ) THEN
    ALTER TABLE rfq_submissions ADD COLUMN consolidation_needed boolean DEFAULT false;
  END IF;

  -- Add translation_needed column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rfq_submissions' AND column_name = 'translation_needed'
  ) THEN
    ALTER TABLE rfq_submissions ADD COLUMN translation_needed boolean DEFAULT false;
  END IF;

  -- Add recaptcha_token column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'rfq_submissions' AND column_name = 'recaptcha_token'
  ) THEN
    ALTER TABLE rfq_submissions ADD COLUMN recaptcha_token text DEFAULT '';
  END IF;
END $$;