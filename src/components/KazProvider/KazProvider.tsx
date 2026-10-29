import { createContext, useContext, useEffect, useState, type HTMLAttributes } from 'react';
import { cx } from '../../utils';

export type KazTheme = 'light' | 'dark' | 'system';

const KazThemeContext = createContext<'light' | 'dark'>('light');

/** Tema efetivo (claro ou escuro) do KazProvider mais próximo. */
export const useKazTheme = () => useContext(KazThemeContext);

export interface KazProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** Tema da árvore. `system` segue a preferência do sistema operacional. */
  theme?: KazTheme;
}

/**
 * Aplica fonte, cores base e tema aos componentes Kaz dentro dele.
 * Pode ser aninhado: um trecho escuro dentro de uma página clara, por exemplo.
 */
export function KazProvider({ theme = 'light', className, children, ...rest }: KazProviderProps) {
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    if (theme !== 'system' || typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(query.matches);
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, [theme]);

  const resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

  return (
    <KazThemeContext.Provider value={resolved}>
      <div data-kaz-theme={resolved} className={cx('kaz-root', className)} {...rest}>
        {children}
      </div>
    </KazThemeContext.Provider>
  );
}
