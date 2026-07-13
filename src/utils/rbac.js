export function getPerm(userMenus, url) {
  const list = Array.isArray(userMenus) ? userMenus : [];
  const target = String(url || '').toLowerCase();
  return (
    list.find((m) => String(m?.url || '').toLowerCase() === target) || null
  );
}

export function can(perm, action) {
  if (!perm) return false;

  switch (action) {
    case 'view':
      return !!perm.canView;
    case 'create':
      return !!perm.canCreate;
    case 'edit':
      return !!perm.canEdit;
    case 'delete':
      return !!perm.canDelete;
    case 'signature':
      return !!perm.canSignature;
    default:
      return false;
  }
}

export function guardOrThrow({ perm, action, toast, message }) {
  const ok = can(perm, action);
  if (!ok) toast?.error?.(message || 'شما دسترسی این عملیات را ندارید');
  return ok;
}

export const findMenu = (menus, name) => {
  for (const menu of menus) {
    if (menu.name === name) return menu;
    if (menu.subMenus?.length) {
      const found = findMenu(menu.subMenus, name);
      if (found) return found;
    }
  }
  return null;
};
