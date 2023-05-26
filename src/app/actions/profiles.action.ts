import { User } from '@supabase/supabase-js';
import { Profile } from '../supabase.service';

//USERS alias profiles
export class GetUsers {
  static readonly type = '[User] Get';
  constructor(public payload: string) {}
}

export class SetSelectedUser {
  static readonly type = '[User] Set';
  constructor(public payload: string) {}
}

export class SetUserProfile {
  static readonly type = '[Profile] Set';
  constructor(public payload: User) {}
}

export class GetUserProfile {
  static readonly type = '[Profile] Get';
}

export class SetProfile {
  static readonly type = '[Profile] Set';
  constructor(public payload: Profile) {}
}
