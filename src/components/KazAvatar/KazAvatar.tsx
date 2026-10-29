import { useState, type HTMLAttributes } from 'react';
import { cx } from '../../utils';

export interface KazAvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Nome da pessoa: vira texto alternativo e iniciais quando não há foto. */
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export function KazAvatar({ name, src, size = 'md', className, ...rest }: KazAvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;
  return (
    <span className={cx('kaz-avatar', `kaz-avatar--${size}`, className)} {...rest}>
      {showImage ? (
        <img src={src} alt={name} className="kaz-avatar__img" onError={() => setFailed(true)} />
      ) : (
        <span role="img" aria-label={name} className="kaz-avatar__initials">
          {getInitials(name)}
        </span>
      )}
    </span>
  );
}
