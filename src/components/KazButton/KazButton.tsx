import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx, type KazTone } from '../../utils';
import { KazSpinner } from '../KazSpinner/KazSpinner';

export type KazButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost' | 'link';
export type KazButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface KazButtonOwnProps {
  variant?: KazButtonVariant;
  tone?: Exclude<KazTone, 'info'>;
  size?: KazButtonSize;
  /** Ícone antes do texto. */
  leftIcon?: ReactNode;
  /** Ícone depois do texto. */
  rightIcon?: ReactNode;
  /** Botão quadrado só com ícone. Exige `aria-label`. */
  iconOnly?: boolean;
  /** Mostra spinner e bloqueia cliques. */
  loading?: boolean;
  fullWidth?: boolean;
  /** Estado ligado (para botões alternáveis e grupos). */
  pressed?: boolean;
  /** Se informado, renderiza um link `<a>` com aparência de botão. */
  href?: string;
}

export type KazButtonProps = KazButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    type?: 'button' | 'submit' | 'reset';
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
    rel?: string;
  };

export const KazButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, KazButtonProps>(
  function KazButton(
    {
      variant = 'solid',
      tone = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      iconOnly,
      loading,
      fullWidth,
      pressed,
      href,
      className,
      children,
      disabled,
      type = 'button',
      target,
      rel,
      ...rest
    },
    ref,
  ) {
    const classes = cx(
      'kaz-btn',
      `kaz-btn--${variant}`,
      `kaz-btn--${size}`,
      `kaz-tone-${tone}`,
      iconOnly && 'kaz-btn--icon',
      fullWidth && 'kaz-btn--full',
      loading && 'kaz-btn--loading',
      pressed && 'kaz-btn--pressed',
      className,
    );

    const content = (
      <>
        {loading && (
          <span className="kaz-btn__spinner">
            <KazSpinner size="xs" variant="arc" tone="current" label="" />
          </span>
        )}
        {leftIcon && <span className="kaz-btn__icon">{leftIcon}</span>}
        {children !== undefined && children !== null && <span className="kaz-btn__label">{children}</span>}
        {rightIcon && <span className="kaz-btn__icon">{rightIcon}</span>}
      </>
    );

    if (href !== undefined) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={disabled ? undefined : href}
          target={target}
          rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
          aria-disabled={disabled || undefined}
          className={classes}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        aria-pressed={pressed}
        className={classes}
        {...rest}
      >
        {content}
      </button>
    );
  },
);

export interface KazButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rótulo do grupo para leitores de tela. */
  label?: string;
  size?: KazButtonSize;
}

/** Agrupa botões encostados (ex.: Anos | Meses | Dias). Use `pressed` no item ativo. */
export function KazButtonGroup({ label, className, children, ...rest }: KazButtonGroupProps) {
  return (
    <div role="group" aria-label={label} className={cx('kaz-btn-group', className)} {...rest}>
      {children}
    </div>
  );
}
