import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * 
 * @param roles  等价于 => metadata['roles'] = ['admin']  
 * @returns 
 */
export const Roles = (...roles: string[]) =>
  SetMetadata(ROLES_KEY, roles);

