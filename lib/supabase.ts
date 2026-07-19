import { createClient } from '@supabase/supabase-js';

// Project configuration. Env vars take precedence; falls back to the
// pre-provisioned project credentials so the app works out of the box.
export const config = {
  supabaseUrl:
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aphxjblbafyxobafjmot.supabase.co',
  supabaseAnonKey:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwaHhqYmxiYWZ5eG9iYWZqbW90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0MzAwNDYsImV4cCI6MjEwMDAwNjA0Nn0.TYmXInro72FHAf3E0pGm0QbZfwk7hNQ26RiA53ytjfY',

  // WhatsApp
  whatsappNumber: '818089227375',
  whatsappUrl: 'https://wa.me/818089227375',
};

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
