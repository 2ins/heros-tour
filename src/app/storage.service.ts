import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  supabaseUrl = 'your-url';
  supabaseKey = 'your-key';

  public supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async upload(bucket: string, path: string, file: File) {
    const { data, error } = await this.supabaseClient.storage
      .from(bucket)
      .upload(path, file);

    return { data, error };
  }

  async download(bucket: string, path: string) {
    const { data, error } = await this.supabaseClient.storage
      .from(bucket)
      .download(path);

    return { data, error };
  }

  async createBucket() {
    const { data, error } = await this.supabaseClient.storage.createBucket(
      'photos'
    );
    return { data, error };
  }

  async getBucket() {
    const { data, error } = await this.supabaseClient.storage.getBucket(
      'photos'
    );
    return { data, error };
  }
}
